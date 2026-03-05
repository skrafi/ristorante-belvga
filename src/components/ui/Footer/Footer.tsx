"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Footer component with address, hours, links, and social icons.
 *
 * @example
 * <Footer
 *   address="Via delle Scuole 15, 6900 Lugano, Switzerland"
 *   hours={[
 *     { day: "Mon-Thu", time: "12:00-14:30, 19:00-22:30" },
 *     { day: "Fri-Sat", time: "12:00-14:30, 19:00-23:00" },
 *   ]}
 *   links={[{ label: "Privacy", href: "/privacy" }]}
 *   socialLinks={[
 *     { platform: "instagram", href: "https://instagram.com/..." }
 *   ]}
 * />
 */
export interface FooterProps {
  address?: string
  phone?: string
  email?: string
  hours?: Array<{ day: string; time: string }>
  links?: Array<{ label: string; href: string }>
  socialLinks?: Array<{ platform: string; href: string; label?: string }>
  copyright?: string
  className?: string
}

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tripadvisor: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 4c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm6 12c-1.777 0-3.432-.588-4.75-1.58l-.726 3.58-3.506-3.506c-2.925.525-5.518-1.748-5.518-4.494 0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 1.654-.898 3.095-2.23 3.868l1.73 1.73.474-2.344c1.098.834 2.467 1.346 3.976 1.346 3.59 0 6.5-2.91 6.5-6.5s-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5c0 .546.069 1.076.198 1.584l-1.898.444c-.172-.65-.3-1.326-.3-2.028 0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5z" />
    </svg>
  ),
}

export function Footer({
  address = "Via delle Scuole 15, 6900 Lugano, Switzerland",
  phone = "+41 91 923 45 67",
  email = "info@belvga.ch",
  hours = [
    { day: "Mon - Thu", time: "12:00 - 14:30, 19:00 - 22:30" },
    { day: "Fri - Sat", time: "12:00 - 14:30, 19:00 - 23:00" },
    { day: "Sunday", time: "12:00 - 15:00" },
  ],
  links = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  socialLinks = [
    { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
    { platform: "facebook", href: "https://facebook.com", label: "Facebook" },
  ],
  copyright = `© ${new Date().getFullYear()} Ristorante Pescheria Belvga. All rights reserved.`,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-[var(--color-surface)] border-t border-[var(--color-border)]", className)}>
      <div className="max-w-[1280px] mx-auto px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)] py-[var(--space-12)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Address & Contact */}
          <div>
            <h3 className="font-display text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)] mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
                {address}
              </p>
              <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                <a href={`tel:${phone}`} className="hover:text-[var(--color-interactive)] transition-colors duration-[var(--duration-fast)]">
                  {phone}
                </a>
              </p>
              <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                <a href={`mailto:${email}`} className="hover:text-[var(--color-interactive)] transition-colors duration-[var(--duration-fast)]">
                  {email}
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)] mb-4">
              Hours
            </h3>
            <div className="space-y-2">
              {hours.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">{item.day}</span>
                  <span className="text-[var(--text-sm)] text-[var(--color-text-primary)]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-sm)] text-[var(--color-text-secondary)] hover:text-[var(--color-interactive)] transition-colors duration-[var(--duration-fast)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)] mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label || social.platform}
                  className="p-2 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-interactive)] hover:text-[var(--color-interactive-foreground)] transition-all duration-[var(--duration-fast)]"
                >
                  {socialIcons[social.platform]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-center">
          <p className="text-[var(--text-sm)] text-[var(--color-text-tertiary)]">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
