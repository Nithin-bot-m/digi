'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {
  Section,
  SectionHeading,
  GlassNode,
  SidePanel,
  CtaButton,
  Tag,
} from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 6 — Solutions (Content Pack Source A §6 Section 4 + §8–14)
 *
 * Tone: MIST (light). Per-pillar accents.
 *
 * H2: "Everything your growth engine needs."
 * Lead: "One growth system. Multiple capabilities."
 *
 * 7 pillars rendered as a 2-col (mobile) / 3-col (desktop) grid of
 * <GlassNode> cards. Each card: index, title, verbatim one-liner,
 * "View solution" affordance. Clicking opens a <SidePanel> with the FULL
 * solution-page copy from Source A §8–14 (H1, services, performance creative
 * loop / measurement / etc., CTA).
 *
 * NOTE: <GlassNode> uses glass-dark styling which is tuned for dark scenes;
 * here on mist we keep the cards on a glass-dark surface so they read as
 * "deep solution nodes" against the light stage (intentional contrast).
 */

type Pillar = {
  index: string
  title: string
  oneLiner: string
  accent: string
  side: {
    pageLabel: string
    h1: string
    intro: string
    sections: { title: string; items: string[] }[]
    extra?: React.ReactNode
  }
  cta: string
}

const PILLARS: Pillar[] = [
  {
    index: '01',
    title: 'Performance Marketing',
    oneLiner:
      'Paid acquisition across Google, Meta, YouTube, LinkedIn and other relevant channels, connected to conversion and revenue measurement.',
    accent: '#FF544D',
    cta: 'Build My Performance Strategy →',
    side: {
      pageLabel: 'PERFORMANCE MARKETING',
      h1: 'Put your budget where growth happens.',
      intro:
        'We plan, launch and optimise paid acquisition systems around business outcomes—not just clicks.',
      sections: [
        {
          title: 'Services',
          items: [
            'Google Search Ads',
            'Performance Max',
            'AI Max for Search',
            'Shopping',
            'YouTube',
            'Demand Gen',
            'Display',
            'Remarketing',
            'Meta Ads',
            'Advantage+',
            'Lead-generation campaigns',
            'Conversion campaigns',
            'Catalogue campaigns',
            'LinkedIn Ads',
            'Other paid channels where justified by the client’s audience',
          ],
        },
        {
          title: 'Performance Creative',
          items: [
            'Ad concepts',
            'Hook testing',
            'Static creatives',
            'Video ads',
            'UGC',
            'Creator content',
            'Creative iteration',
            'Creative fatigue monitoring',
            'Landing-page message alignment',
          ],
        },
        {
          title: 'Measurement',
          items: [
            'CPL',
            'CPA',
            'CAC',
            'Qualified-lead rate',
            'Conversion rate',
            'ROAS',
            'Revenue',
            'Pipeline (where data is available)',
          ],
        },
      ],
      extra: (
        <p className="rounded-xl border border-white/10 bg-ink/40 p-3 text-xs text-mist/70">
          Current-market note: Google states that AI Max for Search combines AI targeting and
          creative enhancements, and its 2026 product roadmap continues to expand AI-driven
          campaign capabilities.
        </p>
      ),
    },
  },
  {
    index: '02',
    title: 'Search & AI Visibility',
    oneLiner:
      'SEO, local search, structured content and AI-search visibility designed to help customers discover and understand your brand.',
    accent: '#02A3FE',
    cta: 'Improve My Search Visibility →',
    side: {
      pageLabel: 'SEARCH & AI VISIBILITY',
      h1: 'Be found where your customers search.',
      intro:
        'Search now spans traditional results, AI features, local results, images, video and other discovery surfaces. We build the foundations that help search systems understand your business and help customers discover it.',
      sections: [
        {
          title: 'SEO',
          items: [
            'Technical SEO',
            'On-page SEO',
            'Off-page SEO',
            'Local SEO',
            'Enterprise SEO',
            'E-commerce SEO',
            'International SEO',
            'Programmatic SEO',
            'Video SEO',
            'Image SEO',
          ],
        },
        {
          title: 'AI Search Visibility',
          items: [
            'Entity clarity',
            'Structured content',
            'Schema',
            'Knowledge-graph readiness',
            'AI crawler accessibility',
            'AI visibility monitoring',
            'Brand-mention monitoring',
            'Citation-ready content',
            'Third-party authority',
          ],
        },
      ],
      extra: (
        <div className="rounded-xl border border-amber/30 bg-amber/5 p-3 text-xs text-mist/80">
          <p className="font-semibold text-amber">Important positioning</p>
          <p className="mt-1">
            Do not promise guaranteed ChatGPT/AI rankings. Position AI Search Visibility as
            improving discoverability, clarity, authority and the availability of useful
            brand information across modern search experiences.
          </p>
        </div>
      ),
    },
  },
  {
    index: '03',
    title: 'Creative & Content',
    oneLiner:
      'Content and performance creative designed to attract attention, build trust and improve campaign performance.',
    accent: '#7B3FFE',
    cta: 'Build My Content & Creative System →',
    side: {
      pageLabel: 'CREATIVE & CONTENT',
      h1: 'Create content people notice, understand and act on.',
      intro:
        'We build content systems that support discovery, trust, conversion and retention.',
      sections: [
        {
          title: 'Strategy',
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
          title: 'Written',
          items: [
            'Website copy',
            'Blogs',
            'Articles',
            'Case studies',
            'Whitepapers',
            'Reports',
            'Landing-page copy',
            'Ad copy',
            'Email copy',
            'Social copy',
          ],
        },
        {
          title: 'Visual & Video',
          items: [
            'Static creatives',
            'Carousels',
            'Infographics',
            'Reels',
            'Shorts',
            'YouTube',
            'Testimonials',
            'Product videos',
            'Explainers',
            'Interviews',
            'Corporate videos',
          ],
        },
      ],
      extra: (
        <div className="rounded-2xl bg-ribbon/10 p-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-violet">
            Performance creative loop
          </p>
          <p className="mt-1 text-base font-bold text-ribbon">
            “Create → Test → Learn → Scale”
          </p>
        </div>
      ),
    },
  },
  {
    index: '04',
    title: 'Web & Conversion',
    oneLiner:
      'Websites, landing pages, UX and CRO built around the actions that matter to the business.',
    accent: '#E93BF2',
    cta: 'Improve My Conversion Journey →',
    side: {
      pageLabel: 'WEB & CONVERSION',
      h1: "Don't just bring visitors. Give them a reason to act.",
      intro:
        'We build digital experiences around user intent, trust and measurable conversion.',
      sections: [
        {
          title: 'Web',
          items: [
            'Corporate websites',
            'Service websites',
            'Product websites',
            'Landing pages',
            'Campaign pages',
            'Microsites',
            'E-commerce',
          ],
        },
        {
          title: 'UX & Technical',
          items: [
            'UX/UI',
            'Mobile optimisation',
            'Website speed',
            'Core Web Vitals',
            'Accessibility',
            'Technical health',
            'Security',
            'Information architecture',
          ],
        },
        {
          title: 'CRO',
          items: [
            'CTA optimisation',
            'Form optimisation',
            'Landing-page optimisation',
            'Funnel optimisation',
            'A/B testing',
            'Heatmaps',
            'Session analysis',
            'Personalisation',
            'Lead qualification',
          ],
        },
      ],
      extra: (
        <div className="rounded-xl border border-white/10 bg-ink/40 p-3 text-xs text-mist/80">
          <p className="font-semibold text-magenta">Conversion journey</p>
          <p className="mt-1 font-mono">
            Visitor → Lead → Qualified Lead → Opportunity → Customer
          </p>
        </div>
      ),
    },
  },
  {
    index: '05',
    title: 'Data & Analytics',
    oneLiner:
      'Tracking, attribution and dashboards that connect marketing activity to business outcomes.',
    accent: '#FFB020',
    cta: 'Fix My Measurement →',
    side: {
      pageLabel: 'DATA & ANALYTICS',
      h1: 'Know what actually drives growth.',
      intro:
        'We connect marketing, website and customer data so decisions can be made on business outcomes rather than isolated platform metrics.',
      sections: [
        {
          title: 'Tracking',
          items: [
            'GA4',
            'Google Tag Manager',
            'Search Console',
            'Meta Pixel',
            'Conversions API',
            'Server-side tracking',
            'Enhanced/advanced conversion measurement where supported',
            'UTM architecture',
          ],
        },
        {
          title: 'Revenue measurement',
          items: [
            'Lead tracking',
            'Qualified lead tracking',
            'Call tracking',
            'WhatsApp tracking',
            'Offline conversion feedback',
            'CRM integration',
            'Attribution',
            'Dashboards',
          ],
        },
      ],
      extra: (
        <div className="rounded-xl border border-amber/30 bg-amber/5 p-3 text-xs text-mist/80">
          <p className="font-semibold text-amber">Core KPIs</p>
          <p className="mt-1">
            CPL • CPA • CAC • ROAS • Conversion Rate • Revenue • Pipeline • LTV • Retention
          </p>
        </div>
      ),
    },
  },
  {
    index: '06',
    title: 'CRM & Automation',
    oneLiner:
      'Lead management, WhatsApp, email, nurturing and automation that extend growth beyond the first conversion.',
    accent: '#2E4BFE',
    cta: 'Build My Lead-to-Customer System →',
    side: {
      pageLabel: 'CRM & AUTOMATION',
      h1: 'Turn leads into relationships.',
      intro:
        'Acquisition is only the beginning. We connect follow-up, qualification, nurturing and retention into the growth system.',
      sections: [
        {
          title: 'CRM',
          items: [
            'Lead management',
            'Lead scoring',
            'Segmentation',
            'Sales pipeline',
            'CRM integration',
            'Lead routing',
          ],
        },
        {
          title: 'Lifecycle',
          items: [
            'Email marketing',
            'WhatsApp marketing',
            'SMS',
            'Push notifications',
            'Retargeting',
            'Re-engagement',
            'Onboarding',
            'Upselling',
            'Cross-selling',
            'Loyalty',
            'Referral',
          ],
        },
        {
          title: 'Automation',
          items: [
            'Automated follow-up',
            'Lead qualification',
            'Lead routing',
            'CRM workflows',
            'Personalisation',
            'Reporting workflows',
            'AI-assisted support',
          ],
        },
      ],
    },
  },
  {
    index: '07',
    title: 'AI Growth',
    oneLiner:
      'Practical AI workflows, agents, analysis, content systems and automation for marketing and operations.',
    accent: '#FF8E2D',
    cta: 'Explore an AI Growth Opportunity →',
    side: {
      pageLabel: 'AI GROWTH',
      h1: 'Use AI where it creates real business value.',
      intro:
        'We use AI to improve marketing workflows, analysis, content operations, customer journeys and automation—without treating AI as a substitute for strategy.',
      sections: [
        {
          title: 'AI Marketing',
          items: [
            'AI content workflows',
            'Campaign analysis',
            'AI reporting',
            'Creative assistance',
            'AI search monitoring',
            'Brand monitoring',
          ],
        },
        {
          title: 'AI Automation',
          items: [
            'AI chatbots',
            'Lead qualification',
            'Automated routing',
            'CRM workflows',
            'Personalisation',
            'Customer support',
            'Predictive analytics',
          ],
        },
        {
          title: 'AI Technology',
          items: [
            'AI agents',
            'Custom AI workflows',
            'Custom AI tools',
            'Marketing automation',
            'Business process automation',
          ],
        },
      ],
    },
  },
]

