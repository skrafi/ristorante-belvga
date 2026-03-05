import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes.
 * Combines clsx for conditional classes and tailwind-merge for Tailwind conflict resolution.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', customClass)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to locale string based on language
 * @param date - Date to format
 * @param locale - Locale string (en, fr, de)
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

/**
 * Format a time to locale string based on language
 * @param date - Date with time to format
 * @param locale - Locale string (en, fr, de)
 * @returns Formatted time string
 */
export function formatTime(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
