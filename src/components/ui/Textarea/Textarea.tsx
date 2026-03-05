import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const textareaSizes = {
  md: "px-[var(--space-4)] py-[var(--space-3)] text-[var(--text-base)] min-h-[120px]",
  lg: "px-[var(--space-5)] py-[var(--space-4)] text-[var(--text-lg)] min-h-[160px]",
} as const

const textareaVariants = cva(
  "flex w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-all duration-[var(--duration-fast)] ease-[var(--easing-default)] placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      size: {
        md: textareaSizes.md,
        lg: textareaSizes.lg,
      },
      state: {
        default: "border-[var(--color-border)] focus-visible:border-[var(--color-interactive)]",
        error: "border-[var(--color-destructive)] focus-visible:border-[var(--color-destructive)] focus-visible:ring-[var(--color-destructive)]",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
)

/**
 * Textarea component with label, error message, and multiple sizes.
 * Multi-line text input for messages, comments, and longer text.
 *
 * @example
 * <Textarea
 *   label="Message"
 *   placeholder="Write your message here..."
 *   rows={4}
 * />
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  id?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, size = "md", state = error ? "error" : "default", ...props }, ref) => {
    const textareaId = id || `textarea-${React.useId()}`

    return (
      <div className="flex flex-col gap-[var(--space-2)]">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(textareaVariants({ size, state }), className)}
          aria-invalid={state === "error"}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          ref={ref}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-[var(--text-sm)] text-[var(--color-destructive)]">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
