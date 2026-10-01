'use client'

import * as React from 'react'

/** Returns true when the user prefers reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

/** Tracks the active section id based on scroll position. */
export function useScrollSpy(ids: string[], offset = 0.4): string | null {
  const [active, setActive] = React.useState<string | null>(ids[0] ?? null)
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => {
      const probe = window.innerHeight * offset
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= probe) current = id
      }
      if (current) setActive(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [ids, offset])
  return active
}

/** Returns overall scroll progress 0..1 of the document. */
export function useScrollProgress(): number {
  const [p, setP] = React.useState(0)
  React.useEffect(() => {
    const handler = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])
  return p
}

/** Smoothly scrolls to a section id, accounting for the sticky header. */
export function scrollToSection(id: string, headerOffset = 72) {
  const el = document.getElementById(id)
  if (!el) {
    if (id === 'contact') {
      window.location.href = '/contact'
      return
    }
    if (id === 'growth-score') {
      window.location.href = '/growth-score'
      return
    }
    window.location.href = `/#${id}`
    return
  }
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top: y, behavior: 'smooth' })
}

/** Tracks an element's in-view progress (0..1) using IntersectionObserver. */
export function useInViewProgress(threshold = 0.2) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [progress, setProgress] = React.useState(0)
  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setProgress(1)
      },
      { threshold: [threshold] },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, progress }
}
