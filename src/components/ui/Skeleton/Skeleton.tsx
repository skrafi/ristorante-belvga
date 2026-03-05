import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "animate-shimmer bg-gradient-to-r from-[var(--color-surface-alt)] via-[var(--color-surface)] to-[var(--color-surface-alt)] bg-[length:200%_100%]",
  {
    variants: {
      variant: {
        text: "h-4 rounded-[var(--radius-sm)]",
        title: "h-8 rounded-[var(--radius-sm)]",
        image: "aspect-video rounded-[var(--radius-md)] w-full",
        card: "h-48 rounded-[var(--radius-lg)] w-full",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  }
)

/**
 * Skeleton component for loading states.
 * Animated placeholder that matches content shape.
 *
 * @example
 * <Skeleton variant="text" className="w-3/4" />
 * <Skeleton variant="image" />
 */
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      role="status"
      aria-label="Loading"
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"
