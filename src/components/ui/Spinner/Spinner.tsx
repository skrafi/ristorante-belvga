import * as React from "react"
import { cn } from "@/lib/utils"

const spinnerSizes = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-3",
  lg: "w-8 h-8 border-4",
} as const

/**
 * Spinner component for loading states.
 * Animated circular border to indicate loading progress.
 *
 * @example
 * <Spinner size="md" aria-label="Loading" />
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof spinnerSizes
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-block rounded-full border-[var(--color-border)] border-t-[var(--color-interactive)] animate-spin",
          spinnerSizes[size],
          className
        )}
        role="status"
        aria-label="Loading"
        {...props}
      />
    )
  }
)
Spinner.displayName = "Spinner"
