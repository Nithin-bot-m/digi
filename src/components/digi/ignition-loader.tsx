'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrandLogo } from './brand'
import { useReducedMotion } from './hooks'

/**
 * Ignition loader (Master Prompt §5.1)
 * Sparkle expands and traces the ∞ in the logo gradient; it becomes the hero
 * ribbon and the wordmark resolves. Under 2.5s, skippable.
 */
export function IgnitionLoader() {
  const [show, setShow] = React.useState(true)
  const reduced = useReducedMotion()

  React.useEffect(() => {
    // Don't show loader again on every navigation; gate by sessionStorage
    try {
      if (sessionStorage.getItem('digi-loaded-once') === '1') {
        setShow(false)
        return
      }
    } catch {
      /* noop */
    }
    const t = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem('digi-loaded-once', '1')
      } catch {
        /* noop */
      }
    }, reduced ? 200 : 2400)
    return () => clearTimeout(t)
  }, [reduced])

  function dismiss() {
    setShow(false)
    try {
      sessionStorage.setItem('digi-loaded-once', '1')
    } catch {
      /* noop */
    }
  }

  if (!show) return null

  const sequence = reduced
    ? { ribbon: { opacity: [0, 1] }, word: { opacity: [0, 1] } }
    : {
        // Sparkle expands → traces ∞ → wordmark resolves
        sparkle: { scale: [0.3, 1.4, 1], opacity: [0, 1, 0.9] },
        ribbon: { opacity: [0, 1], pathLength: [0, 1] },
        word: { opacity: [0, 1], y: [12, 0] },
        tag: { opacity: [0, 1], y: [8, 0] },
      }

  return (
    <AnimatePresence>
      <motion.div
        key="ignition"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center stage-ink"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <div className="absolute inset-0 mesh-grid opacity-40" />
        <div className="relative flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="[filter:drop-shadow(0_0_36px_rgba(123,63,254,0.55))]"
          >
            <BrandLogo variant="dark" size="xl" glow priority />
          </motion.div>
        </div>
        <button
          onClick={dismiss}
          className="absolute bottom-8 right-8 rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-mist/70 transition hover:border-white/40 hover:text-mist"
        >
          Skip intro
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
