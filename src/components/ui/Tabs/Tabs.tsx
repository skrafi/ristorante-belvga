"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

/**
 * Tabs container component with keyboard navigation.
 * Arrow keys navigate between tabs.
 *
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function Tabs({
  className,
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const activeTab = isControlled ? controlledValue : internalValue

  const setActiveTab = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const contextValue = React.useMemo(
    () => ({ activeTab, setActiveTab }),
    [activeTab, setActiveTab]
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

/**
 * TabsList component - container for tab triggers.
 */
export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext()
    const triggersRef = React.useRef<HTMLButtonElement[]>([])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const triggers = triggersRef.current
      const currentIndex = triggers.findIndex((t) => t === document.activeElement)

      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault()
        const direction = e.key === "ArrowRight" ? 1 : -1
        const nextIndex = (currentIndex + direction + triggers.length) % triggers.length
        triggers[nextIndex]?.focus()
        setActiveTab(triggers[nextIndex]?.value || "")
      }
    }

    const childrenWithRefs = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ref: (el: HTMLButtonElement) => {
            triggersRef.current[index] = el
            const { ref: originalRef } = child as any
            if (typeof originalRef === "function") originalRef(el)
            else if (originalRef) originalRef.current = el
          },
        } as any)
      }
      return child
    })

    return (
      <div
        ref={ref}
        className={cn("flex border-b border-[var(--color-border)]", className)}
        role="tablist"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {childrenWithRefs}
      </div>
    )
  }
)
TabsList.displayName = "TabsList"

/**
 * TabsTrigger component - individual tab button.
 */
export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      value={value}
      className={cn(
        "relative px-[var(--space-4)] py-[var(--space-3)] text-[var(--text-base)] font-medium transition-all duration-[var(--duration-fast)] ease-[var(--easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
        className
      )}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-interactive)] animate-slideIn" />
      )}
    </button>
  )
})
TabsTrigger.displayName = "TabsTrigger"

/**
 * TabsContent component - panel for tab content.
 */
export const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { activeTab } = useTabsContext()
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn("py-[var(--space-4)] animate-fadeIn", className)}
      {...props}
    >
      {children}
    </div>
  )
})
TabsContent.displayName = "TabsContent"

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component")
  }
  return context
}
