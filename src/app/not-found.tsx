import Link from 'next/link'
import { InfinityLogo, CtaArrow } from '@/components/digi/brand'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] flex-col items-center justify-center overflow-hidden stage-ink px-4 text-center">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-30" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-6">
        <InfinityLogo className="block opacity-80" strokeWidth={24} glow withSparkle withArrowhead />
        <p className="font-mono text-7xl font-extrabold text-ribbon sm:text-8xl">404</p>
        <h1 className="text-2xl font-bold text-mist sm:text-3xl">This page drifted off the loop.</h1>
        <p className="max-w-md text-mist/60">
          The page you're looking for doesn't exist — or it moved to a new stage of the journey.
          Let's get you back on the ribbon.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-ribbon px-5 py-2.5 text-sm font-semibold text-white glow-ribbon hover:scale-[1.02]"
          >
            Back to home <CtaArrow />
          </Link>
          <Link
            href="/growth-score"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-mist hover:bg-white/10"
          >
            Get Your Digital Growth Score <CtaArrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
