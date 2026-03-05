"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

/**
 * Lightbox component for gallery image viewing.
 * Full-screen overlay with prev/next navigation and keyboard controls.
 *
 * @example
 * <Lightbox
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   images={galleryImages}
 *   currentIndex={currentIndex}
 *   onIndexChange={handleIndexChange}
 * />
 */
export interface LightboxImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: LightboxImage[]
  currentIndex: number
  onIndexChange: (index: number) => void
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}: LightboxProps) {
  const [showNav, setShowNav] = React.useState(false)

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onIndexChange(Math.max(0, currentIndex - 1))
          break
        case "ArrowRight":
          onIndexChange(Math.min(images.length - 1, currentIndex + 1))
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange])

  // Show navigation after delay
  React.useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => setShowNav(true), 500)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Prevent body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setShowNav(false)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  const handlePrev = () => {
    if (hasPrev) onIndexChange(currentIndex - 1)
  }

  const handleNext = () => {
    if (hasNext) onIndexChange(currentIndex + 1)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)] animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[var(--space-6)] right-[var(--space-6)] z-10 p-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-lg)] hover:bg-[var(--color-surface-alt)] transition-all duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)]"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {hasPrev && (
        <button
          type="button"
          onClick={handlePrev}
          className={cn(
            "absolute left-[var(--space-6)] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-lg)] hover:bg-[var(--color-surface-alt)] hover:scale-110 transition-all duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)]",
            !showNav && "opacity-0"
          )}
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="relative max-w-[90vw] max-h-[90vh] animate-scaleIn">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={currentImage.width || 1200}
          height={currentImage.height || 800}
          className="max-w-full max-h-[90vh] object-contain rounded-[var(--radius-lg)]"
          priority
        />
      </div>

      {/* Next button */}
      {hasNext && (
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            "absolute right-[var(--space-6)] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-lg)] hover:bg-[var(--color-surface-alt)] hover:scale-110 transition-all duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)]",
            !showNav && "opacity-0"
          )}
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-[var(--space-6)] left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-lg)]">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
