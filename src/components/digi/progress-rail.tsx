'use client'

import * as React from 'react'
import { useScrollSpy, useScrollProgress, scrollToSection } from './hooks'
import { cn } from '@/lib/utils'

/**
 * Sticky progress rail — only renders on the homepage (gated by SiteShell).
 *
 * Updated for the trimmed homepage (≈6 screens). Stage ids match the actual
 * <section id="..."> values in src/app/page.tsx:
 *   hero · problem · growth-system · growth-loop · solutions · final-cta
 */
const STAGES = [
  { id: 'hero', label: 'Hero', color: '#02A3FE' },
  { id: 'problem', label: 'Problem', color: '#2E4BFE' },
  { id: 'growth-system', label: 'System', color: '#7B3FFE' },
  { id: 'growth-loop', label: 'Loop', color: '#E93BF2' },
  { id: 'solutions', label: 'Solutions', color: '#FF544D' },
  { id: 'final-cta', label: '∞', color: '#FF8E2D' },
] as const

const TRACK_IDS = STAGES.map((s) => s.id)

export function ProgressRail() {
  const active = useScrollSpy(TRACK_IDS as unknown as string[], 0.45)
  const progress = useScrollProgress()

  return (
    <aside
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-label="Page progress"
    >
      <div className="pointer-events-auto flex flex-col items-start gap-3">
        <div className="mb-1 font-mono text-[10px] tabular text-mist/40">
          {String(Math.round(progress * 100)).padStart(2, '0')}%
        </div>
        <div className="relative flex flex-col gap-1">
          {STAGES.map((s, i) => {
            const isActive = active === s.id
            const isPast = TRACK_IDS.indexOf(active ?? '') > i
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="group flex items-center gap-3 py-1"
                aria-label={`Jump to ${s.label}`}
              >
                <span
                  className={cn(
                    'block h-2 w-2 rounded-full transition-all',
                    isActive ? 'scale-150' : 'scale-100',
                  )}
                  style={{
                    background: isActive || isPast ? s.color : 'rgba(255,255,255,0.25)',
                    boxShadow: isActive ? `0 0 16px ${s.color}` : undefined,
                  }}
                />
                <span
                  className={cn(
                    'text-xs font-medium transition',
                    isActive ? 'text-mist' : 'text-mist/0 group-hover:text-mist/60',
                  )}
                >
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
