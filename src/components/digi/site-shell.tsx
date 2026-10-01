'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/digi/site-header'
import { SiteFooter } from '@/components/digi/site-footer'
import { ProgressRail } from '@/components/digi/progress-rail'
import { AnalyticsScript, ConsentBanner } from '@/components/digi/analytics'

/**
 * SiteShell — shared chrome for every route.
 * Renders the sticky header, sticky footer (mt-auto), the left progress
 * rail (homepage only), the GA4 analytics script (consent-gated), and the
 * cookie consent banner (only when GA is enabled).
 *
 * Scrolls to top on route change (so navigating to a subpage doesn't inherit
 * the previous scroll position).
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname])

  // Progress rail only makes sense on the long-scroll homepage.
  const showRail = pathname === '/'

  return (
    <div id="top" className="page-shell bg-ink">
      <SiteHeader />
      {showRail && <ProgressRail />}
      <main className="relative z-10 flex-1">{children}</main>
      <SiteFooter />
      <AnalyticsScript />
      <ConsentBanner />
    </div>
  )
}
