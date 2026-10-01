'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Bot,
  MapPin,
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  ShoppingBag,
  BookOpen,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Section, SectionHeading } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 4 — Be Found (Master Prompt §6 Scene 4)
 *
 * Tone: MIST (light). Accent: cyan #02A3FE.
 *
 * H2: "Be found where your customers search."
 *
 * 3D set-piece: platform tiles orbiting around a central "Your brand" node
 * on desktop (animate-orbit with --orbit-r per tile); on mobile, a 2-col grid.
 * Each tile is a <GlassNode> with an abstract Lucide icon + the platform name
 * as text. Reduced motion: static grid.
 *
 * No third-party logos — abstract glyphs + name as text only.
 */

type Platform = {
  name: string
  Icon: LucideIcon
  color: string
}

const PLATFORMS: Platform[] = [
  { name: 'Google', Icon: Search, color: '#02A3FE' },
  { name: 'AI Search', Icon: Bot, color: '#7B3FFE' },
  { name: 'Maps', Icon: MapPin, color: '#2E4BFE' },
  { name: 'YouTube', Icon: Youtube, color: '#FF544D' },
  { name: 'Instagram', Icon: Instagram, color: '#E93BF2' },
  { name: 'LinkedIn', Icon: Linkedin, color: '#2E4BFE' },
  { name: 'Facebook', Icon: Facebook, color: '#02A3FE' },
  { name: 'Marketplaces', Icon: ShoppingBag, color: '#FF8E2D' },
  { name: 'Directories', Icon: BookOpen, color: '#FFB020' },
  { name: 'Communities', Icon: Users, color: '#7B3FFE' },
]

export function SceneBeFound() {
  const reduced = useReducedMotion()
  return (
    <Section id="scene-4-be-found" scene="4" tone="mist">
      <SectionHeading
        eyebrow="SCENE 4 — BE FOUND"
        h2={<>Be found where your customers search.</>}
        lead={
          <>
            Discovery no longer happens in one place. Customers search Google, ask AI, check
            Maps, watch YouTube, scroll Instagram, browse LinkedIn and Facebook, compare on
            marketplaces, read directories and communities. We build presence across the
            surfaces that matter.
          </>
        }
        align="center"
        tone="light"
        className="mx-auto items-center"
      />

      <OrbitSet reduced={reduced} />

      <p className="mt-10 flex items-center justify-center gap-2 text-xs text-ink/55">
        <Illustrative /> Abstract glyphs — no third-party logos. Platform mix varies per
        business.
      </p>
    </Section>
  )
}

function OrbitSet({ reduced }: { reduced: boolean }) {
  // Mobile: 2-col grid always. Desktop: orbit.
  if (reduced) {
    return <PlatformGrid />
  }

  return (
    <div className="relative mt-14 hidden min-h-[460px] sm:block lg:min-h-[520px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Concentric orbit rings */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-ink/10"
            style={{
              width: `${ring * 240}px`,
              height: `${ring * 240}px`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Central "Your brand" node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-20 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-ink text-center text-mist shadow-2xl"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -10px rgba(46,75,254,0.5)' }}
        >
          <span className="text-3xl font-extrabold text-ribbon">∞</span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-mist/70">
            Your brand
          </span>
        </motion.div>

        {/* Orbiting tiles — distributed across 3 rings */}
        <div className="absolute inset-0">
          {PLATFORMS.map((p, i) => {
            const ringIdx = i % 3 // 0,1,2 → which ring
            const radius = 120 + ringIdx * 120 // 120 / 240 / 360
            // angle: distribute around full circle
            const angle = (i / PLATFORMS.length) * Math.PI * 2
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            return (
              <motion.div
                key={p.name}
                className="absolute left-1/2 top-1/2"
                style={{
                  ['--orbit-r' as string]: `${radius}px`,
                  transform: `translate(${x - 36}px, ${y - 36}px)`,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
                transition={{
                  duration: 0.55,
                  ease: 'easeOut',
                  delay: 0.2 + i * 0.06,
                }}
              >
                <OrbitTile platform={p} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function OrbitTile({ platform }: { platform: Platform }) {
  const { name, Icon, color } = platform
  return (
    <div
      className="glass-light flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-2xl text-ink shadow-md"
      style={{ boxShadow: `0 0 0 1px ${color}22, 0 8px 24px -10px ${color}55` }}
    >
      <Icon className="h-5 w-5" style={{ color }} />
      <span className="text-[9px] font-semibold uppercase tracking-wide text-ink/70">
        {name}
      </span>
    </div>
  )
}

function PlatformGrid() {
  // Used on mobile and reduced motion
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:hidden">
      {PLATFORMS.map((p) => {
        const { name, Icon, color } = p
        return (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="glass-light flex items-center gap-3 rounded-2xl p-3.5 text-ink"
            style={{ boxShadow: `0 0 0 1px ${color}22, 0 6px 20px -10px ${color}55` }}
          >
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: `${color}1A` }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </span>
            <span className="text-sm font-semibold text-ink/80">{name}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
