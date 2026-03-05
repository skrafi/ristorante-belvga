import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "../Spinner"

/**
 * Button component variants
 */
const buttonVariants = {
  primary: "bg-[var(--color-interactive)] text-[var(--color-interactive-foreground)] hover:bg-[var(--color-interactive-hover)]",
  secondary: "bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-interactive)] hover:text-[var(--color-interactive)]",
  ghost: "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-interactive)]",
  accent: "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)]",
} as const

const buttonSizes = {
  sm: "px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-sm)]",
  md: "px-[var(--space-4)] py-[var(--space-3)] text-[var(--text-base)]",
  lg: "px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-lg)]",
} as const

/**
 * Button component with loading state and multiple variants.
 * Supports primary, secondary, ghost, and accent variants with sm, md, lg sizes.
 *
 * @example
 * <Button variant="primary" size="md" isLoading onClick={handleClick}>
 *   Submit
 * </Button>
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  isLoading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-all duration-[var(--duration-fast)] ease-[var(--easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <Spinner size={size === "lg" ? "md" : "sm"} aria-hidden="true" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
