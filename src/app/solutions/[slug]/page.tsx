import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SOLUTION_SLUGS, getSolution, SOLUTIONS } from '@/components/digi/solutions-data'
import { SolutionDetailPage } from '@/components/digi/solution-detail'

export const dynamicParams = false

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    if (!SOLUTIONS[slug as keyof typeof SOLUTIONS]) return { title: 'Solution not found' }
    const s = getSolution(slug)
    return {
      title: s.title,
      description: s.lead,
      alternates: { canonical: `/solutions/${slug}` },
      openGraph: {
        title: `${s.title} | Digi∞Artha`,
        description: s.lead,
        url: `/solutions/${slug}`,
      },
    }
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!SOLUTIONS[slug as keyof typeof SOLUTIONS]) notFound()
  return <SolutionDetailPage slug={slug} />
}
