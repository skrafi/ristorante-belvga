/**
 * API Response Types
 */

export interface AvailabilityResponse {
  date: string
  guests: number
  availableSlots: string[]
  message: string | null
}

export interface ReservationResponse {
  id: string
  confirmationCode: string
  date: string
  time: string
  guests: number
  name: string
  status: string
  createdAt?: string
}

export interface ApiError {
  error: string
  message?: string
  fields?: Record<string, string[]>
}

export interface ReservationFormData {
  date: Date
  time: string
  guests: number
  name: string
  email: string
  phone: string
  notes?: string
}
