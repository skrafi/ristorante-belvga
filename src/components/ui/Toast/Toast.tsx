import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const toastVariants = cva(
  "flex items-start gap-[var(--space-3)] rounded-[var(--radius-lg)] p-[var(--space-4)] shadow-[var(--shadow-lg)] animate-slideIn",
  {
    variants: {
      variant: {
        success: "bg-[var(--color-surface)] border-l-4 border-[var(--color-success)]",
        error: "bg-[var(--color-surface)] border-l-4 border-[var(--color-destructive)]",
        warning: "bg-[var(--color-surface)] border-l-4 border-[var(--color-warning)]",
        info: "bg-[var(--color-surface)] border-l-4 border-[var(--color-info)]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const toastIcons = {
  success: (
    <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-[var(--color-destructive)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-[var(--color-info)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
} as const

/**
 * Toast component for displaying notifications.
 * Auto-dismisses after a configurable delay.
 *
 * @example
 * <Toast variant="success" title="Success" message="Your reservation is confirmed!" />
 */
export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  message?: string
  onClose?: () => void
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, message, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <div className="flex-shrink-0 mt-0.5">{toastIcons[variant || "info"]}</div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-[var(--text-sm)] font-semibold text-[var(--color-text-primary)]">
              {title}
            </p>
          )}
          {message && (
            <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-[var(--space-1)]">
              {message}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-[var(--duration-fast)]"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"
