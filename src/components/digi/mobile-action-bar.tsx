'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Mobbin / Refero Pattern: Mobile Floating Action Bar
 * Gives mobile users a thumb-accessible, 1-tap conversion path.
 */
export function MobileActionBar() {
  const [visible, setVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Show when scrolling up or within top 300px
      if (currentScrollY < 250) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY.current + 15) {
        // Scrolling down fast -> hide
        setVisible(false)
      } else if (currentScrollY < lastScrollY.current - 10) {
        // Scrolling up -> show
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 inset-x-0 z-40 px-4 sm:hidden pointer-events-none"
        >
          <div className="mx-auto max-w-sm flex items-center justify-between gap-2 rounded-full border border-white/20 bg-ink-deep/90 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl pointer-events-auto">
            <Link
              href="/growth-score"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-ribbon px-4 py-2.5 text-xs font-bold text-white shadow-md glow-ribbon"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Growth Score™
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-mist hover:bg-white/10"
            >
              <MessageSquare className="h-3.5 w-3.5 text-cyan" />
              Talk
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
