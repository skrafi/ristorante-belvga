import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputSizes = {
  md: "px-[var(--space-4)] py-[var(--space-3)] text-[var(--text-base)]",
  lg: "px-[var(--space-5)] py-[var(--space-4)] text-[var(--text-lg)]",
} as const

const inputVariants = cva(
  "flex w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-all duration-[var(--duration-fast)] ease-[var(--easing-default)] placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        md: inputSizes.md,
        lg: inputSizes.lg,
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
 * Input component with label, error message, and multiple sizes.
 * Supports text, email, phone types with error state handling.
 *
 * @example
 * <Input
 *   type="email"
 *   label="Email address"
 *   placeholder="you@example.com"
 *   error="Invalid email address"
 *   state="error"
 * />
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  id?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, size = "md", state = error ? "error" : "default", ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`

    return (
      <div className="flex flex-col gap-[var(--space-2)]">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(inputVariants({ size, state }), className)}
          aria-invalid={state === "error"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          ref={ref}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-[var(--text-sm)] text-[var(--color-destructive)]">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"
