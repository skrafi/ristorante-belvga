import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-[var(--space-6)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-normal)] ease-[var(--easing-out)]",
  {
    variants: {
      variant: {
        default: "border border-[var(--color-border)]",
        interactive: "border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 cursor-pointer",
        featured: "border-2 border-[var(--color-interactive)] shadow-[var(--shadow-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Card component with multiple variants.
 * Use for content containers, interactive cards, and featured items.
 *
 * @example
 * <Card variant="interactive" onClick={handleClick}>
 *   <CardHeader>
 *     <CardTitle>Featured Dish</CardTitle>
 *   </CardHeader>
 *   <CardContent>...</CardContent>
 * </Card>
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  )
)
Card.displayName = "Card"

/**
 * CardHeader component for card title section.
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-[var(--space-2)] mb-[var(--space-4)]", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle component for card heading.
 */
export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold text-[var(--text-xl)] leading-[var(--leading-snug)] text-[var(--color-text-primary)]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription component for card subtitle.
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[var(--text-sm)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent component for card body.
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter component for card actions section.
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-[var(--space-4)] pt-[var(--space-6)]", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
