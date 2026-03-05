"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export type Language = "en" | "fr" | "de"

const languages: Record<Language, { code: string; name: string; flag: string }> = {
  en: { code: "en", name: "English", flag: "🇬🇧" },
  fr: { code: "fr", name: "Français", flag: "🇫🇷" },
  de: { code: "de", name: "Deutsch", flag: "🇨🇭" },
}

/**
 * LanguageSwitcher component with dropdown for EN/FR/DE.
 *
 * @example
 * <LanguageSwitcher currentLang="en" />
 */
export interface LanguageSwitcherProps {
  currentLang?: Language
  className?: string
}

export function LanguageSwitcher({ currentLang = "en", className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Extract language from current path
  const getCurrentLanguage = (): Language => {
    const match = pathname.match(/^\/([a-z]{2})(\/|$)/)
    return (match?.[1] as Language) || currentLang
  }

  const activeLang = getCurrentLanguage()

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${lang}`)
    router.push(newPath)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[var(--color-surface-alt)] text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="text-lg">{languages[activeLang].flag}</span>
        <span className="hidden sm:inline">{languages[activeLang].name}</span>
        <svg
          className={cn("w-4 h-4 transition-transform duration-[var(--duration-fast)]", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 min-w-[160px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] py-1 z-50 animate-fadeIn"
          role="listbox"
          aria-label="Languages"
        >
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              type="button"
              onClick={() => handleLanguageChange(code as Language)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2 text-left text-[var(--text-sm)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface-alt)] focus-visible:outline-none focus-visible:bg-[var(--color-surface-alt)]",
                activeLang === code
                  ? "text-[var(--color-interactive)] font-medium"
                  : "text-[var(--color-text-secondary)]"
              )}
              role="option"
              aria-selected={activeLang === code}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {activeLang === code && (
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
