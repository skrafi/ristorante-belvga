"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "../Button"
import { LanguageSwitcher } from "../LanguageSwitcher"
import type { Language } from "../LanguageSwitcher"

/**
 * Header component with logo, navigation, and mobile menu toggle.
 *
 * @example
 * <Header
 *   logo="/logo.svg"
 *   links={[
 *     { label: "Menu", href: "/menu" },
 *     { label: "Reserve", href: "/reserve" },
 *   ]}
 *   currentPath="/menu"
 *   onMobileMenuToggle={handleToggle}
 *   isMobileMenuOpen={isOpen}
 * />
 */
export interface HeaderProps {
  logo?: string
  currentPath?: string
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
  className?: string
  currentLang?: Language
}

export function Header({
  logo = "/logo.svg",
  currentPath = "/",
  onMobileMenuToggle,
  isMobileMenuOpen = false,
  className,
  currentLang,
}: HeaderProps) {
  const t = useTranslations("common.nav")
  const locale = useLocale()

  const links = [
    { label: t("home"), href: `/${locale}` },
    { label: t("menu"), href: `/${locale}/menu` },
    { label: t("gallery"), href: `/${locale}/gallery` },
    { label: t("about"), href: `/${locale}/about` },
    { label: t("reserve"), href: `/${locale}/reserve` },
    { label: t("contact"), href: `/${locale}/contact` },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 bg-[var(--color-surface)]/95 backdrop-blur-sm border-b border-[var(--color-border)] transition-shadow duration-[var(--duration-normal)]",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-interactive)] transition-colors duration-[var(--duration-fast)]"
            aria-label="Ristorante Pescheria Belvga - Home"
          >
            {logo ? (
              <img src={logo} alt="Ristorante Pescheria Belvga" className="h-8 sm:h-10 w-auto" />
            ) : (
              <span className="font-display">Ristorante Pescheria Belvga</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[var(--text-base)] font-medium transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-interactive)] relative",
                      currentPath === link.href
                        ? "text-[var(--color-interactive)]"
                        : "text-[var(--color-text-secondary)]"
                    )}
                  >
                    {link.label}
                    {currentPath === link.href && (
                      <span className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-[var(--color-interactive)]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLang={currentLang || (locale as Language)} />

            {/* Mobile Menu Toggle */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={onMobileMenuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
