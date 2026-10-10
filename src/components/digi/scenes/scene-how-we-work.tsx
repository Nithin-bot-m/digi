'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'
import {
  InteractiveWorkflowVisualizer,
  WORKFLOW_STAGES,
} from '@/components/digi/interactive-workflow-visualizer'
import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'

/**
 * Scene 17 — How We Work
 * H2: "How we work" (Source A §7 Section 10)
 *
 * 6-step path — VERBATIM from Source A §7 Section 10:
 *   01 Diagnose — Understand the business, audience, market and current digital footprint.
 *   02 Strategise — Identify the highest-value opportunities and define the roadmap.
 *   03 Build — Create the campaigns, content, digital experiences and measurement system.
 *   04 Activate — Launch the growth channels and customer journeys.
 *   05 Optimise — Test, measure, learn and improve.
 *   06 Scale — Automate what works and expand intelligently.
 *
 * Left side: Sticky interactive animation engine & telemetry cockpit that actively
 * reacts to the right side's active/hovered/scrolled stage.
 * Right side: Interactive process roadmap cards connected by a luminous vertical pipeline.
 */

export function SceneHowWeWork() {
  const reduced = useReducedMotion()
  const [activeStageIndex, setActiveStageIndex] = React.useState<number>(0)
  const cardRefs = React.useRef<(HTMLLIElement | null)[]>([])

  // Scroll spy via IntersectionObserver to sync the active stage as user scrolls
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((el, index) => {
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStageIndex(index)
            }
          })
        },
        {
          root: null,
          rootMargin: '-20% 0px -30% 0px',
          threshold: 0.15,
        },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const handleSelectStage = (index: number) => {
    setActiveStageIndex(index)
    const targetEl = cardRefs.current[index]
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Section id="scene-17-how-we-work" scene="17" tone="dark" full className="py-20 sm:py-24 lg:py-28">
      <SectionHeading
        eyebrow="SCENE 17 · HOW WE WORK"
        h2={
          <>
            How we <span className="text-ribbon">work</span>
          </>
        }
        lead="A six-step path that connects diagnosis to scale — strategy before execution, measurement connected to outcomes, automation that compounds what already works."
      />

      {/* Main Interactive Split Screen: Visualizer on Left + Connected Steps on Right */}
      <div className="relative mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-12 xl:gap-16">
        {/* LEFT COLUMN: Sticky Interactive Animation & Telemetry Engine (remains still throughout all 6 stages) */}
        <div className="w-full lg:col-span-5">
          <div className="lg:sticky lg:top-20 xl:top-24">
            <InteractiveWorkflowVisualizer
              activeStageIndex={activeStageIndex}
              onSelectStage={handleSelectStage}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: The 6 Interactive Process Steps with Connected Timeline */}
        <div className="relative w-full lg:col-span-7 pb-24 sm:pb-32 lg:pb-[48vh]">
          {/* Continuous Luminous Vertical Pipeline Ribbon */}
          <div
            className="absolute left-4 top-5 bottom-8 w-1 rounded-full sm:left-6"
            style={{
              background: 'linear-gradient(to bottom, #02A3FE 0%, #2E4BFE 20%, #7B3FFE 40%, #E93BF2 60%, #FF544D 80%, #FF8E2D 100%)',
              boxShadow: '0 0 20px rgba(123,63,254,0.45)',
            }}
            aria-hidden="true"
          />

          <ol className="relative space-y-6 sm:space-y-8">
            {WORKFLOW_STAGES.map((s, index) => {
              const isActive = index === activeStageIndex

              return (
                <li
                  key={s.index}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="relative pl-12 sm:pl-16"
                  onMouseEnter={() => setActiveStageIndex(index)}
                  onClick={() => setActiveStageIndex(index)}
                >
                  {/* Timeline Stage Node Indicator */}
                  <span
                    className={cn(
                      'absolute left-4 top-8 -translate-x-1/2 rounded-full transition-all duration-300 sm:left-6',
                      isActive ? 'h-5 w-5 bg-white' : 'h-3.5 w-3.5 bg-slate-400/80',
                    )}
                    style={{
                      boxShadow: isActive
                        ? `0 0 24px 3px ${s.accent}, 0 0 0 4px ${s.accent}`
                        : `0 0 8px ${s.accent}`,
                      background: isActive ? '#FFFFFF' : s.accent,
                    }}
                    aria-hidden="true"
                  />

                  {/* Interactive Card */}
                  <motion.div
                    initial={reduced ? undefined : { opacity: 0, y: 20 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ y: -3 }}
                    className={cn(
                      'group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 p-6 sm:p-7',
                      isActive
                        ? 'border-white/20 bg-slate-900/95 shadow-2xl'
                        : 'border-white/10 bg-slate-950/60 hover:border-white/20 hover:bg-slate-900/80',
                    )}
                    style={{
                      boxShadow: isActive
                        ? `0 0 0 1px ${s.accent}88, 0 20px 50px -15px ${s.accent}33`
                        : undefined,
                    }}
                  >
                    {/* Active Accent Top Edge Glow */}
                    {isActive && (
                      <div
                        className="pointer-events-none absolute left-0 top-0 h-1 w-full"
                        style={{
                          background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                          boxShadow: `0 0 12px ${s.accent}`,
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Card Header: Stage Number, Title & Active Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold"
                          style={{
                            background: `${s.accent}22`,
                            color: s.accent,
                            border: `1px solid ${s.accent}55`,
                          }}
                        >
                          {s.index}
                        </span>
                        <h3 className="text-xl font-bold text-mist sm:text-2xl tracking-tight">
                          {s.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-white"
                            style={{ background: s.accent, boxShadow: `0 0 12px ${s.accent}66` }}
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>ACTIVE STAGE</span>
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] uppercase tracking-wider text-mist/40 group-hover:text-mist/70">
                            {`STAGE ${s.index}`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Verbatim Copy */}
                    <p className="mt-3 text-sm leading-relaxed text-mist/85 sm:text-base">
                      {s.copy}
                    </p>

                    {/* Focus Deliverables Tags */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {s.focusTags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className={cn(
                            'rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors duration-200',
                            isActive
                              ? 'bg-white/10 text-mist'
                              : 'bg-white/5 text-mist/60 group-hover:bg-white/10 group-hover:text-mist/80',
                          )}
                          style={{
                            borderLeft: isActive ? `2px solid ${s.accent}` : undefined,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Click prompt indicator */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                      <span className="font-mono text-[10px] text-mist/40 group-hover:text-mist/60">
                        {s.hudStatus}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: s.accent }}
                      >
                        <span>Inspect in Cockpit</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                </li>
              )
            })}
          </ol>

          {/* Post-Stage 06 Compounding Growth Flywheel Banner */}
          <div className="relative mt-8 ml-12 sm:ml-16 overflow-hidden rounded-2xl border border-amber/30 bg-gradient-to-r from-amber/10 via-purple-500/10 to-transparent p-5 sm:p-6 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_8px_#FFB020]" />
              </span>
              <span>All 6 Stages Integrated · Compounding Loop Active</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-mist/85 sm:text-base">
              Once Scale is deployed, every cycle feeds intelligence directly back into Diagnose — building an automated, self-reinforcing digital growth flywheel.
            </p>
          </div>
        </div>
      </div>

      {/* Closing beat — automation + expansion arrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.55 }}
        className="mt-16 text-center font-mono text-xs uppercase tracking-[0.28em] text-amber"
      >
        Diagnose → Strategise → Build → Activate → Optimise → Scale → ∞
      </motion.p>
    </Section>
  )
}
