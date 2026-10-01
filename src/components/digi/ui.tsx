'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CtaArrow, GradientRule, Sparkle } from './brand'
import { useReducedMotion, scrollToSection } from './hooks'
import { analytics } from '@/lib/analytics'

/* ====================================================================== */
/* Layout primitives                                                       */
/* ====================================================================== */

export function Section({
  id,
  scene,
  children,
  className,
  tone = 'dark',
  full = false,
}: {
  id: string
  scene?: string
  children: React.ReactNode
  className?: string
  tone?: 'dark' | 'light' | 'mist'
  full?: boolean
}) {
  const bg =
    tone === 'dark'
      ? 'stage-ink text-mist'
      : tone === 'mist'
        ? 'stage-mist text-ink'
        : 'bg-background text-foreground'
  return (
    <section
      id={id}
      data-scene={scene}
      data-tone={tone}
      className={cn('relative scroll-mt-[88px] py-20 sm:py-24 lg:py-28', bg, className)}
    >
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', full ? 'max-w-[1400px]' : 'max-w-7xl')}>{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan', className)}>
      <Sparkle size={12} />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  h2,
  lead,
  align = 'left',
  tone = 'dark',
  className,
}: {
  eyebrow?: string
  h2: React.ReactNode
  lead?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}) {
  const fg = tone === 'dark' ? 'text-mist' : 'text-ink'
  const leadFg = tone === 'dark' ? 'text-mist/70' : 'text-ink/70'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn('text-balance text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl', fg)}
      >
        {h2}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className={cn('max-w-2xl text-base leading-relaxed sm:text-lg', leadFg)}
        >
          {lead}
        </motion.p>
      )}
      <GradientRule className="h-px w-16" />
    </div>
  )
}

/* ====================================================================== */
/* CTA button                                                              */
/* ====================================================================== */

export function CtaButton({
  children,
  href = '#growth-score',
  variant = 'primary',
  onClick,
  className,
}: {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'ghost' | 'light'
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}) {
  const styles = {
    primary:
      'bg-ribbon text-white glow-ribbon hover:scale-[1.02]',
    ghost: 'border border-white/25 bg-white/5 text-mist hover:bg-white/10',
    light: 'bg-ink text-mist hover:bg-ink-soft',
  }[variant]
  return (
    <a
      href={href}
      onClick={(e) => {
        // Fire the cta_click event (no-op when analytics is disabled or consent denied)
        const label = typeof children === 'string' ? children : 'cta'
        analytics.ctaClick(href, label, href.startsWith('#') ? undefined : href)
        if (onClick) {
          onClick(e)
          return
        }
        if (href.startsWith('#')) {
          e.preventDefault()
          scrollToSection(href.slice(1))
        }
      }}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
        styles,
        className,
      )}
    >
      {children}
      <CtaArrow />
    </a>
  )
}

/* ====================================================================== */
/* Glass node — the building block for stage/platform/solution tiles      */
/* ====================================================================== */

export function GlassNode({
  index,
  title,
  accent,
  children,
  className,
  onClick,
}: {
  index?: string
  title: string
  accent?: string // hex color
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const accentColor = accent || '#2E4BFE'
  const Wrapper = onClick ? 'button' : 'div'
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={onClick ? { y: -4, scale: 1.01 } : undefined}
      className={cn('group relative', className)}
    >
      <Wrapper
        onClick={onClick}
        className={cn(
          'glass-dark relative flex h-full w-full flex-col gap-3 rounded-2xl p-5 text-left',
          onClick && 'cursor-pointer',
        )}
        style={{ boxShadow: `0 0 0 1px ${accentColor}22, 0 12px 40px -12px ${accentColor}55` }}
      >
        <div className="flex items-center justify-between">
          {index && (
            <span
              className="font-mono text-xs tabular"
              style={{ color: accentColor }}
            >
              {index}
            </span>
          )}
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: accentColor, boxShadow: `0 0 12px ${accentColor}` }}
          />
        </div>
        <h3 className="text-lg font-bold text-mist">{title}</h3>
        {children}
      </Wrapper>
    </motion.div>
  )
}

/* ====================================================================== */
/* Side panel drawer (node click → glass side panel)                      */
/* ====================================================================== */

export function SidePanel({
  open,
  onClose,
  title,
  accent = '#2E4BFE',
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  accent?: string
  children: React.ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[95] h-dvh w-full max-w-md overflow-y-auto glass-dark"
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            role="dialog"
            aria-label={title}
            aria-modal="true"
          >
            <div
              className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-ink-deep/80 p-5 backdrop-blur"
              style={{ boxShadow: `inset 0 -2px 0 ${accent}` }}
            >
              <h3 className="text-lg font-bold text-mist">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-mist/70 hover:bg-white/10 hover:text-mist"
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 text-sm text-mist/80">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

/* ====================================================================== */
/* Helpers                                                                 */
/* ====================================================================== */

export function Tag({ children, color = '#2E4BFE' }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
      style={{
        color,
        background: `${color}1A`,
        border: `1px solid ${color}33`,
      }}
    >
      {children}
    </span>
  )
}

export function Table({ rows, tone = 'dark' }: { rows: [string, React.ReactNode][]; tone?: 'dark' | 'light' }) {
  const head = tone === 'dark' ? 'text-mist/50' : 'text-ink/50'
  const cell = tone === 'dark' ? 'text-mist/85' : 'text-ink/85'
  const border = tone === 'dark' ? 'border-white/10' : 'border-ink/10'
  return (
    <div className={cn('overflow-hidden rounded-2xl border', border)}>
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} className={cn(i > 0 && 'border-t', border)}>
              <td className={cn('w-1/3 px-4 py-3 align-top text-xs font-semibold uppercase tracking-wider', head)}>
                {k}
              </td>
              <td className={cn('px-4 py-3 align-top', cell)}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
