'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {
  Section,
  SectionHeading,
  SidePanel,
} from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * SectionPillars — 13 Pillars of Digital Growth Engineering
 * Source C §15 final enterprise architecture (verbatim coined names +
 * the full Includes list per pillar).
 * Tone: dark. Accent: full brand gradient (cyan → orange across the 13).
 *
 * The 13 pillars sit underneath the 7 public solutions — they are the
 * depth, not the menu. Rendered as a 1/2/3-col grid of cards; clicking
 * opens a SidePanel with the full Includes list.
 */

type Pillar = {
  index: string
  name: string
  gloss: string
  accent: string
  sourceName?: string
  groups?: { label: string; items: string[] }[]
  items?: string[]
}

const PILLARS: Pillar[] = [
  {
    index: '01',
    name: 'Growth Intelligence™',
    gloss: 'Understand the market before spending money.',
    accent: '#02A3FE',
    sourceName: 'Growth Intelligence™',
    items: [
      'Market Analysis',
      'Competitor Intelligence',
      'Consumer Behaviour Analysis',
      'Search Demand Analysis',
      'Keyword Intelligence',
      'Audience Intelligence',
      'Social Listening',
      'Competitor Ad Intelligence',
      'Competitor SEO Analysis',
      'Competitor Content Analysis',
      'Market Opportunity Mapping',
      'Digital Share of Voice',
      'Brand Perception Analysis',
      'Trend Analysis',
      'Demand Forecasting',
    ],
  },
  {
    index: '02',
    name: 'Digital Presence Architecture™',
    gloss: 'Be discoverable everywhere customers look.',
    accent: '#1A93FE',
    sourceName: 'Digital Presence Architecture™',
    groups: [
      {
        label: 'Website',
        items: [
          'Corporate website',
          'Product website',
          'Service website',
          'Landing pages',
          'Microsites',
          'Campaign pages',
          'Conversion pages',
        ],
      },
      {
        label: 'Website architecture',
        items: [
          'UX/UI',
          'Mobile optimisation',
          'Website speed',
          'Technical health',
          'Accessibility',
          'Security',
          'Core Web Vitals',
          'Conversion architecture',
        ],
      },
      {
        label: 'Search presence',
        items: [
          'Google Search',
          'Google Maps',
          'Google Business Profile',
          'Bing',
          'Apple Maps',
          'YouTube',
          'Knowledge panels',
          'Industry directories',
          'Review platforms',
          'Local directories',
        ],
      },
      {
        label: 'Social presence',
        items: [
          'Instagram',
          'Facebook',
          'LinkedIn',
          'YouTube',
          'X',
          'Pinterest',
          'Threads',
          'Reddit',
          'WhatsApp',
          'Other relevant platforms',
        ],
      },
      {
        label: 'Business ecosystem',
        items: [
          'Google Business Profile',
          'Bing Places',
          'Apple Business Connect',
          'Industry portals',
          'Marketplace profiles',
          'Review profiles',
          'Directory profiles',
          'Partner profiles',
        ],
      },
    ],
  },
  {
    index: '03',
    name: 'Search & AI Visibility™',
    gloss: 'SEO + AI search visibility as one discovery system.',
    accent: '#2E4BFE',
    sourceName: 'Search & AI Visibility™',
    groups: [
      {
        label: 'SEO',
        items: [
          'Technical SEO',
          'On-page SEO',
          'Off-page SEO',
          'Local SEO',
          'Enterprise SEO',
          'E-commerce SEO',
          'Video SEO',
          'Image SEO',
          'News SEO',
          'International SEO',
          'Programmatic SEO',
        ],
      },
      {
        label: 'AI Search Visibility',
        items: [
          'AEO',
          'GEO',
          'LLMO',
          'Entity SEO',
          'Knowledge Graph optimisation',
          'Structured Data',
          'Schema',
          'AI crawler accessibility',
          'AI citation monitoring',
          'AI brand visibility',
          'AI recommendation monitoring',
        ],
      },
    ],
  },
  {
    index: '04',
    name: 'Paid Growth Engineering™',
    gloss: 'Google, Meta, YouTube, LinkedIn paid acquisition.',
    accent: '#5246FE',
    sourceName: 'Paid Growth Engineering™',
    groups: [
      {
        label: 'Google ecosystem',
        items: [
          'Google Search Ads',
          'Performance Max',
          'AI Max',
          'Display',
          'YouTube',
          'Demand Gen',
          'Shopping',
          'Maps',
          'Remarketing',
          'App campaigns',
        ],
      },
      {
        label: 'Meta ecosystem',
        items: [
          'Facebook Ads',
          'Instagram Ads',
          'Advantage+',
          'Lead campaigns',
          'Conversion campaigns',
          'Catalogue',
          'Retargeting',
          'Lookalikes',
          'Creative testing',
          'Dynamic creative',
          'WhatsApp acquisition',
        ],
      },
      {
        label: 'Other paid channels',
        items: [
          'LinkedIn Ads',
          'TikTok Ads',
          'X Ads',
          'Reddit Ads',
          'Programmatic',
          'Native advertising',
          'Marketplace advertising',
          'OTT/CTV',
          'Influencer amplification',
        ],
      },
    ],
  },
  {
    index: '05',
    name: 'Content Intelligence',
    gloss: 'Content strategy, pillars, clusters, thought leadership.',
    accent: '#7B3FFE',
    sourceName: 'Content Intelligence & Creation™',
    groups: [
      {
        label: 'Strategy',
        items: [
          'Content strategy',
          'Editorial calendar',
          'Content pillars',
          'Topic clusters',
          'Search-driven content',
          'Audience-driven content',
          'Funnel content',
          'Thought leadership',
        ],
      },
      {
        label: 'Written',
        items: [
          'Blogs',
          'Articles',
          'Whitepapers',
          'Case studies',
          'Reports',
          'E-books',
          'Landing page copy',
          'Website copy',
          'Product copy',
          'Email copy',
          'Ad copy',
          'Social copy',
        ],
      },
      {
        label: 'Visual',
        items: [
          'Static creatives',
          'Infographics',
          'Carousels',
          'Presentations',
          'Explainer graphics',
        ],
      },
      {
        label: 'Video',
        items: [
          'Reels',
          'Shorts',
          'YouTube',
          'Testimonials',
          'Product videos',
          'Corporate videos',
          'Explainers',
          'Interviews',
          'Podcasts',
        ],
      },
      {
        label: 'AI-ready content',
        items: [
          'Answer-ready content',
          'Citation-ready content',
          'Entity-focused content',
          'Structured content',
          'Knowledge assets',
        ],
      },
    ],
  },
  {
    index: '06',
    name: 'Social Growth',
    gloss: 'Platform-native social presence and engagement.',
    accent: '#9335FE',
    sourceName: 'Social Growth Engineering™',
    items: [
      'Social strategy',
      'Platform creation',
      'Profile optimisation',
      'Brand handles',
      'Bio optimisation',
      'Content strategy',
      'Community management',
      'Organic growth',
      'Engagement',
      'Creator collaborations',
      'Influencer marketing',
      'Employee advocacy',
      'Founder branding',
      'Executive branding',
      'LinkedIn thought leadership',
      'UGC',
      'Social listening',
      'Reputation management',
      'Social analytics',
    ],
  },
  {
    index: '07',
    name: 'Conversion Growth',
    gloss: 'CRO, funnels, landing pages, lead systems.',
    accent: '#B234F2',
    sourceName: 'Conversion Growth Engineering™',
    items: [
      'CRO',
      'Landing page optimisation',
      'UX optimisation',
      'CTA optimisation',
      'Form optimisation',
      'Lead optimisation',
      'Checkout optimisation',
      'Funnel optimisation',
      'A/B testing',
      'Multivariate testing',
      'Heatmaps',
      'Session recordings',
      'Behaviour analysis',
      'Personalisation',
      'Lead qualification',
      'Conversion tracking',
    ],
  },
  {
    index: '08',
    name: 'Revenue Intelligence',
    gloss: 'Attribution, dashboards, revenue measurement.',
    accent: '#D134EE',
    sourceName: 'Revenue Intelligence™',
    items: [
      'Google Analytics',
      'GA4',
      'Google Tag Manager',
      'Search Console',
      'Meta Pixel',
      'Conversions API',
      'Server-side tracking',
      'CRM integration',
      'Lead tracking',
      'Call tracking',
      'WhatsApp tracking',
      'UTM architecture',
      'Attribution',
      'Multi-touch attribution',
      'Marketing ROI',
      'ROAS',
      'CAC',
      'CPL',
      'CPA',
      'LTV',
      'Pipeline attribution',
      'Dashboarding',
      'Marketing forecasting',
    ],
  },
  {
    index: '09',
    name: 'Lifecycle Growth',
    gloss: 'Email, WhatsApp, SMS, retention, LTV.',
    accent: '#E93BF2',
    sourceName: 'Lifecycle Growth Engineering™',
    items: [
      'CRM',
      'Lead nurturing',
      'Email marketing',
      'WhatsApp marketing',
      'SMS',
      'Push notifications',
      'Marketing automation',
      'Lead scoring',
      'Segmentation',
      'Retargeting',
      'Re-engagement',
      'Customer onboarding',
      'Upselling',
      'Cross-selling',
      'Loyalty',
      'Referral programs',
      'Customer retention',
    ],
  },
  {
    index: '10',
    name: 'Reputation Engineering',
    gloss: 'Reviews, sentiment, brand mentions, third-party authority.',
    accent: '#F23455',
    sourceName: 'Digital Reputation Engineering™',
    items: [
      'Google Reviews',
      'Review generation',
      'Review response',
      'Reputation monitoring',
      'Brand sentiment',
      'Social listening',
      'PR amplification',
      'Third-party mentions',
      'Directory accuracy',
      'Review platforms',
      'Crisis monitoring',
      'Brand SERP management',
      'Knowledge panel management',
    ],
  },
  {
    index: '11',
    name: 'Digital Commerce',
    gloss: 'Shopping, Performance Max, catalogues, marketplaces.',
    accent: '#FF484D',
    sourceName: 'Digital Commerce Engineering™',
    items: [
      'E-commerce website',
      'Shopify/WooCommerce',
      'Product pages',
      'Product feeds',
      'Google Merchant Center',
      'Shopping Ads',
      'Marketplace presence',
      'Amazon',
      'Flipkart',
      'Myntra',
      'B2B portals',
      'Catalogue optimisation',
      'Product SEO',
      'Conversion optimisation',
      'Cart recovery',
      'Marketplace advertising',
    ],
  },
  {
    index: '12',
    name: 'Creator Growth',
    gloss: 'Creator partnerships, UGC, creator-led campaigns.',
    accent: '#FF6F3D',
    sourceName: 'Creator Growth Engineering™',
    items: [
      'Influencer identification',
      'Creator partnerships',
      'UGC',
      'Creator campaigns',
      'Affiliate creators',
      'Micro-influencers',
      'Employee creators',
      'Founder creators',
      'Performance influencer campaigns',
      'Creator content amplification',
      'Creator content for AEO/GEO',
    ],
  },
  {
    index: '13',
    name: 'AI Growth Automation',
    gloss: 'AI agents, workflows, automation, personalisation.',
    accent: '#FF8E2D',
    sourceName: 'AI Growth Automation™',
    items: [
      'AI content workflows',
      'Marketing automation',
      'AI chatbots',
      'Lead qualification',
      'AI customer support',
      'AI creative generation',
      'AI campaign analysis',
      'AI reporting',
      'Predictive analytics',
      'Automated lead routing',
      'Automated CRM workflows',
      'Personalisation',
      'AI search monitoring',
      'AI brand monitoring',
    ],
  },
]

