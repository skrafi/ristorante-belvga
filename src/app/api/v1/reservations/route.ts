import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ApiError, ApiErrors } from '@/lib/api-error'
import { rateLimit, rateLimits } from '@/lib/rate-limit'
import { reservationSchema } from '@/lib/validation'
import {
  TIME_SLOTS,
  validateDate,
  validateGuests,
  isSlotAvailableForSameDay,
  generateConfirmationCode,
  MAX_CAPACITY,
} from '@/lib/reservation-utils'
import { sendReservationConfirmation, sendRestaurantNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const rl = rateLimit(req, rateLimits.reservations.limit, rateLimits.reservations.windowMs)
    if (!rl.success) {
      return NextResponse.json(
        { error: 'RATE_LIMITED', message: 'Too many reservation attempts. Please wait.' },
        { status: 429, headers: { 'X-RateLimit-Reset': String(rl.resetAt) } }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    const validated = reservationSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          fields: validated.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const { date, time, guests, name, email, phone, notes, language } = validated.data

    // Validate business rules
    try {
      validateDate(date)
      validateGuests(guests)
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json({ error: error.code }, { status: error.status })
      }
      throw error
    }

    // Validate time format
    if (!TIME_SLOTS.includes(time as any)) {
      return NextResponse.json({ error: 'INVALID_TIME' }, { status: 400 })
    }

    // Check same-day availability
    if (!isSlotAvailableForSameDay(date, time)) {
      return NextResponse.json(
        { error: 'SLOT_UNAVAILABLE', message: 'This time slot is no longer available for same-day booking' },
        { status: 400 }
      )
    }

    // Check availability by querying existing reservations
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const existingReservations = await prisma.reservation.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        time: time,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      select: {
        guests: true,
      },
    })

    const totalGuests = existingReservations.reduce((sum, r) => sum + r.guests, 0)

    if (totalGuests + guests > MAX_CAPACITY) {
      return NextResponse.json(
        { error: 'SLOT_UNAVAILABLE', message: 'This time slot is no longer available' },
        { status: 400 }
      )
    }

    // Create reservation
    const confirmationCode = generateConfirmationCode()

    const reservation = await prisma.reservation.create({
      data: {
        confirmationCode,
        date: new Date(date),
        time,
        guests,
        name,
        email,
        phone,
        notes,
        language,
        status: 'PENDING',
      },
    })

    // Send emails (non-blocking)
    const emailData = {
      to: email,
      confirmationCode,
      date,
      time,
      guests,
      guestName: name,
      language,
    }

    // Fire and forget - don't await
    Promise.all([
      sendReservationConfirmation(emailData),
      sendRestaurantNotification(emailData),
    ]).catch((err) => console.error('[Email] Failed to send:', err))

    return NextResponse.json(
      {
        id: reservation.id,
        confirmationCode: reservation.confirmationCode,
        date: reservation.date.toISOString().split('T')[0],
        time: reservation.time,
        guests: reservation.guests,
        name: reservation.name,
        status: reservation.status,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/v1/reservations]', error)
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
