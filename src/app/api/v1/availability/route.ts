import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ApiError, ApiErrors } from '@/lib/api-error'
import { rateLimit, rateLimits } from '@/lib/rate-limit'
import {
  TIME_SLOTS,
  validateDate,
  validateGuests,
  isSlotAvailableForSameDay,
  MAX_CAPACITY,
} from '@/lib/reservation-utils'

export async function GET(req: NextRequest) {
  try {
    // Rate limiting
    const rl = rateLimit(req, rateLimits.availability.limit, rateLimits.availability.windowMs)
    if (!rl.success) {
      return NextResponse.json(
        { error: 'RATE_LIMITED', message: 'Too many requests. Please wait.' },
        { status: 429, headers: { 'X-RateLimit-Reset': String(rl.resetAt) } }
      )
    }

    // Parse query parameters
    const searchParams = req.nextUrl.searchParams
    const date = searchParams.get('date')
    const guests = searchParams.get('guests')

    // Validate presence
    if (!date || !guests) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'date and guests are required' },
        { status: 400 }
      )
    }

    // Parse and validate
    const validatedGuests = parseInt(guests, 10)
    if (isNaN(validatedGuests)) {
      return NextResponse.json(
        { error: 'INVALID_GUESTS', message: 'Guests must be a number' },
        { status: 400 }
      )
    }

    try {
      validateDate(date)
      validateGuests(validatedGuests)
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json({ error: error.code }, { status: error.status })
      }
      throw error
    }

    // Get existing reservations for the date
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const reservations = await prisma.reservation.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      select: {
        time: true,
        guests: true,
      },
    })

    // Calculate occupied slots
    const occupied: Record<string, number> = {}
    reservations.forEach((r) => {
      occupied[r.time] = (occupied[r.time] || 0) + r.guests
    })

    // Find available slots
    const availableSlots: string[] = []
    for (const slot of TIME_SLOTS) {
      // Check same-day availability
      if (!isSlotAvailableForSameDay(date, slot)) {
        continue
      }

      // Check capacity
      const currentGuests = occupied[slot] || 0
      if (currentGuests + validatedGuests <= MAX_CAPACITY) {
        availableSlots.push(slot)
      }
    }

    // Determine message
    let message: string | null = null
    if (availableSlots.length === 0) {
      message = 'Fully booked'
    } else if (availableSlots.length < TIME_SLOTS.length / 2) {
      message = 'Limited availability'
    }

    return NextResponse.json({
      date,
      guests: validatedGuests,
      availableSlots,
      message,
    })
  } catch (error) {
    console.error('[GET /api/v1/availability]', error)
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
