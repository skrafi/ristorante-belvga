import { ApiError, ApiErrors } from './api-error'

export const TIME_SLOTS = [
  // Lunch
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  // Dinner
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
] as const

export const MAX_CAPACITY = 100 // Simplified for v1
export const HOURS_BEFORE_SAME_DAY = 2

export function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return !isNaN(date.getTime()) && dateStr === formatDate(date)
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isTodayOrFuture(dateStr: string): boolean {
  const today = new Date()
  const requestedDate = new Date(dateStr)

  today.setHours(0, 0, 0, 0)
  requestedDate.setHours(0, 0, 0, 0)

  return requestedDate >= today
}

export function isMonday(dateStr: string): boolean {
  const date = new Date(dateStr)
  return date.getDay() === 1
}

export function isSlotAvailableForSameDay(dateStr: string, timeStr: string): boolean {
  const now = new Date()
  const requestedDate = new Date(dateStr)
  const [hours, minutes] = timeStr.split(':').map(Number)

  // Check if the request is for today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  requestedDate.setHours(0, 0, 0, 0)

  if (requestedDate.getTime() !== today.getTime()) {
    return true // Not today, so available
  }

  // Calculate the time of the slot
  const slotTime = new Date()
  slotTime.setHours(hours, minutes, 0, 0)

  // Calculate the cutoff time (2 hours before slot)
  const cutoffTime = new Date(slotTime.getTime() - HOURS_BEFORE_SAME_DAY * 60 * 60 * 1000)

  return now < cutoffTime
}

export function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `BEL-${code}`
}

export function validateDate(dateStr: string): void {
  if (!isValidDate(dateStr)) {
    throw ApiErrors.invalidDate()
  }

  if (!isTodayOrFuture(dateStr)) {
    throw ApiErrors.pastDate()
  }

  if (isMonday(dateStr)) {
    throw ApiErrors.closed()
  }
}

export function validateGuests(guests: number): void {
  if (guests < 1 || guests > 20) {
    throw ApiErrors.invalidGuests()
  }
}

export function validateTime(timeStr: string, availableSlots: string[]): void {
  if (!TIME_SLOTS.includes(timeStr as any)) {
    throw ApiErrors.invalidTime()
  }

  if (!availableSlots.includes(timeStr)) {
    throw ApiErrors.slotUnavailable()
  }
}
