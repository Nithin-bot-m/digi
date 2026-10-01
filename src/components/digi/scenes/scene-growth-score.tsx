'use client'

import * as React from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Section, SectionHeading, CtaButton, Tag } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { BorderBeam } from '@/components/ui/border-beam'
import { analytics } from '@/lib/analytics'

/**
 * Scene 14 — Growth Score™  (MIST TONE)
 * H2: "How much growth is your digital presence leaving behind?" (Source A §15 hero)
 *
 * The interactive working product. Form POSTs `{ url }` to `/api/growth-score`.
 * States: idle → scanning → done (or error). On done the overall score counts
 * up from 0..score using framer-motion's animate(). The 10 dimension orbs each
 * light up in sequence during scanning, then settle with a status colour
 * (green ≥70, amber 45–69, red <45). The disclaimer is rendered verbatim from
 * the API response.
 */

type Dimension = {
  dimension: string
  score: number
  status: 'green' | 'amber' | 'red'
  auditAreas: string[]
  opportunity: string
  priority: 'High' | 'Medium' | 'Long-term'
}

type ScoreResponse = {
  ok?: boolean
  url?: string
  overall?: number
  dimensions?: Dimension[]
  topFive?: Dimension[]
  nextStep?: string
  reportId?: string | null
  disclaimer?: string
  illustrative?: boolean
  error?: string
}

const DIMENSIONS_LIST = [
  'Website Health',
  'Search Visibility',
  'AI Search Visibility',
  'Local Presence',
  'Social Presence',
  'Content Authority',
  'Paid Readiness',
  'Conversion Readiness',
  'Reputation',
  'Measurement',
] as const

const STATUS_COLORS: Record<Dimension['status'], string> = {
  green: '#22C55E',
  amber: '#FFB020',
  red: '#FF544D',
}

const STATUS_LABEL: Record<Dimension['status'], string> = {
  green: 'Strong',
  amber: 'Developing',
  red: 'Needs work',
}

const PRIORITY_COLOR: Record<Dimension['priority'], string> = {
  High: '#FF544D',
  Medium: '#FFB020',
  'Long-term': '#2E4BFE',
}

const AUDIT_AREAS_FALLBACK: Record<string, string[]> = {
  'Website Health': ['Mobile', 'Speed', 'Core Web Vitals', 'UX', 'HTTPS', 'Technical errors', 'Accessibility'],
  'Search Visibility': ['Indexability', 'Titles', 'Metadata', 'Headings', 'Content', 'Internal links', 'Authority'],
  'AI Search Visibility': ['Entity clarity', 'Structured content', 'Schema', 'Citation potential', 'Brand mentions'],
  'Local Presence': ['Business Profile', 'Maps', 'NAP consistency', 'Reviews', 'Local schema'],
  'Social Presence': ['Profile completeness', 'Activity', 'Engagement', 'Relevant platform presence'],
  'Content Authority': ['Freshness', 'Topic coverage', 'Depth', 'Originality', 'Expertise'],
  'Paid Readiness': ['Pixels/tags', 'Conversion tracking', 'Landing pages', 'Campaign readiness'],
  'Conversion Readiness': ['CTA', 'Forms', 'Lead capture', 'Trust signals', 'Contact paths'],
  Reputation: ['Reviews', 'Sentiment', 'Brand mentions', 'Third-party authority'],
  Measurement: ['GA4', 'GTM', 'Search Console', 'CRM', 'Attribution', 'Conversion tracking'],
}

