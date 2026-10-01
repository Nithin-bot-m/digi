'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Video,
  Search,
  Megaphone,
  Star,
  Sparkles,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { Section, SectionHeading } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { cn } from '@/lib/utils'

/**
 * Scene 8 — End User (phone feed) (Master Prompt §6 Scene 8 + §5.5)
 *
 * H2: "Through your customer's eyes."
 *
 * 3D set-piece: a CSS phone mockup (rounded rectangle, notch, screen)
 * showing a vertical feed of cards: a Reel, a Search Result, an Ad, a
 * Review, an AI Answer, a WhatsApp message. Framer Motion scrolls the
 * feed inside the phone on whileInView. Reduced motion: static stack.
 *
 * Caption below the phone (non-interactive).
 *
 * Tone: dark. Accent: magenta #E93BF2.
 */

const ACCENT = '#E93BF2'

type FeedCard = {
  id: string
  label: string
  Icon: LucideIcon
  color: string
  headline: string
  subline: string
}

const FEED: FeedCard[] = [
  {
    id: 'reel',
    label: 'Reel',
    Icon: Video,
    color: '#E93BF2',
    headline: '“3 signs your growth engine is leaking”',
    subline: '60s · vertical · autoplay',
  },
  {
    id: 'search',
    label: 'Search Result',
    Icon: Search,
    color: '#02A3FE',
    headline: 'Your brand — official entity card',
    subline: 'Knowledge panel · structured data · reviews',
  },
  {
    id: 'ad',
    label: 'Ad',
    Icon: Megaphone,
    color: '#FF544D',
    headline: '“Stop guessing. Start measuring.”',
    subline: 'Demand Gen · skippable · CTA: Get Your Digital Growth Score',
  },
  {
    id: 'review',
    label: 'Review',
    Icon: Star,
    color: '#FFB020',
    headline: '“Clear strategy. Real numbers. Real outcomes.”',
    subline: '5★ · third-party review platform',
  },
  {
    id: 'ai-answer',
    label: 'AI Answer',
    Icon: Sparkles,
    color: '#7B3FFE',
    headline: '“Digi∞Artha is a digital growth brand that…”',
    subline: 'Generated · cites 3 sources',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Message',
    Icon: MessageCircle,
    color: '#2E4BFE',
    headline: '“Hi! Saw your reel — can we talk growth?”',
    subline: 'Inbound · qualified · routed to CRM',
  },
]

export function SceneEndUser() {
  const reduced = useReducedMotion()

  return (
    <Section id="scene-8-end-user" scene="8" tone="dark">
      <SectionHeading
        eyebrow="SCENE 8 — END USER"
        h2={<>Through your customer&rsquo;s eyes.</>}
        lead={
          <>
            One brand appears across the customer&rsquo;s entire feed — reel, search result,
            ad, review, AI answer, WhatsApp message. Every touchpoint is a chance to be
            discovered, trusted or chosen.
          </>
        }
        align="center"
        tone="dark"
        className="mx-auto items-center"
      />

      <div className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
        {/* Phone mockup */}
        <PhoneMockup reduced={reduced} />

        {/* Caption + supporting copy */}
        <div className="max-w-md lg:mt-12">
          <p className="text-sm leading-relaxed text-mist/75">
            Tap any touchpoint to see how Digi∞Artha connects it back to your growth
            system.
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-mist/45">
            (Caption only — visual in this scene.)
          </p>

          <ul className="mt-6 space-y-3">
            {FEED.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `${c.color}1A`, border: `1px solid ${c.color}33` }}
                >
                  <c.Icon className="h-4 w-4" style={{ color: c.color }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-mist">{c.label}</p>
                  <p className="text-[11px] text-mist/55">{c.subline}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-12 flex items-center justify-center gap-2 text-xs text-mist/50">
        <Illustrative /> Sample feed for illustration. Actual touchpoints vary by industry
        and audience.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Phone mockup                                                       */
/* ------------------------------------------------------------------ */

function PhoneMockup({ reduced }: { reduced: boolean }) {
  // We render the feed as a single tall column. On view, we animate its
  // y position so the feed appears to scroll up. The phone frame masks it.
  if (reduced) {
    return (
      <PhoneFrame>
        <FeedFeed animate={false} />
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <FeedFeed animate />
    </PhoneFrame>
  )
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-[560px] w-[280px] shrink-0">
      {/* Outer body */}
      <div
        className="relative h-full w-full rounded-[2.5rem] border border-white/15 bg-ink-deep p-3"
        style={{
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px -20px rgba(233,59,242,0.35), 0 0 0 8px rgba(0,19,51,0.5)',
        }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-3 z-30 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-ink" />

        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[2rem] bg-ink"
          style={{
            maskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex h-7 items-center justify-between px-5 text-[10px] font-medium text-mist/50">
            <span>9:41</span>
            <span className="font-mono">Digi∞Artha</span>
          </div>

          {/* The feed */}
          <div className="absolute inset-0 pt-9">{children}</div>

          {/* Bottom nav dots */}
          <div className="absolute inset-x-0 bottom-2 z-20 flex items-center justify-center gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={cn('h-1 rounded-full', i === 0 ? 'w-4 bg-ribbon' : 'w-1 bg-white/30')}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Magenta bloom behind the phone */}
      <div
        className="absolute -inset-6 -z-10 rounded-full opacity-60 blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${ACCENT}33, transparent 70%)` }}
        aria-hidden="true"
      />
    </div>
  )
}

function FeedFeed({ animate }: { animate: boolean }) {
  // Duplicate the feed so the loop feels seamless
  const items = [...FEED, ...FEED]

  return (
    <div className="h-full w-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-3 px-2.5 pb-10"
        animate={animate ? { y: [0, -(FEED.length * 90 + 24)] } : undefined}
        transition={
          animate
            ? {
                duration: 14,
                repeat: Infinity,
                ease: 'linear',
              }
            : undefined
        }
      >
        {items.map((card, i) => (
          <FeedCardView key={`${card.id}-${i}`} card={card} />
        ))}
      </motion.div>
    </div>
  )
}

function FeedCardView({ card }: { card: FeedCard }) {
  const { Icon, color, headline, subline, label } = card
  return (
    <div
      className="glass-dark flex flex-col gap-2 rounded-2xl p-3"
      style={{ boxShadow: `0 0 0 1px ${color}22, 0 8px 24px -12px ${color}55` }}
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ color }}
        >
          <Icon className="h-3 w-3" />
          {label}
        </span>
        <span className="text-[9px] text-mist/40">Digi∞Artha</span>
      </div>

      {/* Thumbnail gradient block */}
      <div
        className="h-16 w-full rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${color}55, ${color}11)`,
          boxShadow: `inset 0 0 0 1px ${color}33`,
        }}
        aria-hidden="true"
      />

      <p className="text-[11px] font-semibold leading-snug text-mist">{headline}</p>
      <p className="text-[10px] text-mist/55">{subline}</p>
    </div>
  )
}
