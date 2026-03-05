"use client"

import * as React from "react"
import { create } from "zustand"
import { Toast as ToastComponent } from "./Toast"

export type ToastVariant = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  variant: ToastVariant
  title?: string
  message?: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    set((state) => ({ toasts: [...state.toasts, newToast] }))

    if (toast.duration !== 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
      }, toast.duration || 5000)
    }
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  clearToasts: () => set({ toasts: [] }),
}))

/**
 * ToastProvider component that manages toast notifications.
 * Place this component at the root of your app.
 *
 * @example
 * <ToastProvider />
 */
export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-[var(--space-6)] right-[var(--space-6)] z-50 flex flex-col gap-[var(--space-3)] pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto animate-slideIn">
          <ToastComponent
            variant={toast.variant}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  )
}

/**
 * Hook to add toast notifications.
 *
 * @example
 * const { toast } = useToast()
 * toast({ variant: "success", title: "Success", message: "Your reservation is confirmed!" })
 */
export function useToast() {
  const { addToast, removeToast, clearToasts } = useToastStore()

  return {
    toast: (props: Omit<Toast, "id">) => addToast(props),
    remove: (id: string) => removeToast(id),
    clear: () => clearToasts(),
  }
}
