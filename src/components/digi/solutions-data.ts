/**
 * Digi∞Artha — Solutions data (single source of truth)
 *
 * Copy pulled verbatim from Content Pack Source A §6 Section 4 (overview
 * one-liners) and §8–14 (full solution-page copy). Used by:
 *  - `src/app/page.tsx`            (homepage Solutions overview cards)
 *  - `src/app/solutions/[slug]/page.tsx` (full solution detail page)
 *
 * Guardrails (Master Prompt §14): every non-verified metric carries an
 * `<Illustrative />` tag on the page itself; no fabricated client logos;
 * CTAs use the exact CTA-library text.
 *
 * NOTE: no `'use client'` here — this is pure data, shared between server
 * components (the route handlers + metadata generators) and client
 * components (the homepage + solution detail renderer).
 */

export type SolutionSlug =
  | 'performance-marketing'
  | 'search-ai-visibility'
  | 'creative-content'
  | 'web-conversion'
  | 'data-analytics'
  | 'crm-automation'
  | 'ai-growth'

export interface SolutionCard {
  index: string
  slug: SolutionSlug
  title: string
  oneLiner: string
  accent: string
}

export const SOLUTION_CARDS: SolutionCard[] = [
  {
    index: '01',
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    oneLiner:
      'Paid acquisition across Google, Meta, YouTube, LinkedIn and other relevant channels, connected to conversion and revenue measurement.',
    accent: '#FF544D',
  },
  {
    index: '02',
    slug: 'search-ai-visibility',
    title: 'Search & AI Visibility',
    oneLiner:
      'SEO, local search, structured content and AI-search visibility designed to help customers discover and understand your brand.',
    accent: '#02A3FE',
  },
  {
    index: '03',
    slug: 'creative-content',
    title: 'Creative & Content',
    oneLiner:
      'Content and performance creative designed to attract attention, build trust and improve campaign performance.',
    accent: '#7B3FFE',
  },
  {
    index: '04',
    slug: 'web-conversion',
    title: 'Web & Conversion',
    oneLiner:
      'Websites, landing pages, UX and CRO built around the actions that matter to the business.',
    accent: '#E93BF2',
  },
  {
    index: '05',
    slug: 'data-analytics',
    title: 'Data & Analytics',
    oneLiner:
      'Tracking, attribution and dashboards that connect marketing activity to business outcomes.',
    accent: '#FFB020',
  },
  {
    index: '06',
    slug: 'crm-automation',
    title: 'CRM & Automation',
    oneLiner:
      'Lead management, WhatsApp, email, nurturing and automation that extend growth beyond the first conversion.',
    accent: '#2E4BFE',
  },
  {
    index: '07',
    slug: 'ai-growth',
    title: 'AI Growth',
    oneLiner:
      'Practical AI workflows, agents, analysis, content systems and automation for marketing and operations.',
    accent: '#FF8E2D',
  },
]

export interface SolutionDetail {
  index: string
  slug: SolutionSlug
  eyebrow: string
  title: string
  h1: string
  lead: string
  cta: string
  ctaHref: string
  accent: string
  /** Sections rendered as H3 + bullet list. */
  sections: { heading: string; bullets: string[] }[]
  /** Optional positioning note (verbatim from content pack). */
  positioningNote?: string
  /** Optional current-market note (verbatim). */
  marketNote?: string
  /** Embedded journey scene slug (the 3D set-piece). */
  embedScene?: 'attract-lanes' | 'be-found' | 'become-answer' | 'convert' | 'nurture' | 'measure' | 'optimise'
}

