/**
 * Cloudflare Turnstile verification (Master Prompt §25: "Spam protection
 * and secure forms").
 *
 * Dev mode: if `TURNSTILE_SECRET_KEY` is unset, verification is skipped
 * (the contact form works without CAPTCHA — useful for local dev).
 * Production: set both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client widget)
 * and `TURNSTILE_SECRET_KEY` (server verify) — both come from
 * https://dash.cloudflare.com/?to=/:account/turnstile
 *
 * Same pattern for the rate limiter: a stub when keys are absent, a real
 * siteverify call when present.
 */

const SECRET = process.env.TURNSTILE_SECRET_KEY || ''

export async function verifyTurnstile(token: string | null, ip?: string): Promise<boolean> {
  // Dev mode: no secret configured → accept all
  if (!SECRET) return true
  if (!token) return false

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: SECRET,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    })
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
    return data.success === true
  } catch {
    return false
  }
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