export function SectionPillars() {
  const reduced = useReducedMotion()
  const [open, setOpen] = React.useState<string | null>(null)
  const active = PILLARS.find((p) => p.index === open) ?? null

  return (
    <Section id="pillars" scene="P" tone="dark">
      <SectionHeading
        eyebrow="13 PILLARS — DEPTH INSIDE THE GROWTH SYSTEM"
        h2={
          <>
            The depth behind the{' '}
            <span className="text-ribbon">system</span>.
          </>
        }
        lead="These 13 pillars sit underneath the 7 public solutions — they are the depth, not the menu. Tap any pillar to see what sits inside."
        align="left"
      />

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist/65"
      >
        <span className="font-semibold text-mist">Note</span>
        <span aria-hidden>·</span>
        <span>These 13 pillars sit underneath the 7 public solutions — they are the depth, not the menu.</span>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {PILLARS.map((p) => (
          <motion.button
            key={p.index}
            type="button"
            onClick={() => setOpen(p.index)}
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            whileHover={reduced ? undefined : { y: -4, scale: 1.01 }}
            className="glass-dark group relative flex h-full flex-col gap-3 rounded-2xl p-5 text-left"
            style={{
              boxShadow: `0 0 0 1px ${p.accent}22, 0 14px 40px -16px ${p.accent}55`,
            }}
            aria-label={`${p.name} — ${p.gloss}. Open detail panel.`}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-xs tabular"
                style={{ color: p.accent }}
              >
                {p.index}
              </span>
              <ArrowUpRight
                size={16}
                className="opacity-40 transition group-hover:opacity-100"
                style={{ color: p.accent }}
                aria-hidden
              />
            </div>
            <h3 className="text-base font-bold leading-tight text-mist">{p.name}</h3>
            <p className="text-sm leading-relaxed text-mist/70">{p.gloss}</p>
          </motion.button>
        ))}
      </div>

      <SidePanel
        open={open !== null}
        onClose={() => setOpen(null)}
        title={active?.name ?? ''}
        accent={active?.accent ?? '#7B3FFE'}
      >
        {active && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-xs tabular"
                style={{ color: active.accent }}
              >
                {active.index} / 13
              </span>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: active.accent }}
                aria-hidden
              />
            </div>

            <p className="text-base text-mist/85">{active.gloss}</p>

            {active.sourceName && active.sourceName !== active.name && (
              <p className="text-xs text-mist/55">
                Source coined name: <span className="text-mist/75">{active.sourceName}</span>
              </p>
            )}

            <div className="border-t border-white/10 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mist/50">
                Includes
              </p>

              {active.groups
                ? active.groups.map((g) => (
                    <div key={g.label} className="mb-4 last:mb-0">
                      <p className="mb-2 text-xs font-semibold text-mist/80">{g.label}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {g.items.map((it) => (
                          <li
                            key={it}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-mist/75"
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                : active.items && (
                    <ul className="flex flex-wrap gap-1.5">
                      {active.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-mist/75"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
            </div>
          </div>
        )}
      </SidePanel>
    </Section>
  )
}
