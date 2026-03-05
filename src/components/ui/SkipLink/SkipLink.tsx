"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * SkipLink component for accessibility.
 * Allows keyboard users to skip navigation and go directly to main content.
 *
 * Place this component at the very top of your app (e.g., in layout.tsx).
 *
 * @example
 * <SkipLink targetId="main-content" />
 * <main id="main-content">
 *   ...
 * </main>
 */
export interface SkipLinkProps {
  targetId?: string
  label?: string
  className?: string
}

export function SkipLink({
  targetId = "main-content",
  label = "Skip to main content",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-interactive)] focus:text-[var(--color-interactive-foreground)] focus:rounded-[var(--radius-md)] focus:font-medium focus:text-[var(--text-base)] focus:transition-all focus:duration-[var(--duration-fast)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-interactive)]",
        className
      )}
    >
      {label}
    </a>
  )
}
