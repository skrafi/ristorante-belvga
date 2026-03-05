"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * MobileMenu component with slide-in animation and staggered link animations.
 *
 * @example
 * <MobileMenu
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   links={[
 *     { label: "Menu", href: "/menu" },
 *     { label: "Reserve", href: "/reserve" },
 *   ]}
 *   currentPath="/menu"
 * />
 */
export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links?: Array<{ label: string; href: string }>
  currentPath?: string
}

export function MobileMenu({
  isOpen,
  onClose,
  links = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reserve", href: "/reserve" },
    { label: "Contact", href: "/contact" },
  ],
  currentPath = "/",
}: MobileMenuProps) {
  // Prevent body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-[var(--color-overlay-light)] transition-all duration-[var(--duration-normal)] md:hidden",
          isOpen ? "opacity-100 visible backdrop-blur-sm" : "opacity-0 invisible"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] bg-[var(--color-surface)] shadow-[var(--shadow-xl)] transform transition-transform duration-[var(--duration-slow)] ease-[var(--easing-out)] md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-[var(--space-6)] border-b border-[var(--color-border)]">
            <span className="font-display text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)]">
              Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md hover:bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-[var(--duration-fast)]"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto py-[var(--space-6)]">
            <ul className="flex flex-col">
              {links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "block px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-lg)] font-medium transition-all duration-[var(--duration-normal)]",
                      isOpen && "animate-slideIn",
                      currentPath === link.href
                        ? "text-[var(--color-interactive)] bg-[var(--color-surface-alt)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]"
                    )}
                    style={
                      isOpen
                        ? {
                            animationDelay: `${100 + index * 50}ms`,
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="p-[var(--space-6)] border-t border-[var(--color-border)]">
            <p className="text-[var(--text-sm)] text-[var(--color-text-tertiary)]">
              Ristorante Pescheria Belvga
            </p>
          </div>
        </div>
      </nav>
    </>
  )
}
