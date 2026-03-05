import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-full)] px-[var(--space-2)] py-[var(--space-1)] text-[var(--text-xs)] font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--easing-default)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
        success: "bg-[var(--color-success)] text-white",
        warning: "bg-[var(--color-warning)] text-white",
        info: "bg-[var(--color-info)] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Badge component for displaying status, categories, or labels.
 * Small tag-like element with color variants.
 *
 * @example
 * <Badge variant="success">Available</Badge>
 * <Badge variant="warning">Limited</Badge>
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} role="status" {...props} />
  )
)
Badge.displayName = "Badge"
