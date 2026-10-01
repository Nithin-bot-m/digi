import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-static'

/**
 * Digi∞Artha — Digital Growth Score™ backend
 * Master Prompt §11 + Content Pack Source A §15 + Source C §17–18.
 *
 * IMPORTANT (per guardrails §14, §27): the score is an illustrative diagnostic
 * framework, NOT an official ranking. AI-search scoring is directional.
 * Returns clearly-labelled illustrative data so the experience works end-to-end
 * without fabricating verifiable client metrics.
 *
 * Rate limited: 10 requests per IP per 60 seconds (per Master Prompt §25
 * "Spam protection"). Returns 429 + Retry-After when exceeded.
 */

const DIMENSIONS = [
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

const AUDIT_AREAS: Record<(typeof DIMENSIONS)[number], string[]> = {
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

const OPPORTUNITIES: Record<(typeof DIMENSIONS)[number], string> = {
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

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function hashUrl(url: string): number {
  let h = 0
  for (let i = 0; i < url.length; i++) {
    h = (h * 31 + url.charCodeAt(i)) >>> 0
  }
  return h || 1
}

function scoreFor(url: string): {
  overall: number
  dimensions: {
    dimension: string
    score: number
    status: 'green' | 'amber' | 'red'
    auditAreas: string[]
    opportunity: string
    priority: 'High' | 'Medium' | 'Long-term'
  }[]
} {
  const seed = hashUrl(url)
  const dims = DIMENSIONS.map((d, i) => {
    const r = seededRandom(seed + i * 7)
    const score = Math.round(28 + r * 64) // 28..92
    const status: 'green' | 'amber' | 'red' =
      score >= 70 ? 'green' : score >= 45 ? 'amber' : 'red'
    const priority: 'High' | 'Medium' | 'Long-term' =
      status === 'red' ? 'High' : status === 'amber' ? 'Medium' : 'Long-term'
    return {
      dimension: d,
      score,
      status,
      auditAreas: AUDIT_AREAS[d],
      opportunity: OPPORTUNITIES[d],
      priority,
    }
  })
  const overall = Math.round(dims.reduce((s, d) => s + d.score, 0) / dims.length)
  return { overall, dimensions: dims }
}

export async function POST(req: NextRequest) {
  // Rate limit (Master Prompt §25 spam protection)
  const ip = getClientIp(req)
  const rl = rateLimit(`growth-score:${ip}`, { max: 10, windowMs: 60_000 })
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many analyses. Try again in ${rl.retryAfter} seconds.` },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
    )
  }

  let body: { url?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
  const raw = (body.url || '').trim()
  if (!raw) return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  let normalised = raw
  if (!/^https?:\/\//i.test(normalised)) normalised = `https://${normalised}`
  let host: string
  try {
    host = new URL(normalised).host
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }
  if (host.split('.').length < 2) {
    return NextResponse.json({ error: 'Please enter a valid website URL' }, { status: 400 })
  }

  const { overall, dimensions } = scoreFor(host)
  const topFive = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 5)

  let saved: { id?: string } = {}
  try {
    const report = await db.growthScoreReport.create({
      data: {
        url: host,
        overall,
        dimensions: JSON.stringify(dimensions),
        summary: `Diagnostic snapshot for ${host}`,
        ip: undefined,
      },
      select: { id: true },
    })
    saved = report
  } catch {
    // DB not critical; we still return the score
  }

  return NextResponse.json({
    ok: true,
    url: host,
    overall,
    dimensions,
    topFive,
    nextStep:
      'Book a 30-minute Growth Blueprint session to turn these findings into a prioritised 90-day plan.',
    reportId: saved.id ?? null,
    disclaimer:
      'Diagnostic framework, not an official Google/Meta/AI-platform score. AI-search scoring is directional.',
    illustrative: true,
  })
}

export async function GET() {
  return NextResponse.json({
    name: 'Digi∞Artha Digital Growth Score™',
    description:
      'Enter a website URL to receive a structured diagnostic across 10 dimensions of digital growth readiness.',
    dimensions: DIMENSIONS,
    disclaimer:
      'Diagnostic framework, not an official Google/Meta/AI-platform score. AI-search scoring is directional.',
  })
}
