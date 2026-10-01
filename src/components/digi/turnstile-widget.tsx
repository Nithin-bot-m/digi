'use client'

import * as React from 'react'
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile'

/**
 * <TurnstileWidget> — Cloudflare Turnstile client widget.
 *
 * Renders nothing when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is unset (dev mode),
 * so the contact form works locally without keys. In production, set the
 * site key + the secret key and the widget appears + the token is verified
 * server-side.
 *
 * Uses the explicit render API so we can attach callbacks cleanly. The token
 * is passed up via the `onToken` prop.
 */
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id: string) => void
      remove: (id: string) => void
    }
  }
}

export function TurnstileWidget({
  onToken,
  className,
}: {
  onToken: (token: string) => void
  className?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const widgetIdRef = React.useRef<string | null>(null)
  const [loaded, setLoaded] = React.useState(false)

  // Load the Turnstile script once
  React.useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return
    if (window.turnstile) {
      setLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => setLoaded(true)
    document.head.appendChild(script)
    return () => {
      // Leave the script tag — other widgets may share it
    }
  }, [])

  React.useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !loaded || !containerRef.current || !window.turnstile) return
    if (widgetIdRef.current) return
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'dark',
      size: 'normal',
      callback: (token: string) => onToken(token),
      'expired-callback': () => onToken(''),
      'error-callback': () => onToken(''),
    })
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [loaded, onToken])

  if (!TURNSTILE_SITE_KEY) return null
  return <div ref={containerRef} className={className} aria-label="Anti-spam verification" />
}
