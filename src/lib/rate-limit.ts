import { NextRequest } from 'next/server'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

export function rateLimit(
  req: NextRequest,
  limit: number,
  windowMs: number
): { success: boolean; resetAt?: number } {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown'
  const key = `${ip}`
  const now = Date.now()

  // Clean up expired entries
  for (const [k, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(k)
    }
  }

  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    // Create new entry
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { success: true, resetAt: now + windowMs }
  }

  if (entry.count >= limit) {
    return { success: false, resetAt: entry.resetAt }
  }

  entry.count++
  return { success: true, resetAt: entry.resetAt }
}

export const rateLimits = {
  availability: { limit: 30, windowMs: 60 * 1000 }, // 30 requests per minute
  reservations: { limit: 5, windowMs: 60 * 1000 },  // 5 requests per minute
}
