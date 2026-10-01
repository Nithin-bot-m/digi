import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

export const dynamic = 'force-static'

/**
 * Digi∞Artha — Contact endpoint
 * Source A §21 form fields, "Need help with?" 12 options.
 * Validates, persists to Lead table (CRM webhook stub), returns success.
 *
 * Anti-spam (Master Prompt §25):
 *  - Honeypot field `company_website` (catches dumb bots)
 *  - Cloudflare Turnstile verification (when TURNSTILE_SECRET_KEY is set;
 *    skipped in dev so the form works locally without keys)
 *  - Rate limited: 5 submissions per IP per 60s
 */

const TOPICS = [
  'Performance Marketing',
  'SEO',
  'AI Search',
  'Creative & Content',
  'Website',
  'CRO',
  'Lead Generation',
  'Analytics',
  'CRM',
  'Automation',
  'AI Solutions',
  'Complete Growth Strategy',
] as const

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  // Rate limit: 5 submissions per IP per 60s
  const rl = rateLimit(`contact:${ip}`, { max: 5, windowMs: 60_000 })
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many submissions. Please try again in ${rl.retryAfter} seconds.` },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
    )
  }

  let body: Record<string, string> = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Turnstile verification (no-op in dev when TURNSTILE_SECRET_KEY is unset)
  const turnstileToken = body.turnstile_token || null
  const verified = await verifyTurnstile(turnstileToken, ip)
  if (!verified) {
    return NextResponse.json({ error: 'Anti-spam verification failed. Please try again.' }, { status: 403 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const phone = (body.phone || '').trim()
  const company = (body.company || '').trim()
  const website = (body.website || '').trim()
  const industry = (body.industry || '').trim()
  const topic = (body.topic || '').trim()
  const message = (body.message || '').trim()
  const utm = body.utm || ''

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  if (!email || !isEmail(email))
    return NextResponse.json({ error: 'A valid work email is required' }, { status: 400 })
  if (topic && !TOPICS.includes(topic as (typeof TOPICS)[number]))
    return NextResponse.json({ error: 'Unknown topic' }, { status: 400 })

  // Simple spam honeypot
  if (body.company_website) {
    return NextResponse.json({ ok: true }) // silently succeed for bots
  }

  try {
    await db.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        website: website || null,
        industry: industry || null,
        topic: topic || null,
        message: message || null,
        source: 'website-contact',
        utm: utm || null,
        status: 'new',
      },
    })
  } catch {
    // DB write failed; surface generic error to client
    return NextResponse.json(
      { error: 'Could not submit right now. Please email hello@digiartha.com.' },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    message: `Thanks ${name.split(' ')[0]}. A growth strategist will reply within one business day.`,
  })
}

export async function GET() {
  return NextResponse.json({
    name: 'Digi∞Artha Contact',
    topics: TOPICS,
  })
}
