'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Digi∞Artha brand component library
 * Features the official Digi∞Artha logo, vector infinity ribbon, and signature motifs.
 *
 * Palette: Cyan #02A3FE → Royal #2E4BFE → Violet #7B3FFE →
 *          Magenta #E93BF2 → Coral #FF544D → Orange #FF8E2D
 * Plus Ink Navy #001331, Mist #FDFDFD, Amber #FFB020.
 *
 * Components:
 *  - <BrandLogo />        the official Digi∞Artha logo graphic (light/dark/mark variants)
 *  - <InfinityLogo />     the gradient ∞ ribbon with arrowhead + optional sparkle
 *  - <Sparkle />          the 4-point sparkle micro-motif
 *  - <ChevronA />         the stylized chevron "A" from the official logo
 *  - <Wordmark />         Digi∞Artha brand lockup (defaults to official BrandLogo)
 *  - <Tagline />          "Digital. Measurable. Growth." flanked by gradient rules
 *  - <Illustrative />     small "Illustrative" pill for any non-verified number
 *  - <LogoLockup />       full vertical lockup (logo + wordmark + tagline)
 *  - <CtaArrow />         the brand directional arrow
 */

const GRADIENT_STOPS = [
  { o: 0.0, c: '#02A3FE' },
  { o: 0.2, c: '#2E4BFE' },
  { o: 0.4, c: '#7B3FFE' },
  { o: 0.6, c: '#E93BF2' },
  { o: 0.8, c: '#FF544D' },
  { o: 1.0, c: '#FF8E2D' },
]

export function RibbonGradient({ id = 'digi-ribbon-grad', direction = 'lr' }: { id?: string; direction?: 'lr' | 'diag' }) {
  return (
    <linearGradient id={id} {...(direction === 'lr' ? { x1: 0, y1: 1, x2: 1, y2: 0 } : { x1: 0, y1: 0, x2: 1, y2: 1 })}>
      {GRADIENT_STOPS.map((s) => (
        <stop key={s.o} offset={s.o} stopColor={s.c} />
      ))}
    </linearGradient>
  )
}

export function Sparkle({
  className,
  size = 16,
  gradientId,
  mono = false,
}: {
  className?: string
  size?: number
  gradientId?: string
  mono?: boolean
}) {
  const generatedId = React.useId()
  const id = gradientId || `sparkle-${generatedId}`
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {mono ? (
          <></>
        ) : (
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#02A3FE" />
            <stop offset="0.5" stopColor="#7B3FFE" />
            <stop offset="1" stopColor="#E93BF2" />
          </linearGradient>
        )}
      </defs>
      <path
        d="M12 0 C12.4 6, 13.8 9.5, 18 10 C13.8 10.5, 12.4 14, 12 24 C11.6 14, 10.2 10.5, 6 10 C10.2 9.5, 11.6 6, 12 0 Z"
        fill={mono ? 'currentColor' : `url(#${id})`}
      />
      <path
        d="M12 6 L12.6 9.4 L16 10 L12.6 10.6 L12 14 L11.4 10.6 L8 10 L11.4 9.4 Z"
        fill={mono ? 'currentColor' : '#FFFFFF'}
        opacity={mono ? 0.4 : 0.9}
      />
    </svg>
  )
}

/**
 * Stylized chevron "A" from the official logo
 */
