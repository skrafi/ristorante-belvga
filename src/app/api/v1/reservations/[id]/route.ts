import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrors } from '@/lib/api-error'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const reservation = await prisma.reservation.findUnique({
      where: { id },
    })

    if (!reservation) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    return NextResponse.json({
      id: reservation.id,
      confirmationCode: reservation.confirmationCode,
      date: reservation.date.toISOString().split('T')[0],
      time: reservation.time,
      guests: reservation.guests,
      name: reservation.name,
      status: reservation.status,
      createdAt: reservation.createdAt.toISOString(),
    })
  } catch (error) {
    console.error('[GET /api/v1/reservations/[id]]', error)
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
