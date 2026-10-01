'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BrandLogo, Wordmark, CtaArrow } from './brand'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/industries', label: 'Industries' },
  { href: '/growth-score', label: 'Growth Score' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const LIGHT_ROUTES = new Set([
  '/growth-score',
  '/case-studies',
  '/about',
  '/insights',
  '/technology',
])

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [headerTone, setHeaderTone] = React.useState<'light' | 'dark'>(() =>
    LIGHT_ROUTES.has(pathname) ? 'light' : 'dark',
  )

  React.useEffect(() => {
    const updateHeader = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)

      // When near top of page, use route-based tone
      if (window.scrollY < 50) {
        setHeaderTone(LIGHT_ROUTES.has(pathname) ? 'light' : 'dark')
        return
      }

      // When scrolled, sample the element underneath the header
      const el = document.elementFromPoint(window.innerWidth / 2, 80)
      if (el) {
        const section = el.closest('[data-tone]')
        if (section) {
          const tone = section.getAttribute('data-tone')
          setHeaderTone(tone === 'mist' || tone === 'light' ? 'light' : 'dark')
          return
        }
      }

      // Fallback
      if (LIGHT_ROUTES.has(pathname)) {
        setHeaderTone('light')
      } else {
        setHeaderTone('dark')
      }
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [pathname])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const isLight = headerTone === 'light'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isLight
          ? scrolled || open
            ? 'backdrop-blur-xl bg-white/90 border-b border-ink/10 shadow-[0_10px_30px_-10px_rgba(0,19,49,0.08)]'
            : 'backdrop-blur-md bg-white/70 border-b border-ink/8 shadow-[0_4px_20px_-4px_rgba(0,19,49,0.05)]'
          : scrolled || open
            ? 'backdrop-blur-xl bg-ink/90 border-b border-white/10 shadow-2xl'
            : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Digi∞Artha home"
        >
          <BrandLogo
            variant={isLight ? 'light' : 'dark'}
            size="md"
            glow={!isLight}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                  isLight
                    ? active
                      ? 'bg-ink/10 text-ink font-semibold shadow-inner'
                      : 'text-ink/75 hover:bg-ink/5 hover:text-ink'
                    : active
                      ? 'bg-white/10 text-mist font-semibold shadow-inner'
                      : 'text-mist/75 hover:bg-white/5 hover:text-mist',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/growth-score"
            className="hidden items-center gap-1.5 rounded-full bg-ribbon px-4 py-2 text-sm font-semibold text-white shadow-lg glow-ribbon transition hover:scale-[1.02] sm:inline-flex"
          >
            Analyse My Growth
            <CtaArrow />
          </Link>
          <button
            className={cn(
              'inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden',
              isLight ? 'text-ink hover:bg-ink/5' : 'text-mist hover:bg-white/5',
            )}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className={cn(
              'lg:hidden border-t px-4 py-6 shadow-2xl backdrop-blur-2xl transition-colors',
              isLight
                ? 'border-ink/10 bg-white/95 text-ink'
                : 'border-white/10 bg-ink-deep/98 text-mist',
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="mx-auto max-w-lg flex flex-col gap-4">
              <ul className="flex flex-col gap-1.5">
                {NAV.map((item, idx) => {
                  const active = isActive(item.href)
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all active:scale-[0.98]',
                          isLight
                            ? active
                              ? 'bg-ink/10 text-royal font-bold shadow-inner'
                              : 'text-ink/80 hover:bg-ink/5 hover:text-ink'
                            : active
                              ? 'bg-white/10 text-cyan shadow-inner'
                              : 'text-mist/85 hover:bg-white/5 hover:text-mist',
                        )}
                      >
                        <span>{item.label}</span>
                        <CtaArrow className="opacity-50" />
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              <div
                className={cn(
                  'pt-3 border-t flex flex-col gap-2.5',
                  isLight ? 'border-ink/10' : 'border-white/10',
                )}
              >
                <Link
                  href="/growth-score"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ribbon px-5 py-3 text-sm font-bold text-white shadow-lg glow-ribbon"
                >
                  Analyse My Growth Score™
                  <CtaArrow />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all',
                    isLight
                      ? 'border border-ink/15 bg-ink/5 text-ink hover:bg-ink/10'
                      : 'border border-white/20 bg-white/5 text-mist hover:bg-white/10',
                  )}
                >
                  Talk to a Growth Strategist
                </Link>
              </div>

              <div className="mt-2 text-center">
                <p
                  className={cn(
                    'text-[10px] uppercase tracking-[0.25em] font-medium',
                    isLight ? 'text-ink/40' : 'text-mist/40',
                  )}
                >
                  Digital. Measurable. Growth.
                </p>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
