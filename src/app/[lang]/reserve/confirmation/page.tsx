"use client"

import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Spinner } from "@/components/ui/Spinner"
import { useToast } from "@/components/ui/Toast"
import { formatDate, formatTime } from "@/lib/utils"
import type { ReservationResponse, ApiError } from "@/types/api"

export default function ConfirmationPage() {
  const t = useTranslations("reserve.confirmation")
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [reservation, setReservation] = useState<ReservationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reservationId = searchParams.get("id")

  useEffect(() => {
    if (!reservationId) {
      setError("Reservation ID not provided")
      setIsLoading(false)
      return
    }

    const fetchReservation = async () => {
      try {
        const response = await fetch(`/api/v1/reservations/${reservationId}`)

        if (!response.ok) {
          const error: ApiError = await response.json()
          throw new Error(error.message || "Failed to load reservation")
        }

        const data: ReservationResponse = await response.json()
        setReservation(data)
      } catch (err) {
        console.error("Error loading reservation:", err)
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load reservation details"
        )
        toast({
          variant: "error",
          message: t("title"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservation()
  }, [reservationId, t, toast])

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr)
    const [hours, minutes] = timeStr.split(":")
    date.setHours(parseInt(hours), parseInt(minutes))

    return {
      date: formatDate(date, locale),
      time: formatTime(date, locale),
    }
  }

  const generateCalendarLink = () => {
    if (!reservation) return "#"

    const { date, time } = formatDateTime(reservation.date, reservation.time)
    const [hours, minutes] = time.split(":")
    const calendarDate = reservation.date.replace(/-/g, "")

    const title = encodeURIComponent(`Reservation at Ristorante Pescheria Belvga`)
    const details = encodeURIComponent(
      `Reservation for ${reservation.guests} guest(s)\n` +
      `Confirmation Code: ${reservation.confirmationCode}\n` +
      `Contact: +41 91 XXX XX XX`
    )

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${calendarDate}T${hours}${minutes}00/${calendarDate}T${parseInt(hours) + 2}${minutes}00&details=${details}&location=Riva%20Antonio%20Caccivio%2C%206900%20Lugano%2C%20Switzerland`
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Spinner size="lg" />
          <p className="text-[var(--color-text-secondary)]">Loading reservation details...</p>
        </div>
      </div>
    )
  }

  if (error || !reservation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-[var(--color-destructive)]">
              Reservation Not Found
            </CardTitle>
            <CardDescription>
              {error || "We couldn't find your reservation details."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push(`/${locale}`)} variant="primary">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { date, time } = formatDateTime(reservation.date, reservation.time)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          {t("title")}
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          {t("subtitle")}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("details")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[var(--color-text-secondary)]">{t("code")}:</span>
            <span className="font-semibold text-[var(--color-interactive)]">
              {reservation.confirmationCode}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-[var(--color-text-secondary)]">{t("date")}:</span>
            <span className="font-medium">{date}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-[var(--color-text-secondary)]">{t("time")}:</span>
            <span className="font-medium">{time}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-[var(--color-text-secondary)]">{t("guests")}:</span>
            <span className="font-medium">{reservation.guests}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-[var(--color-text-secondary)]">{t("status")}:</span>
            <span className="font-medium text-[var(--color-interactive)]">
              {t("pending")}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-[var(--color-text-secondary)] text-center mb-4">
            {t("emailSent")}
          </p>
          <p className="text-sm text-[var(--color-text-tertiary)] text-center mb-4">
            {t("contactNote")}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => router.push(`/${locale}`)}
            >
              {t("backHome")}
            </Button>
            <Button
              variant="primary"
              onClick={() => window.open(generateCalendarLink(), '_blank', 'noopener,noreferrer')}
            >
              {t("addToCalendar")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
