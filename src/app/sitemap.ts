import type { MetadataRoute } from 'next'
import { SOLUTION_SLUGS } from '@/components/digi/solutions-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://digiartha.com'

/**
 * Digi∞Artha — sitemap.xml
 * Master Prompt §9: clean URLs, XML sitemap, internal linking.
 *
 * Served by Next.js at /sitemap.xml automatically.
 */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/solutions`, lastModified: lastMonth, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/growth-score`, lastModified: lastMonth, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/industries`, lastModified: lastMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, lastModified: lastMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/how-we-work`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/engagement-models`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/growth-os`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/pillars`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/technology`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/insights`, lastModified: lastMonth, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: lastMonth, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTION_SLUGS.map((slug) => ({
    url: `${SITE_URL}/solutions/${slug}`,
    lastModified: lastMonth,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...solutionRoutes]
}
