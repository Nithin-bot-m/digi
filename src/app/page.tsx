'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { IgnitionLoader } from '@/components/digi/ignition-loader'
import { BrandLogo, InfinityLogo, Sparkle, CtaArrow, Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { SOLUTION_CARDS } from '@/components/digi/solutions-data'
import { ThreeInfinityVisual } from '@/components/digi/three-infinity-visual'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { BorderBeam } from '@/components/ui/border-beam'
import { InteractiveGrowthCalculator } from '@/components/digi/interactive-growth-calculator'
import { MobileActionBar } from '@/components/digi/mobile-action-bar'

/**
 * Home — the curated Digi∞Artha landing.
 *
 * Kept deliberately short (≈6 screens): Hero → Problem → Growth System →
 * Growth Loop → Solutions overview → Final CTA. Every depth scene + every
 * secondary section lives on its own subpage (see src/app/ subfolders).
 *
 * The full cinematic 3D journey is reachable as the "ribbon" of cards in
 * the Solutions + Growth-System overview; each card links to a subpage
 * that contains the corresponding scene + the verbatim Source A copy.
 */
export default function Home() {
  return (
    <>
      <IgnitionLoader />

      {/* ============================================================ */}
      {/* Scene 0 — Hero                                                */}
      {/* ============================================================ */}
      <Hero />

      {/* ============================================================ */}
      {/* Scene 1 — Problem (condensed)                                 */}
      {/* ============================================================ */}
      <ProblemTeaser />

      {/* ============================================================ */}
      {/* Interactive Digital Growth Simulator (Mobbin/Refero pattern) */}
      {/* ============================================================ */}
      <section className="relative stage-ink py-12 px-4 sm:px-6 lg:px-8">
        <InteractiveGrowthCalculator />
      </section>

      {/* ============================================================ */}
      {/* Scene 3 — Growth System (the 7 stages)                       */}
      {/* ============================================================ */}
      <GrowthSystemOverview />

      {/* ============================================================ */}
      {/* Scene 13 — Growth Loop (signature ∞ finale)                  */}
      {/* ============================================================ */}
      <GrowthLoopFinale />

      {/* ============================================================ */}
      {/* Solutions overview — 7 cards linking to subpages              */}
      {/* ============================================================ */}
      <SolutionsOverview />

      {/* ============================================================ */}
      {/* Scene 18 — Final CTA                                          */}
      {/* ============================================================ */}
      <FinalCta />

      {/* Mobile Floating Action Pill (Mobbin / Refero pattern) */}
      <MobileActionBar />
    </>
  )
}

/* ====================================================================== */

function Hero() {
  const reduced = useReducedMotion()
  return (
    <section id="hero" className="relative flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden stage-ink px-4 text-center">
      {/* Awwwards 3D WebGL Infinity Ribbon & Particle Visual */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-65">
        <ThreeInfinityVisual className="h-full w-full" intensity={1.1} interactive={true} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 mesh-grid opacity-25" aria-hidden="true" />

      <motion.p
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan"
      >
        <Sparkle size={12} />
        Your business is online. But is it digitally discoverable?
      </motion.p>

      <motion.h1
        initial={reduced ? undefined : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] text-mist sm:text-6xl lg:text-7xl"
      >
        Turn Digital Into <span className="text-ribbon text-glow-ribbon">Measurable Growth.</span>
      </motion.h1>

      <motion.p
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 mt-6 max-w-2xl text-base leading-relaxed text-mist/70 sm:text-lg"
      >
        Digi∞Artha connects performance marketing, search, creative, conversion, data and
        automation into one continuous growth system—helping businesses become more visible,
        acquire the right customers and grow with measurable outcomes.
      </motion.p>

      <motion.p
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative z-10 mt-4 text-xs font-medium uppercase tracking-[0.22em] text-mist/50"
      >
        Strategy. Execution. Measurement. Optimisation.
      </motion.p>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 mt-8 flex flex-col items-center gap-3 sm:flex-row"
      >
        <ShimmerButton href="/growth-score" className="px-7 py-3.5 text-sm sm:text-base">
          Get Your Digital Growth Score
        </ShimmerButton>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-mist backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/35 active:scale-[0.98]"
        >
          Talk to a Growth Strategist
          <CtaArrow />
        </Link>
      </motion.div>

      {/* Stage strip: Discover → Attract → Engage → Convert → Measure → Nurture → Grow → ∞ */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist/55 sm:text-xs"
      >
        {['Discover', 'Attract', 'Engage', 'Convert', 'Measure', 'Nurture', 'Grow'].map((s, i) => (
          <React.Fragment key={s}>
            <span className="transition hover:text-mist">{s}</span>
            {i < 6 && <span className="text-royal">→</span>}
          </React.Fragment>
        ))}
        <span className="text-ribbon text-base">∞</span>
      </motion.div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.3em] text-mist/40"
      >
        Scroll to explore
      </motion.div>
    </section>
  )
}

/* ====================================================================== */

function ProblemTeaser() {
  const reduced = useReducedMotion()
  return (
    <section id="problem" className="relative overflow-hidden stage-ink py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-balance text-3xl font-extrabold leading-tight text-mist sm:text-4xl lg:text-5xl"
        >
          Being online isn&rsquo;t enough.
        </motion.h2>
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-mist/70 sm:text-lg"
        >
          Customers search. They compare. They watch. They ask AI. They read reviews. They visit
          websites. They message brands. They make decisions across multiple digital touchpoints.
          When SEO, ads, content, website, CRM and analytics operate separately, growth becomes
          harder to understand and harder to scale.
        </motion.p>
        <motion.p
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 text-2xl font-bold text-ribbon-diag sm:text-3xl"
        >
          &ldquo;Digi∞Artha connects the system.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}

/* ====================================================================== */

const STAGES = [
  { i: '01', name: 'Discover', msg: 'Understand demand and become discoverable.', caps: 'Market intelligence · SEO · AI Search · Local · Content', color: '#02A3FE' },
  { i: '02', name: 'Attract', msg: 'Reach the audiences that matter.', caps: 'Google · Meta · YouTube · LinkedIn · Social · Creators', color: '#2E4BFE' },
  { i: '03', name: 'Engage', msg: 'Earn attention and trust.', caps: 'Creative · Content · Video · Social · Reputation', color: '#7B3FFE' },
  { i: '04', name: 'Convert', msg: 'Turn attention into action.', caps: 'Web · Landing pages · CRO · Funnels · Lead systems', color: '#E93BF2' },
  { i: '05', name: 'Measure', msg: 'Know what actually drives value.', caps: 'Analytics · Attribution · CRM · Revenue', color: '#FF544D' },
  { i: '06', name: 'Nurture', msg: 'Turn leads into customers and relationships.', caps: 'Email · WhatsApp · CRM · Automation', color: '#FF8E2D' },
  { i: '07', name: 'Grow', msg: 'Optimise and scale what works.', caps: 'AI · Automation · Experimentation · Expansion', color: '#FFB020' },
] as const

function GrowthSystemOverview() {
  const reduced = useReducedMotion()
  return (
    <section id="growth-system" className="relative overflow-hidden stage-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            <Sparkle size={12} /> The Growth System
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight text-mist sm:text-4xl lg:text-5xl">
            One connected system. Every critical growth touchpoint.
          </h2>
          <p className="mt-4 text-mist/70">
            Seven stages, one continuous loop. Tap any stage to explore the depth on its own page.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, idx) => (
            <motion.div
              key={s.i}
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="glass-dark relative flex flex-col gap-3 rounded-2xl p-5"
              style={{ boxShadow: `0 0 0 1px ${s.color}22, 0 12px 40px -16px ${s.color}55` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tabular" style={{ color: s.color }}>{s.i}</span>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
              </div>
              <h3 className="text-lg font-bold text-mist">{s.name}</h3>
              <p className="text-sm text-mist/75">{s.msg}</p>
              <p className="mt-auto text-[11px] font-medium uppercase tracking-wider text-mist/45">{s.caps}</p>
            </motion.div>
          ))}

          {/* 8th card = the loop / Growth OS link */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay: 7 * 0.08, ease: 'easeOut' }}
          >
            <Link
              href="/growth-os"
              className="glass-dark flex h-full flex-col gap-3 rounded-2xl p-5 transition hover:scale-[1.01]"
              style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.10), 0 12px 40px -16px rgba(233,59,242,0.45)` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tabular text-mist/60">∞</span>
                <InfinityLogo className="block" strokeWidth={14} withSparkle={false} withArrowhead={false} />
              </div>
              <h3 className="text-lg font-bold text-mist">The Growth Loop</h3>
              <p className="text-sm text-mist/75">Discover → Attract → Convert → Measure → Optimise → Grow → ∞</p>
              <p className="mt-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-magenta">
                Explore the Operating System <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/pillars" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm text-mist/80 hover:bg-white/5">
            See the 13 pillars behind the system <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/engagement-models" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm text-mist/80 hover:bg-white/5">
            Engagement models <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/how-we-work" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm text-mist/80 hover:bg-white/5">
            How we work <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ====================================================================== */

function GrowthLoopFinale() {
  const reduced = useReducedMotion()
  const [active, setActive] = React.useState(0)
  const loopStages = STAGES.slice(0, 7)
  return (
    <section id="growth-loop" className="relative overflow-hidden stage-ink py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="[filter:drop-shadow(0_0_60px_rgba(123,63,254,0.4))]"
        >
          <InfinityLogo className="block" strokeWidth={28} glow withSparkle withArrowhead />
        </motion.div>
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
          <Sparkle size={12} /> The Growth Loop
        </p>
        <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight text-mist sm:text-4xl lg:text-5xl">
          Discover → Attract → Convert → Measure → Optimise → Grow → <span className="text-ribbon">∞</span>
        </h2>
        <p className="mt-4 text-mist/70">
          The loop never truly ends. Hover any stage to see its key capabilities.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {loopStages.map((s, i) => (
            <button
              key={s.i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
              style={{
                borderColor: active === i ? s.color : 'rgba(255,255,255,0.15)',
                background: active === i ? `${s.color}22` : 'transparent',
                color: active === i ? s.color : 'rgba(255,255,255,0.7)',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
        <motion.div
          key={active}
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <p className="text-sm text-mist/80" style={{ color: loopStages[active].color }}>
            {loopStages[active].msg}
          </p>
          <p className="mt-2 text-xs text-mist/55">{loopStages[active].caps}</p>
        </motion.div>
      </div>
    </section>
  )
}

/* ====================================================================== */

function SolutionsOverview() {
  return (
    <section id="solutions" className="relative stage-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            <Sparkle size={12} /> Solutions
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Everything your growth engine needs.
          </h2>
          <p className="mt-4 text-ink/70">One growth system. Multiple capabilities. Open any pillar for the full page.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_CARDS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="block h-full">
              <SpotlightCard
                accentColor={s.accent}
                spotlightColor={`${s.accent}22`}
                className="h-full flex flex-col gap-3.5 border-ink/10 bg-white p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tabular" style={{ color: s.accent }}>{s.index}</span>
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: s.accent, boxShadow: `0 0 12px ${s.accent}` }} />
                </div>
                <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{s.oneLiner}</p>
                <p className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: s.accent }}>
                  View solution <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </p>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ====================================================================== */

function FinalCta() {
  return (
    <section id="final-cta" className="relative overflow-hidden stage-ink py-24 text-center sm:py-32">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-25" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" aria-hidden="true">
        <InfinityLogo className="block" strokeWidth={36} glow withSparkle withArrowhead />
      </div>
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink-deep/90 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(123,63,254,0.4)]">
          <BorderBeam size={360} duration={14} colorFrom="#02A3FE" colorTo="#FF8E2D" />
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-mist sm:text-4xl lg:text-5xl">
            Your next stage of growth starts with clarity.
          </h2>
          <p className="mt-4 text-mist/75 max-w-xl mx-auto text-base sm:text-lg">
            Understand where you&rsquo;re strong. Find what&rsquo;s holding you back. Build the system.
            Measure the outcome. Scale what works.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ShimmerButton href="/growth-score" className="px-8 py-3.5 text-base">
              Get Your Digital Growth Score
            </ShimmerButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-mist hover:bg-white/10 transition-all active:scale-[0.98]"
            >
              Talk to Digi∞Artha <CtaArrow />
            </Link>
          </div>
          <p className="mt-6 text-xs text-mist/40">
            Illustrative <Illustrative /> — every number we report connects to a real business outcome.
          </p>
        </div>
      </div>
    </section>
  )
}
