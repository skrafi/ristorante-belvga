"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "../Button"

/**
 * DatePicker component with calendar interface.
 * Supports keyboard navigation and future-only mode.
 *
 * @example
 * <DatePicker
 *   selected={date}
 *   onSelect={setDate}
 *   minDate={new Date()}
 *   label="Select a date"
 * />
 */
export interface DatePickerProps {
  selected?: Date | null
  onSelect?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  label?: string
  placeholder?: string
  className?: string
}

export function DatePicker({
  selected,
  onSelect,
  minDate,
  maxDate,
  label,
  placeholder = "Select a date",
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())
  const [highlightedDay, setHighlightedDay] = React.useState<number | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const calendarRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Close when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return isSameDay(date, today)
  }

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return
    onSelect?.(date)
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    day: number
  ) => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        if (day > 1) {
          setHighlightedDay(day - 1)
        } else {
          setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
          setHighlightedDay(getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)))
        }
        break
      case "ArrowRight":
        e.preventDefault()
        if (day < daysInMonth) {
          setHighlightedDay(day + 1)
        } else {
          setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
          setHighlightedDay(1)
        }
        break
      case "ArrowUp":
        e.preventDefault()
        if (day > 7) {
          setHighlightedDay(day - 7)
        }
        break
      case "ArrowDown":
        e.preventDefault()
        if (day <= daysInMonth - 7) {
          setHighlightedDay(day + 7)
        }
        break
      case "Enter":
      case " ":
        e.preventDefault()
        handleDateClick(newDate)
        break
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
    const days: React.ReactElement[] = []
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    // Week day headers
    days.push(
      ...weekDays.map((day) => (
        <div
          key={day}
          className="text-[var(--text-xs)] font-medium text-[var(--color-text-tertiary)] text-center py-2"
        >
          {day}
        </div>
      ))
    )

    // Empty cells for days before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />)
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isSelected = selected ? isSameDay(date, selected) : false
      const isDisabled = isDateDisabled(date)
      const isTodayDate = isToday(date)
      const isHighlighted = highlightedDay === day

      days.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => handleDateClick(date)}
          onKeyDown={(e) => handleKeyDown(e, day)}
          onMouseEnter={() => setHighlightedDay(day)}
          aria-label={date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          aria-selected={isSelected}
          aria-disabled={isDisabled}
          className={cn(
            "h-9 w-9 rounded-md text-sm font-medium transition-all duration-[var(--duration-fast)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2",
            isSelected && "bg-[var(--color-interactive)] text-[var(--color-interactive-foreground)]",
            !isSelected && !isDisabled && "hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]",
            isDisabled && "opacity-40 cursor-not-allowed",
            isTodayDate && !isSelected && "border-2 border-[var(--color-interactive)]",
            isHighlighted && !isSelected && "bg-[var(--color-surface-alt)]"
          )}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {label && (
        <label className="block text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)] mb-2">
          {label}
        </label>
      )}
      <Button
        ref={triggerRef}
        type="button"
        variant="secondary"
        className={cn("w-full justify-between text-left", !selected && "text-[var(--color-text-tertiary)]")}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {selected ? formatDate(selected) : placeholder}
        <svg
          className={cn("w-4 h-4 transition-transform duration-[var(--duration-fast)]", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div
          ref={calendarRef}
          className={cn(
            "absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] p-4 z-50 animate-fadeIn"
          )}
          role="dialog"
          aria-label="Calendar"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div className="text-[var(--text-base)] font-semibold text-[var(--color-text-primary)]">
              {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
                currentMonth
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>
      )}
    </div>
  )
}