export const SOLUTIONS: Record<SolutionSlug, SolutionDetail> = {
  'performance-marketing': {
    index: '01',
    slug: 'performance-marketing',
    eyebrow: 'SOLUTION 01 · PERFORMANCE MARKETING',
    title: 'Performance Marketing',
    h1: 'Put your budget where growth happens.',
    lead:
      'We plan, launch and optimise paid acquisition systems around business outcomes—not just clicks.',
    cta: 'Build My Performance Strategy →',
    ctaHref: '/contact',
    accent: '#FF544D',
    sections: [
      {
        heading: 'Services',
        bullets: [
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
        heading: 'Performance Creative',
        bullets: [
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
        heading: 'Measurement',
        bullets: [
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
    marketNote:
      'Google states that AI Max for Search combines AI targeting and creative enhancements, and its 2026 product roadmap continues to expand AI-driven campaign capabilities.',
    embedScene: 'attract-lanes',
  },
  'search-ai-visibility': {
    index: '02',
    slug: 'search-ai-visibility',
    eyebrow: 'SOLUTION 02 · SEARCH & AI VISIBILITY',
    title: 'Search & AI Visibility',
    h1: 'Be found where your customers search.',
    lead:
      'Search now spans traditional results, AI features, local results, images, video and other discovery surfaces. We build the foundations that help search systems understand your business and help customers discover it.',
    cta: 'Improve My Search Visibility →',
    ctaHref: '/contact',
    accent: '#02A3FE',
    sections: [
      {
        heading: 'SEO',
        bullets: [
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
        heading: 'AI Search Visibility',
        bullets: [
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
    positioningNote:
      'Do not promise guaranteed ChatGPT/AI rankings. Position AI Search Visibility as improving discoverability, clarity, authority and the availability of useful brand information across modern search experiences.',
    marketNote:
      'Google’s May 2026 Search guidance explicitly addresses generative-AI features and says SEO fundamentals remain relevant, while also providing guidance around local, shopping, image and video content.',
    embedScene: 'be-found',
  },
  'creative-content': {
    index: '03',
    slug: 'creative-content',
    eyebrow: 'SOLUTION 03 · CREATIVE & CONTENT',
    title: 'Creative & Content',
    h1: 'Create content people notice, understand and act on.',
    lead: 'We build content systems that support discovery, trust, conversion and retention.',
    cta: 'Build My Content & Creative System →',
    ctaHref: '/contact',
    accent: '#7B3FFE',
    sections: [
      {
        heading: 'Strategy',
        bullets: [
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
        heading: 'Written',
        bullets: [
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
        heading: 'Visual & Video',
        bullets: [
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
      {
        heading: 'Performance creative loop',
        bullets: ['Create → Test → Learn → Scale'],
      },
    ],
  },
  'web-conversion': {
    index: '04',
    slug: 'web-conversion',
    eyebrow: 'SOLUTION 04 · WEB & CONVERSION',
    title: 'Web & Conversion',
    h1: "Don't just bring visitors. Give them a reason to act.",
    lead:
      'We build digital experiences around user intent, trust and measurable conversion.',
    cta: 'Improve My Conversion Journey →',
    ctaHref: '/contact',
    accent: '#E93BF2',
    sections: [
      {
        heading: 'Web',
        bullets: [
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
        heading: 'UX & Technical',
        bullets: [
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
        heading: 'CRO',
        bullets: [
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
      {
        heading: 'Conversion journey',
        bullets: ['Visitor → Lead → Qualified Lead → Opportunity → Customer'],
      },
    ],
    embedScene: 'convert',
  },
  'data-analytics': {
    index: '05',
    slug: 'data-analytics',
    eyebrow: 'SOLUTION 05 · DATA & ANALYTICS',
    title: 'Data & Analytics',
    h1: 'Know what actually drives growth.',
    lead:
      'We connect marketing, website and customer data so decisions can be made on business outcomes rather than isolated platform metrics.',
    cta: 'Fix My Measurement →',
    ctaHref: '/contact',
    accent: '#FFB020',
    sections: [
      {
        heading: 'Tracking',
        bullets: [
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
        heading: 'Revenue measurement',
        bullets: [
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
      {
        heading: 'Core KPIs',
        bullets: ['CPL', 'CPA', 'CAC', 'ROAS', 'Conversion Rate', 'Revenue', 'Pipeline', 'LTV', 'Retention'],
      },
    ],
    embedScene: 'measure',
  },
  'crm-automation': {
    index: '06',
    slug: 'crm-automation',
    eyebrow: 'SOLUTION 06 · CRM & AUTOMATION',
    title: 'CRM & Automation',
    h1: 'Turn leads into relationships.',
    lead:
      'Acquisition is only the beginning. We connect follow-up, qualification, nurturing and retention into the growth system.',
    cta: 'Build My Lead-to-Customer System →',
    ctaHref: '/contact',
    accent: '#2E4BFE',
    sections: [
      {
        heading: 'CRM',
        bullets: [
          'Lead management',
          'Lead scoring',
          'Segmentation',
          'Sales pipeline',
          'CRM integration',
          'Lead routing',
        ],
      },
      {
        heading: 'Lifecycle',
        bullets: [
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
        heading: 'Automation',
        bullets: [
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
    embedScene: 'nurture',
  },
  'ai-growth': {
    index: '07',
    slug: 'ai-growth',
    eyebrow: 'SOLUTION 07 · AI GROWTH',
    title: 'AI Growth',
    h1: 'Use AI where it creates real business value.',
    lead:
      'We use AI to improve marketing workflows, analysis, content operations, customer journeys and automation—without treating AI as a substitute for strategy.',
    cta: 'Explore an AI Growth Opportunity →',
    ctaHref: '/contact',
    accent: '#FF8E2D',
    sections: [
      {
        heading: 'AI Marketing',
        bullets: [
          'AI content workflows',
          'Campaign analysis',
          'AI reporting',
          'Creative assistance',
          'AI search monitoring',
          'Brand monitoring',
        ],
      },
      {
        heading: 'AI Automation',
        bullets: [
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
        heading: 'AI Technology',
        bullets: [
          'AI agents',
          'Custom AI workflows',
          'Custom AI tools',
          'Marketing automation',
          'Business process automation',
        ],
      },
    ],
    embedScene: 'optimise',
  },
}

/** Lookup helper that throws on unknown slug (so Next.js generateStaticParams + page stay in sync). */
export function getSolution(slug: string): SolutionDetail {
  const s = SOLUTIONS[slug as SolutionSlug]
  if (!s) throw new Error(`Unknown solution slug: ${slug}`)
  return s
}

export const SOLUTION_SLUGS = Object.keys(SOLUTIONS) as SolutionSlug[]
