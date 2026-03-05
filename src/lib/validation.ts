import { z } from 'zod'

export const availabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  }),
  guests: z.number().int().min(1).max(20),
})

export const reservationSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  }),
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'Time must be in HH:mm format',
  }),
  guests: z.number().int().min(1).max(20),
  name: z.string().min(2).max(100),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(5).max(20).regex(/^\+?\d[\d\s\-()]+$/, {
    message: 'Invalid phone format',
  }),
  notes: z.string().max(500).optional(),
  language: z.enum(['en', 'fr', 'de']),
})

export type AvailabilityInput = z.infer<typeof availabilitySchema>
export type ReservationInput = z.infer<typeof reservationSchema>
