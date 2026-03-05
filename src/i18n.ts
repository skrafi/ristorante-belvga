import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"
import messages from "./messages"

export const locales = ["en", "fr", "de"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) notFound()

  return {
    locale: locale as Locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Europe/Zurich",
  }
})
