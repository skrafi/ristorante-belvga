import { Resend } from 'resend'

// Lazy initialization to avoid build-time validation
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  try {
    return new Resend(apiKey)
  } catch {
    return null
  }
}

interface ReservationEmailData {
  to: string
  confirmationCode: string
  date: string
  time: string
  guests: number
  guestName: string
  language: 'en' | 'fr' | 'de'
}

const emailTemplates = {
  en: {
    subject: (code: string) => `Your reservation at Ristorante Pescheria Belvga - ${code}`,
    body: (data: ReservationEmailData) => `
Dear ${data.guestName},

Thank you for your reservation!

Confirmation Code: ${data.confirmationCode}
Date: ${data.date}
Time: ${data.time}
Guests: ${data.guests}

We look forward to seeing you!

Ristorante Pescheria Belvga
Address: Via Cantore 10, 6500 Bellinzona
Phone: +41 91 XXX XX XX

Please call to cancel or modify your reservation.
    `.trim(),
  },
  fr: {
    subject: (code: string) => `Votre réservation chez Ristorante Pescheria Belvga - ${code}`,
    body: (data: ReservationEmailData) => `
Cher/Chère ${data.guestName},

Merci pour votre réservation!

Code de confirmation: ${data.confirmationCode}
Date: ${data.date}
Heure: ${data.time}
Convives: ${data.guests}

Nous avons hâte de vous accueillir!

Ristorante Pescheria Belvga
Adresse: Via Cantore 10, 6500 Bellinzona
Téléphone: +41 91 XXX XX XX

Veuillez nous appeler pour annuler ou modifier votre réservation.
    `.trim(),
  },
  de: {
    subject: (code: string) => `Ihre Reservierung bei Ristorante Pescheria Belvga - ${code}`,
    body: (data: ReservationEmailData) => `
Liebe/r ${data.guestName},

Danke für Ihre Reservierung!

Bestätigungscode: ${data.confirmationCode}
Datum: ${data.date}
Uhrzeit: ${data.time}
Gäste: ${data.guests}

Wir freuen uns auf Ihren Besuch!

Ristorante Pescheria Belvga
Adresse: Via Cantore 10, 6500 Bellinzona
Telefon: +41 91 XXX XX XX

Bitte rufen Sie an, um Ihre Reservierung zu stornieren oder zu ändern.
    `.trim(),
  },
}

export async function sendReservationConfirmation(data: ReservationEmailData): Promise<void> {
  const resend = getResendClient()
  if (!resend) {
    console.log('[Email] Skipping - RESEND_API_KEY not configured')
    return
  }

  const template = emailTemplates[data.language] || emailTemplates.en

  try {
    await resend.emails.send({
      from: 'Ristorante Pescheria Belvga <reservations@belvga.ch>',
      to: data.to,
      subject: template.subject(data.confirmationCode),
      text: template.body(data),
    })
    console.log(`[Email] Confirmation sent to ${data.to}`)
  } catch (error) {
    console.error('[Email] Failed to send confirmation:', error)
    // Don't throw - email failure shouldn't block reservation creation
  }
}

export async function sendRestaurantNotification(data: Omit<ReservationEmailData, 'language'>): Promise<void> {
  const resend = getResendClient()
  if (!resend) {
    console.log('[Email] Skipping - RESEND_API_KEY not configured')
    return
  }

  try {
    await resend.emails.send({
      from: 'Reservation System <reservations@belvga.ch>',
      to: 'reservations@belvga.ch',
      subject: `New Reservation - ${data.date} ${data.time} - ${data.guests} guests`,
      text: `
New reservation received:

Confirmation Code: ${data.confirmationCode}
Date: ${data.date}
Time: ${data.time}
Guests: ${data.guests}
Guest Name: ${data.guestName}
Email: ${data.to}
Phone: +41 XX XXX XX XX

      `.trim(),
    })
    console.log('[Email] Restaurant notification sent')
  } catch (error) {
    console.error('[Email] Failed to send notification:', error)
    // Don't throw - email failure shouldn't block reservation creation
  }
}
