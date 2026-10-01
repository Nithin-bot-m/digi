'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { GA_MEASUREMENT_ID, readConsent, writeConsent } from '@/lib/analytics'

/**
 * <AnalyticsScript> — injects the GA4 gtag.js script ONLY when:
 *  (a) NEXT_PUBLIC_GA_ID is set, AND
 *  (b) the visitor has granted consent.
 *
 * Renders <script> tags via next/script-equivalent JSX (we use plain <script>
 * to avoid the next/script async-defer lifecycle quirks in dev). The script
 * is mounted on the client only (no SSR mismatch).
 *
 * Master Prompt §12: GA4/GTM data layer. Master Prompt §25: consent.
 */
export function AnalyticsScript() {
  const [mounted, setMounted] = React.useState(false)
  const [enabled, setEnabled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setMounted(true)
    const update = () => setEnabled(!!GA_MEASUREMENT_ID && readConsent() === 'granted')
    update()
    window.addEventListener('digi:consent-change', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('digi:consent-change', update)
      window.removeEventListener('storage', update)
    }
  }, [])

  // Fire a virtual page_view on route change when enabled.
  React.useEffect(() => {
    if (!enabled) return
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pathname })
    }
  }, [enabled, pathname])

  if (!mounted || !GA_MEASUREMENT_ID || !enabled) return null

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
            gtag('consent', 'update', {
              analytics_storage: 'granted'
            });
          `,
        }}
      />
    </>
  )
}

/**
 * <ConsentBanner> — only renders when NEXT_PUBLIC_GA_ID is set
 * (i.e. analytics is actually live). If unset, the site sets no analytics
 * cookies and the banner doesn't show — the legal pages reflect this.
 *
 * Stored in localStorage under 'digi_consent_v1'.
 * Three actions: Accept all, Reject all, (Manage preferences collapses to a
 * granular toggle row — here analytics only, since we don't run ads).
 */
export function ConsentBanner() {
  const [mounted, setMounted] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (!GA_MEASUREMENT_ID) return
    // Show only if consent state is unknown (first visit)
    if (readConsent() === 'unknown') setVisible(true)
  }, [])

  if (!mounted || !GA_MEASUREMENT_ID || !visible) return null

  const accept = () => {
    writeConsent('granted')
    setVisible(false)
  }
  const reject = () => {
    writeConsent('denied')
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-ink-deep/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 text-sm text-mist/80">
          <p className="font-semibold text-mist">Analytics cookies</p>
          <p className="mt-1 text-xs text-mist/60">
            We use analytics cookies to understand how visitors use the site and improve it.
            No advertising cookies. See our <a href="/cookies" className="underline">Cookie Policy</a>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reject}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-mist/80 hover:bg-white/5"
          >
            Reject all
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-ribbon px-4 py-2 text-xs font-semibold text-white"
          >
            Accept all
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-white/20 px-3 py-2 text-xs text-mist/60 hover:bg-white/5"
            aria-expanded={expanded}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="mt-4 border-t border-white/10 pt-4 text-xs text-mist/60">
          <p className="mb-2">
            <strong className="text-mist/80">Analytics (Google Analytics 4):</strong> measures
            sessions, engagement and conversions so we can improve the site. IP anonymised. No
            cross-site advertising.
          </p>
          <div className="flex gap-2">
            <button onClick={accept} className="rounded border border-white/15 px-3 py-1.5 text-[11px] hover:bg-white/5">
              Allow analytics
            </button>
            <button onClick={reject} className="rounded border border-white/15 px-3 py-1.5 text-[11px] hover:bg-white/5">
              Block analytics
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