export function SceneSolutions() {
  const [open, setOpen] = React.useState<string | null>(null)
  const reduced = useReducedMotion()
  const active = PILLARS.find((p) => p.title === open) || null

  return (
    <Section id="scene-6-solutions" scene="6" tone="mist">
      <SectionHeading
        eyebrow="SCENE 6 — SOLUTIONS"
        h2={<>Everything your growth engine needs.</>}
        lead={<>One growth system. Multiple capabilities.</>}
        align="center"
        tone="light"
        className="mx-auto items-center"
      />

      {/* Pillar grid: 2-col mobile, 3-col desktop */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <GlassNode
            key={p.title}
            index={p.index}
            title={p.title}
            accent={p.accent}
            onClick={() => setOpen(p.title)}
            className=""
          >
            <p className="text-sm text-mist/75">{p.oneLiner}</p>
            <div
              className="mt-4 flex items-center gap-1 text-xs font-semibold"
              style={{ color: p.accent }}
            >
              View solution
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </GlassNode>
        ))}

        {/* Card #8 — CTA card */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative flex min-h-[200px] flex-col items-start justify-center rounded-2xl bg-ribbon p-6 text-white glow-ribbon"
        >
          <p className="font-mono text-xs tabular uppercase tracking-[0.28em] text-white/80">
            Connected system
          </p>
          <p className="mt-3 text-2xl font-extrabold leading-tight">
            Seven pillars. One growth engine.
          </p>
          <p className="mt-2 text-sm text-white/85">
            Each pillar is built to feed the next — and the next — and the next.
          </p>
          <div className="mt-5">
            <CtaButton href="#growth-score" variant="light" className="bg-ink text-mist hover:bg-ink-soft">
              Get Your Digital Growth Score →
            </CtaButton>
          </div>
        </motion.div>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-ink/55">
        <Illustrative /> Capabilities and channel mix are illustrative; tailored per business.
      </p>

      {/* Side panel — shared, switches content based on which pillar opened */}
      <SidePanel
        open={!!active}
        onClose={() => setOpen(null)}
        title={active ? `${active.index} — ${active.title}` : ''}
        accent={active?.accent || '#2E4BFE'}
      >
        {active && (
          <div className="flex flex-col gap-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: active.accent }}>
              {active.side.pageLabel}
            </p>
            <h3 className="text-xl font-extrabold text-mist">{active.side.h1}</h3>
            <p className="text-sm text-mist/80">{active.side.intro}</p>

            {active.side.sections.map((section) => (
              <div key={section.title}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-mist/55">
                  {section.title}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Tag color={active.accent}>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {active.side.extra}

            <div className="mt-2">
              <CtaButton href="#contact" variant="primary">
                {active.cta}
              </CtaButton>
            </div>
          </div>
        )}
      </SidePanel>
    </Section>
  )
}
