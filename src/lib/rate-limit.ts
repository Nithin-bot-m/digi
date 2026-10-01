/**
 * Simple in-memory per-IP rate limiter.
 *
 * Adequate for a single-instance deployment. For multi-instance / serverless,
 * swap this for an Upstash Redis or KV-backed limiter — the public API
 * (`rateLimit(key, opts)`) stays the same.
 *
 * Returns:
 *  - { ok: true } if under the limit
 *  - { ok: false, retryAfter } if over the limit (retryAfter = seconds until
 *    the oldest request in the window expires)
 */

type Bucket = { ts: number[] }

const buckets = new Map<string, Bucket>()

// Periodic GC so we don't leak memory on long-lived processes.
const GC_INTERVAL_MS = 5 * 60 * 1000
let lastGc = Date.now()

function gc(now: number, windowMs: number) {
  if (now - lastGc < GC_INTERVAL_MS) return
  lastGc = now
  const cutoff = now - windowMs
  for (const [key, bucket] of buckets) {
    bucket.ts = bucket.ts.filter((t) => t > cutoff)
    if (bucket.ts.length === 0) buckets.delete(key)
  }
}

export function rateLimit(
  key: string,
  opts: { max: number; windowMs: number },
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now()
  gc(now, opts.windowMs)

  const bucket = buckets.get(key) || { ts: [] }
  const cutoff = now - opts.windowMs
  bucket.ts = bucket.ts.filter((t) => t > cutoff)

  if (bucket.ts.length >= opts.max) {
    const oldest = bucket.ts[0]
    const retryAfter = Math.ceil((oldest + opts.windowMs - now) / 1000)
    return { ok: false, retryAfter: Math.max(1, retryAfter) }
  }

  bucket.ts.push(now)
  buckets.set(key, bucket)
  return { ok: true }
}

/** Helper to get a stable client IP from Next.js request headers. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  return '0.0.0.0'
}