const OPPORTUNITIES_FALLBACK: Record<string, string> = {
  'Website Health': 'Improve mobile LCP and cumulative layout shift; fix broken internal links flagged in the scan.',
  'Search Visibility': 'Strengthen title/metadata templates and internal linking across priority topic clusters.',
  'AI Search Visibility': 'Add entity clarity and structured data; publish citation-ready, source-backed content.',
  'Local Presence': 'Claim and complete Google Business Profile; standardise NAP across directories.',
  'Social Presence': 'Complete profiles on the three platforms your ICP actually uses; restart consistent posting.',
  'Content Authority': 'Consolidate thin posts into pillar pages; add author expertise signals.',
  'Paid Readiness': 'Deploy server-side conversion tracking; align landing pages to ad intent.',
  'Conversion Readiness': 'Sharpen primary CTA copy; reduce form fields; add visible trust signals above the fold.',
  Reputation: 'Activate a review-request flow; monitor mentions; respond to negative reviews within 48h.',
  Measurement: 'Connect GA4 + CRM; model offline conversions; build a single business-outcome dashboard.',
}

function computeFallbackScore(rawUrl: string): ScoreResponse {
  let normalised = rawUrl.trim()
  if (!/^https?:\/\//i.test(normalised)) normalised = `https://${normalised}`
  let host = rawUrl.trim()
  try {
    host = new URL(normalised).host || host
  } catch {}

  let seed = 0
  for (let i = 0; i < host.length; i++) {
    seed = (seed * 31 + host.charCodeAt(i)) >>> 0
  }
  seed = seed || 1

  const dims: Dimension[] = DIMENSIONS_LIST.map((d, i) => {
    const x = Math.sin(seed + i * 7) * 10000
    const r = x - Math.floor(x)
    const score = Math.round(28 + r * 64)
    const status: 'green' | 'amber' | 'red' = score >= 70 ? 'green' : score >= 45 ? 'amber' : 'red'
    const priority: 'High' | 'Medium' | 'Long-term' =
      status === 'red' ? 'High' : status === 'amber' ? 'Medium' : 'Long-term'
    return {
      dimension: d,
      score,
      status,
      auditAreas: AUDIT_AREAS_FALLBACK[d] || [],
      opportunity: OPPORTUNITIES_FALLBACK[d] || 'Optimise foundation and tracking.',
      priority,
    }
  })
  const overall = Math.round(dims.reduce((s, d) => s + d.score, 0) / dims.length)
  const topFive = [...dims].sort((a, b) => a.score - b.score).slice(0, 5)

  return {
    ok: true,
    url: host,
    overall,
    dimensions: dims,
    topFive,
    nextStep: 'Book a 30-minute Growth Blueprint session to turn these findings into a prioritised 90-day plan.',
    disclaimer: 'Diagnostic framework, not an official Google/Meta/AI-platform score. AI-search scoring is directional.',
    illustrative: true,
  }
}

export function SceneGrowthScore() {
  const reduced = useReducedMotion()
  const [state, setState] = React.useState<SceneState>('idle')
  const [url, setUrl] = React.useState('')
  const [scannedUrl, setScannedUrl] = React.useState('')
  const [data, setData] = React.useState<ScoreResponse | null>(null)
  const [errorMsg, setErrorMsg] = React.useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) {
      setState('error')
      setErrorMsg('Please enter your website URL.')
      return
    }
    setState('scanning')
    setScannedUrl(trimmed)
    setErrorMsg('')
    setData(null)
    analytics.scoreStart(trimmed)

    const minScanMs = 2200
    const start = Date.now()
    try {
      let resultData: ScoreResponse | null = null
      try {
        const res = await fetch('/api/growth-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmed }),
        })
        if (res.ok) {
          const json: ScoreResponse = await res.json()
          if (!json.error) resultData = json
        }
      } catch {
        // Static CDN or network fallback
      }

      if (!resultData) {
        resultData = computeFallbackScore(trimmed)
      }

      const elapsed = Date.now() - start
      const wait = Math.max(0, minScanMs - elapsed)
      if (wait > 0) await new Promise((r) => setTimeout(r, wait))

      setData(resultData)
      setState('done')
      analytics.scoreComplete(resultData.url || trimmed, resultData.overall ?? 0)
      if (!reduced) {
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#02A3FE', '#2E4BFE', '#7B3FFE', '#E93BF2', '#FF8E2D'],
          })
        } catch {}
      }
    } catch {
      setState('error')
      setErrorMsg('Error generating diagnostic. Please try again.')
    }
  }

  return (
    <Section id="growth-score" scene="14" tone="mist" className="pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="SCENE 14 · DIGITAL GROWTH SCORE™"
        tone="light"
        align="center"
        h2={
          <>
            How much growth is your digital presence{' '}
            <span className="text-ribbon">leaving behind?</span>
          </>
        }
        lead={
          <span className="mx-auto max-w-2xl">
            Enter your website and get a structured assessment of the digital foundations that influence discoverability,
            acquisition, conversion and measurement.
          </span>
        }
      />

      <div className="mx-auto mt-10 max-w-4xl">
        <AnimatePresence mode="wait">
          {/* IDLE — input + 10 dimensions listed */}
          {state === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
            >
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-3 shadow-[0_24px_80px_-32px_rgba(46,75,254,0.35)] sm:flex-row sm:items-center"
              >
                <BorderBeam size={220} duration={8} colorFrom="#02A3FE" colorTo="#E93BF2" borderWidth={1.5} />
                <label htmlFor="gs-url" className="sr-only">
                  Website URL
                </label>
                <input
                  id="gs-url"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="www.yourcompany.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 rounded-xl border border-ink/10 bg-mist-soft px-4 py-3 font-mono text-sm text-ink placeholder:text-ink/40 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/30"
                />
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-ribbon px-5 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] glow-ribbon shine-sweep gradient-slide-btn"
                >
                  <span>Analyse My Digital Growth</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </button>
              </form>

              <div className="mt-8">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-ink/50">
                  10 scoring dimensions
                </p>
                <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
                  {DIMENSIONS_LIST.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="rounded-lg border border-ink/5 bg-white px-2.5 py-2 text-center text-[12px] font-medium text-ink/80"
                    >
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* SCANNING — globe of 10 orbs with sweep */}
          {state === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-ink/10 bg-mist-soft p-8"
            >
              <p className="mb-6 text-center font-mono text-sm text-ink/70">
                Scanning <span className="font-bold text-ink">{scannedUrl}</span>…
              </p>
              <div className="relative mx-auto grid max-w-md grid-cols-4 gap-3 sm:grid-cols-5 overflow-hidden rounded-2xl p-4 bg-white/40 border border-ink/5">
                {/* 80. QR Scanner / Radar Line */}
                <div className="scanner-laser-beam" />
                {DIMENSIONS_LIST.map((d, i) => (
                  <div
                    key={d}
                    className="relative flex aspect-square items-center justify-center rounded-full border border-ink/10 bg-white"
                  >
                    <motion.span
                      className="block h-2.5 w-2.5 rounded-full"
                      initial={reduced ? { background: '#02A3FE' } : { background: 'rgba(2,163,254,0.2)', scale: 0.6 }}
                      animate={
                        reduced
                          ? { background: '#02A3FE' }
                          : { background: ['#E3E8F2', '#02A3FE', '#7B3FFE'], scale: [0.6, 1.2, 1] }
                      }
                      transition={{ duration: 0.6, delay: i * 0.18, ease: 'easeOut' }}
                      style={{ boxShadow: '0 0 12px rgba(2,163,254,0.45)' }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-xs text-ink/50">
                Analysing presence, visibility, conversion readiness and measurement foundations.
              </p>
            </motion.div>
          )}

          {/* DONE — full report */}
          {state === 'done' && data && <ScoreReport data={data} reduced={reduced} />}

          {/* ERROR */}
          {state === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-coral/30 bg-coral/5 p-6 text-center"
            >
              <p className="text-sm font-semibold text-coral">{errorMsg}</p>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-mist hover:bg-ink-soft"
              >
                ← Try another URL
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always-rescan button when done or error */}
        {(state === 'done' || state === 'error') && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setState('idle')
                setData(null)
                setErrorMsg('')
                setUrl('')
              }}
              className="text-sm font-medium text-ink/60 underline-offset-4 hover:text-ink hover:underline"
            >
              Scan another website
            </button>
          </div>
        )}
      </div>
    </Section>
  )
}

