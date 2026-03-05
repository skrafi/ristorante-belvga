/**
 * Form Types
 */

export type FieldName =
  | "date"
  | "time"
  | "guests"
  | "name"
  | "email"
  | "phone"

export interface FormErrors {
  date?: string
  time?: string
  guests?: string
  name?: string
  email?: string
  phone?: string
}

export interface FormState {
  date: Date | null
  time: string | null
  guests: number | null
  name: string
  email: string
  phone: string
  notes: string
}

export type FormStatus = "idle" | "validating" | "submitting" | "success" | "error"