export function ChevronA({ className, variant = 'left' }: { className?: string; variant?: 'left' | 'right' }) {
  const generatedId = React.useId()
  const gradId = `chev-${variant}-${generatedId}`
  return (
    <svg className={cn('inline-block align-baseline', className)} viewBox="0 0 20 24" width="0.82em" height="0.95em" fill="none">
      <defs>
        {variant === 'left' ? (
          <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#2E4BFE" />
            <stop offset="100%" stopColor="#E93BF2" />
          </linearGradient>
        ) : (
          <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#E93BF2" />
            <stop offset="100%" stopColor="#FF8E2D" />
          </linearGradient>
        )}
      </defs>
      <path d="M 2 22 L 10 2 L 18 22" stroke={`url(#${gradId})`} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Official Brand Logo Component
 * Renders the exact official Digi∞Artha logo graphic.
 */
export function BrandLogo({
  variant = 'dark',
  size = 'md',
  format = 'full',
  className,
  glow = false,
  priority = false,
}: {
  variant?: 'light' | 'dark' | 'badge'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  format?: 'full' | 'mark'
  className?: string
  glow?: boolean
  priority?: boolean
}) {
  const sizeClasses = {
    xs: format === 'mark' ? 'h-6 w-6' : 'h-8 w-auto',
    sm: format === 'mark' ? 'h-9 w-9' : 'h-10 sm:h-11 w-auto',
    md: format === 'mark' ? 'h-11 w-11' : 'h-12 sm:h-14 w-auto',
    lg: format === 'mark' ? 'h-16 w-16' : 'h-16 sm:h-20 w-auto',
    xl: format === 'mark' ? 'h-24 w-24' : 'h-24 sm:h-32 w-auto',
    '2xl': format === 'mark' ? 'h-32 w-32' : 'h-32 sm:h-40 w-auto',
  }

  const src =
    format === 'mark'
      ? '/logo-mark.png'
      : variant === 'badge'
        ? '/logo-badge.png'
        : variant === 'dark'
          ? '/logo-white.png'
          : '/logo.png'

  return (
    <div
      className={cn(
        'inline-flex items-center select-none',
        glow && 'filter drop-shadow-[0_0_24px_rgba(123,63,254,0.45)]',
        className,
      )}
    >
      <img
        src={src}
        alt="Digi∞Artha — Digital. Measurable. Growth."
        className={cn('block object-contain max-h-full transition-transform duration-200', sizeClasses[size])}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}

export function InfinityLogo({
  className,
  strokeWidth = 18,
  withSparkle = true,
  withArrowhead = true,
  glow = false,
}: {
  className?: string
  strokeWidth?: number
  withSparkle?: boolean
  withArrowhead?: boolean
  glow?: boolean
}) {
  const gid = React.useId()
  const sparkleId = `inf-sparkle-${gid}`
  const arrowGradId = `inf-arrow-${gid}`
  return (
    <svg
      className={className}
      viewBox="0 0 240 140"
      fill="none"
      aria-label="Digi∞Artha infinity"
      style={glow ? { filter: 'drop-shadow(0 0 24px rgba(123,63,254,0.45))' } : undefined}
    >
      <defs>
        <RibbonGradient id={`inf-${gid}`} direction="diag" />
        <radialGradient id={sparkleId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.4" stopColor="#02A3FE" />
          <stop offset="1" stopColor="#7B3FFE" />
        </radialGradient>
        <linearGradient id={arrowGradId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF544D" />
          <stop offset="100%" stopColor="#FF8E2D" />
        </linearGradient>
      </defs>
      {/* Infinity ribbon — continuous loop matching the official brand mark */}
      <path
        d="M 30 70 C 30 32, 70 32, 100 60 C 112 70, 120 70, 120 70 C 120 70, 128 70, 140 60 C 170 32, 210 32, 210 70 C 210 108, 170 108, 140 80 C 128 70, 120 70, 120 70 C 120 70, 112 70, 100 80 C 70 108, 30 108, 30 70 Z"
        stroke={`url(#inf-${gid})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {withArrowhead && (
        <path d="M 196 38 L 222 20 L 208 52 Z" fill={`url(#${arrowGradId})`} />
      )}
      {withSparkle && (
        <g transform="translate(28 20)">
          <path
            d="M 0 -11 C 1 -4, 3 -2, 10 -1 C 3 0, 1 2, 0 9 C -1 2, -3 0, -10 -1 C -3 -2, -1 -4, 0 -11 Z"
            fill={`url(#${sparkleId})`}
          />
        </g>
      )}
    </svg>
  )
}

type Variant = 'light' | 'dark'

export function Wordmark({
  variant = 'dark',
  className,
  showSparkle = true,
  size = 'md',
  mode = 'official',
}: {
  variant?: Variant
  className?: string
  showSparkle?: boolean
  size?: 'sm' | 'md' | 'lg'
  mode?: 'official' | 'inline'
}) {
  if (mode === 'official') {
    return (
      <BrandLogo
        variant={variant}
        size={size}
        className={className}
        glow={variant === 'dark'}
      />
    )
  }

  const sizes = {
    sm: { digi: 'text-base', artha: 'text-base', inf: 18 },
    md: { digi: 'text-xl', artha: 'text-xl', inf: 24 },
    lg: { digi: 'text-3xl', artha: 'text-3xl', inf: 34 },
  } as const
  const s = sizes[size]
  const textColor = variant === 'dark' ? 'text-mist' : 'text-ink'
  return (
    <span className={cn('inline-flex items-baseline gap-1.5 font-extrabold', textColor, className)}>
      <span className={cn(s.digi, 'tracking-tight')}>Digi</span>
      <InfinityLogo className="inline-block align-middle" strokeWidth={s.inf} withSparkle={showSparkle} withArrowhead />
      <span className={cn(s.artha, 'tracking-[0.2em] inline-flex items-baseline')}>
        <ChevronA variant="left" />
        <span>RTH</span>
        <ChevronA variant="right" />
      </span>
    </span>
  )
}

export function Tagline({
  variant = 'dark',
  className,
  withRules = true,
}: {
  variant?: Variant
  className?: string
  withRules?: boolean
}) {
  const fg = variant === 'dark' ? 'text-mist/70' : 'text-ink/60'
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {withRules && <GradientRule className="h-px w-8" />}
      <span className={cn('text-[11px] font-medium uppercase tracking-[0.28em]', fg)}>
        Digital. Measurable. Growth.
      </span>
      {withRules && <GradientRule className="h-px w-8" />}
    </div>
  )
}

export function GradientRule({ className }: { className?: string }) {
  return <div className={cn('bg-ribbon', className)} />
}

export function LogoLockup({
  variant = 'dark',
  size = 'lg',
  tagline = true,
  className,
}: {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tagline?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <BrandLogo variant={variant} size={size} glow={variant === 'dark'} />
      {tagline && <Tagline variant={variant} />}
    </div>
  )
}

/** Small pill that flags any non-verified number, per Master Prompt §14 guardrails */
export function Illustrative({ className, label = 'Illustrative' }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber',
        className,
      )}
    >
      {label}
    </span>
  )
}

/** The "stage → CTA" arrow used in CTAs (the logo's own arrow, NOT a rocket) */
export function CtaArrow({ className }: { className?: string }) {
  return (
    <svg className={cn('inline-block', className)} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
