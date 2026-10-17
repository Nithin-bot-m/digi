'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/digi/site-header'
import { SiteFooter } from '@/components/digi/site-footer'
import { AnalyticsScript, ConsentBanner } from '@/components/digi/analytics'
import { MobileActionBar } from '@/components/digi/mobile-action-bar'

/**
 * SiteShell — shared chrome for every route.
 * Renders the sticky header, sticky footer (mt-auto), the GA4 analytics script
 * (consent-gated), mobile action bar, and the cookie consent banner.
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

  return (
    <div id="top" className="page-shell bg-background text-foreground transition-colors duration-300">
      <SiteHeader />
      <main className="relative z-10 flex-1">{children}</main>
      <SiteFooter />
      <MobileActionBar />
      <AnalyticsScript />
      <ConsentBanner />
    </div>
  )
}
