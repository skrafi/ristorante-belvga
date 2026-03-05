"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const modalSizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const

const modalVariants = cva(
  "bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]",
  {
    variants: {
      size: {
        sm: modalSizes.sm,
        md: modalSizes.md,
        lg: modalSizes.lg,
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

/**
 * Modal component with focus trap and accessibility features.
 * Closes on Escape key and backdrop click.
 *
 * @example
 * <Modal isOpen={isOpen} onClose={handleClose} title="Confirmation" size="md">
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 */
export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  showCloseButton?: boolean
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      isOpen,
      onClose,
      title,
      description,
      size = "md",
      showCloseButton = true,
      children,
      ...props
    },
    ref
  ) => {
    const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null)
    const modalRef = React.useRef<HTMLDivElement>(null)
    const previousActiveElement = React.useRef<HTMLElement | null>(null)

    // Store trigger element on mount
    React.useEffect(() => {
      previousActiveElement.current = document.activeElement as HTMLElement
      return () => {
        previousActiveElement.current = null
      }
    }, [])

    // Focus trap
    React.useEffect(() => {
      if (!isOpen || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      document.addEventListener("keydown", handleTab)
      firstElement?.focus()

      return () => {
        document.removeEventListener("keydown", handleTab)
        previousActiveElement.current?.focus()
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

    if (!isOpen) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-[var(--space-4)] animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[var(--color-overlay)] cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={(node) => {
            modalRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
          }}
          className={cn(
            "relative w-full max-h-[90vh] overflow-y-auto p-[var(--space-6)] animate-scaleIn",
            modalVariants({ size }),
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between mb-[var(--space-4)]">
              {title && (
                <h2 id="modal-title" className="text-[var(--text-2xl)] font-semibold text-[var(--color-text-primary)]">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="flex-shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-[var(--duration-fast)] p-1 rounded-md hover:bg-[var(--color-surface-alt)]"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <p id="modal-description" className="text-[var(--text-base)] text-[var(--color-text-secondary)] mb-[var(--space-4)]">
              {description}
            </p>
          )}

          {/* Content */}
          <div className="flex flex-col gap-[var(--space-4)]">{children}</div>
        </div>
      </div>
    )
  }
)
Modal.displayName = "Modal"

/**
 * ModalHeader component for modal header section.
 */
export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-start justify-between mb-[var(--space-4)]", className)} {...props} />
))
ModalHeader.displayName = "ModalHeader"

/**
 * ModalTitle component for modal heading.
 */
export const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-[var(--text-2xl)] font-semibold text-[var(--color-text-primary)]", className)}
    {...props}
  />
))
ModalTitle.displayName = "ModalTitle"

/**
 * ModalDescription component for modal subtitle.
 */
export const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[var(--text-base)] text-[var(--color-text-secondary)] mb-[var(--space-4)]", className)}
    {...props}
  />
))
ModalDescription.displayName = "ModalDescription"

/**
 * ModalContent component for modal body.
 */
export const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-[var(--space-4)]", className)} {...props} />
))
ModalContent.displayName = "ModalContent"

/**
 * ModalFooter component for modal actions section.
 */
export const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end gap-[var(--space-3)] mt-[var(--space-6)] pt-[var(--space-6)] border-t border-[var(--color-border)]", className)}
    {...props}
  />
))
ModalFooter.displayName = "ModalFooter"