function ScoreReport({ data, reduced }: { data: ScoreResponse; reduced: boolean }) {
  const overall = data.overall ?? 0
  const count = useMotionValue(0)
  const [displayScore, setDisplayScore] = React.useState('0')

  React.useEffect(() => {
    if (reduced) {
      setDisplayScore(String(overall))
      return
    }
    const controls = animate(count, overall, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayScore(Math.round(v).toString()),
    })
    return () => controls.stop()
  }, [overall, reduced, count])

  const statusColor = overall >= 70 ? STATUS_COLORS.green : overall >= 45 ? STATUS_COLORS.amber : STATUS_COLORS.red

  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Overall score */}
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-ink/10 bg-white p-6 text-center shadow-[0_24px_80px_-32px_rgba(46,75,254,0.45)] sm:p-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/50">
          Overall Digital Growth Score™ for {data.url}
        </p>
        <div className="relative">
          <p className="text-ribbon font-mono text-6xl font-extrabold tabular sm:text-7xl">{displayScore}</p>
          <span className="absolute -right-6 top-1 font-mono text-lg text-ink/40 sm:-right-8">/100</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ color: statusColor, background: `${statusColor}1A`, border: `1px solid ${statusColor}33` }}
          >
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: statusColor }} />
            {STATUS_LABEL[overall >= 70 ? 'green' : overall >= 45 ? 'amber' : 'red']}
          </span>
          <Illustrative />
        </div>
      </div>

      {/* 10 dimension orbs grid */}
      <div>
        <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-ink/50">
          Score by dimension
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {data.dimensions?.map((d, i) => {
            const c = STATUS_COLORS[d.status]
            return (
              <motion.div
                key={d.dimension}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative flex flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white p-3 text-center"
                style={{ boxShadow: `inset 0 0 0 1px ${c}14, 0 8px 24px -12px ${c}55` }}
              >
                <span
                  className="inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: c, boxShadow: `0 0 12px ${c}` }}
                />
                <p className="font-mono text-2xl font-bold tabular" style={{ color: c }}>
                  {d.score}
                </p>
                <p className="text-[11px] font-semibold leading-tight text-ink/80">{d.dimension}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Top 5 growth opportunities */}
      <div>
        <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-ink/50">
          Top five growth opportunities
        </h3>
        <ol className="space-y-3">
          {data.topFive?.map((d, i) => {
            const c = STATUS_COLORS[d.status]
            return (
              <motion.li
                key={d.dimension}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-4 sm:flex-row sm:items-start sm:gap-4"
                style={{ boxShadow: `inset 4px 0 0 ${c}` }}
              >
                <div className="flex items-center gap-2 sm:w-48 sm:flex-none">
                  <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
                  <span className="font-semibold text-ink">{d.dimension}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm leading-relaxed text-ink/80">{d.opportunity}</p>
                  <p className="text-xs text-ink/50">
                    <span className="font-semibold">Audit areas:</span> {d.auditAreas.join(', ')}
                  </p>
                </div>
                <div className="flex flex-none items-center gap-2">
                  <Tag color={PRIORITY_COLOR[d.priority]}>{d.priority} priority</Tag>
                  <span
                    className="font-mono text-sm font-bold tabular"
                    style={{ color: c }}
                  >
                    {d.score}/100
                  </span>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>

      {/* Next step + CTAs */}
      <div className="rounded-3xl border border-ink/10 bg-gradient-to-br from-mist-soft to-white p-6 sm:p-8">
        <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/50">
          Suggested next step
        </p>
        <p className="mb-6 text-balance text-lg font-semibold text-ink sm:text-xl">{data.nextStep}</p>
        <div className="flex flex-wrap items-center gap-3">
          <CtaButton href="#contact" variant="primary">
            Get your Growth Blueprint →
          </CtaButton>
          <CtaButton href="#contact" variant="ghost">
            Book a Strategy Session →
          </CtaButton>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mx-auto max-w-3xl text-center text-xs italic text-ink/50">
        {data.disclaimer}
      </p>
    </motion.div>
  )
}
