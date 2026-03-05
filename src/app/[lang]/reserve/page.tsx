"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { DatePicker } from "@/components/ui/DatePicker"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Spinner } from "@/components/ui/Spinner"
import { useToast } from "@/components/ui/Toast"
import type { FormState, FormErrors, FormStatus } from "@/types/form"
import type { AvailabilityResponse, ReservationResponse } from "@/types/api"
import { cn } from "@/lib/utils"

export default function ReservePage() {
  const t = useTranslations("reserve")
  const locale = useLocale()
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [form, setForm] = useState<FormState>({
    date: null,
    time: null,
    guests: null,
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>("idle")

  // Availability state
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  // Format date for API
  const formatDateForApi = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  // Check availability
  const checkAvailability = async (date: Date, guests: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    setIsCheckingAvailability(true)
    setAvailabilityMessage(null)
    setForm((prev) => ({ ...prev, time: null }))

    try {
      const params = new URLSearchParams({
        date: formatDateForApi(date),
        guests: guests.toString(),
      })

      const response = await fetch(`/api/v1/availability?${params}`, {
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        const error = await response.json()
        if (error.error === "CLOSED") {
          setAvailableSlots([])
          setAvailabilityMessage(t("availability.closed"))
          return
        }
        throw new Error(error.message || "Failed to check availability")
      }

      const data: AvailabilityResponse = await response.json()
      setAvailableSlots(data.availableSlots)
      setAvailabilityMessage(data.message)
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast({
          variant: "error",
          message: t("errors.networkError"),
        })
        setAvailableSlots([])
      }
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.date) {
      newErrors.date = t("validation.dateRequired")
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (form.date < today) {
        newErrors.date = t("validation.datePast")
      }
    }

    if (!form.time) {
      newErrors.time = t("validation.timeRequired")
    }

    if (!form.guests || form.guests < 1 || form.guests > 20) {
      newErrors.guests = t("validation.guestsRequired")
    }

    if (!form.name.trim()) {
      newErrors.name = t("validation.nameRequired")
    } else if (form.name.trim().length < 2) {
      newErrors.name = t("validation.nameMin")
    }

    if (!form.email.trim()) {
      newErrors.email = t("validation.emailRequired")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("validation.emailInvalid")
    }

    if (!form.phone.trim()) {
      newErrors.phone = t("validation.phoneRequired")
    } else if (!/^\+?\d[\d\s\-()]+$/.test(form.phone)) {
      newErrors.phone = t("validation.phoneInvalid")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    if (!form.date || !form.time || !form.guests) {
      return
    }

    setStatus("submitting")

    try {
      const response = await fetch("/api/v1/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formatDateForApi(form.date),
          time: form.time,
          guests: form.guests,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          notes: form.notes.trim() || undefined,
          language: locale,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        if (error.fields) {
          // Field-level errors
          const fieldErrors: FormErrors = {}
          Object.entries(error.fields).forEach(([field, messages]) => {
            fieldErrors[field as keyof FormErrors] = (messages as string[])[0]
          })
          setErrors(fieldErrors)
          setStatus("idle")
          toast({
            variant: "error",
            message: t("errors.submitFailed"),
          })
          return
        }
        throw new Error(error.message || "Failed to submit reservation")
      }

      const data: ReservationResponse = await response.json()

      // Redirect to confirmation page
      router.push(`/${locale}/reserve/confirmation?id=${data.id}`)
    } catch (error) {
      console.error("Reservation error:", error)
      setStatus("error")
      toast({
        variant: "error",
        message: t("errors.submitFailed"),
      })
    }
  }

  // Handle date change
  const handleDateChange = (date: Date) => {
    setForm((prev) => ({ ...prev, date }))
    setErrors((prev) => ({ ...prev, date: undefined }))

    if (form.guests) {
      checkAvailability(date, form.guests)
    }
  }

  // Handle guests change
  const handleGuestsChange = (guests: number) => {
    setForm((prev) => ({ ...prev, guests }))
    setErrors((prev) => ({ ...prev, guests: undefined }))

    if (form.date) {
      checkAvailability(form.date, guests)
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const minDate = new Date()
  minDate.setHours(0, 0, 0, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          {t("title")}
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          {t("description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("form.date")}</CardTitle>
            <CardDescription>
              {t("availability.available")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <DatePicker
              label={t("form.date")}
              selected={form.date}
              onSelect={handleDateChange}
              minDate={minDate}
            />
            {errors.date && (
              <p className="text-sm text-[var(--color-error)]">{errors.date}</p>
            )}

            {/* Guest count selector */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t("form.guests")}
              </label>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleGuestsChange(num)}
                    className={cn(
                      "px-4 py-2 rounded-md font-medium transition-all",
                      form.guests === num
                        ? "bg-[var(--color-interactive)] text-[var(--color-interactive-foreground)]"
                        : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-interactive)]"
                    )}
                    aria-pressed={form.guests === num}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleGuestsChange(11)}
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition-all",
                    form.guests === 11
                      ? "bg-[var(--color-interactive)] text-[var(--color-interactive-foreground)]"
                      : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-interactive)]"
                  )}
                  aria-pressed={form.guests === 11}
                >
                  11+
                </button>
              </div>
              {errors.guests && (
                <p className="text-sm text-[var(--color-destructive)] mt-2">
                  {errors.guests}
                </p>
              )}
              {form.guests && form.guests > 8 && (
                <p className="text-sm text-[var(--color-text-tertiary)] mt-2">
                  {t("largeParty.note")}
                </p>
              )}
            </div>

            {/* Time slots */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t("form.time")}
              </label>
              {isCheckingAvailability ? (
                <div className="flex items-center gap-2 text-[var(--color-text-tertiary)]">
                  <Spinner size="sm" aria-hidden="true" />
                  {t("availability.checking")}
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, time: slot }))
                        setErrors((prev) => ({ ...prev, time: undefined }))
                      }}
                      className={cn(
                        "px-4 py-3 rounded-md font-medium transition-all",
                        form.time === slot
                          ? "bg-[var(--color-interactive)] text-[var(--color-interactive-foreground)]"
                          : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-interactive)]"
                      )}
                      aria-pressed={form.time === slot}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : availabilityMessage ? (
                <Badge variant="warning">{availabilityMessage}</Badge>
              ) : form.date && form.guests ? (
                <Badge>{t("availability.noSlots")}</Badge>
              ) : (
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  Select a date and number of guests to see available times
                </p>
              )}
              {errors.time && (
                <p className="text-sm text-[var(--color-destructive)] mt-2">
                  {errors.time}
                </p>
              )}
              {availabilityMessage && availabilityMessage === "Limited availability" && (
                <p className="text-sm text-[var(--color-warning)] mt-2">
                  {t("availability.limited")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              type="text"
              label={t("form.name")}
              value={form.name}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }))
                setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              error={errors.name}
              aria-required="true"
            />

            <Input
              type="email"
              label={t("form.email")}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e.target.value }))
                setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              error={errors.email}
              aria-required="true"
            />

            <Input
              type="tel"
              label={t("form.phone")}
              placeholder="+41 79 123 45 67"
              value={form.phone}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, phone: e.target.value }))
                setErrors((prev) => ({ ...prev, phone: undefined }))
              }}
              error={errors.phone}
              aria-required="true"
            />

            <Textarea
              label={t("form.notes")}
              placeholder={t("form.notesPlaceholder")}
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={status === "submitting"}
          disabled={status === "submitting"}
          className="w-full"
        >
          {status === "submitting" ? t("form.submitting") : t("form.submit")}
        </Button>
      </form>
    </div>
  )
}
