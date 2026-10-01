'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { BorderBeam } from '@/components/ui/border-beam'
import { cn } from '@/lib/utils'

interface Dimension {
  name: string
  score: number
  color: string
  note: string
}

export function InteractiveGrowthCalculator({ className }: { className?: string }) {
  const [industry, setIndustry] = React.useState('d2c')
  const [spend, setSpend] = React.useState('50k')
  const [convRate, setConvRate] = React.useState('1-2')
  const [focus, setFocus] = React.useState('performance')

  // Dynamic score calculation
  const calculated = React.useMemo(() => {
    let baseScore = 58
    if (industry === 'd2c') baseScore += 4
    if (industry === 'b2b') baseScore += 7
    if (industry === 'fintech') baseScore += 10
    if (industry === 'health') baseScore += 6

    if (spend === '100k') baseScore += 12
    else if (spend === '50k') baseScore += 8
    else if (spend === '15k') baseScore += 4

    if (convRate === 'gt4') baseScore += 14
    else if (convRate === '2-4') baseScore += 8
    else if (convRate === '1-2') baseScore += 3

    const finalScore = Math.min(94, Math.max(48, baseScore))
    const potentialRoas = (2.4 + (100 - finalScore) * 0.035).toFixed(1)
    const cacReduction = Math.round(18 + (100 - finalScore) * 0.32)

    const dimensions: Dimension[] = [
      {
        name: 'AI & Search Visibility',
        score: Math.min(98, Math.round(finalScore * 0.95 + 4)),
        color: '#02A3FE',
        note: 'AI Overviews & LLM answer presence',
      },
      {
        name: 'Performance Ad Efficiency',
        score: Math.min(96, Math.round(finalScore * 1.05 - 2)),
        color: '#2E4BFE',
        note: 'Creative fatigue & ROAS scale ceiling',
      },
      {
        name: 'Conversion Architecture',
        score: Math.min(95, Math.round(finalScore * 0.9 + 6)),
        color: '#E93BF2',
        note: 'Page speed, frictionless checkout & CRO',
      },
      {
        name: 'Lifecycle & CRM Automation',
        score: Math.min(92, Math.round(finalScore * 0.88 + 5)),
        color: '#FF8E2D',
        note: 'Repeat purchase & automated reactivation',
      },
    ]

    return { finalScore, potentialRoas, cacReduction, dimensions }
  }, [industry, spend, convRate, focus])

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-ink-deep/90 p-6 backdrop-blur-2xl sm:p-10 lg:p-12',
        'shadow-[0_20px_80px_-20px_rgba(46,75,254,0.35)]',
        className,
      )}
    >
      <BorderBeam size={320} duration={10} colorFrom="#02A3FE" colorTo="#E93BF2" />

      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-cyan">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive Assessment Tool
        </span>
        <h3 className="mt-3 text-2xl font-extrabold text-mist sm:text-4xl">
          Simulate Your <span className="text-ribbon">Digital Growth Score™</span>
        </h3>
        <p className="mt-2 max-w-xl text-sm text-mist/70 sm:text-base">
          See how your brand stacks up across AI visibility, ad economics, conversion friction, and lifecycle growth.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Inputs */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          {/* Industry */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mist/60">
              1. Industry Category
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { id: 'd2c', label: 'D2C Brands' },
                { id: 'b2b', label: 'B2B SaaS' },
                { id: 'fintech', label: 'FinTech' },
                { id: 'health', label: 'Health' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndustry(item.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-200',
                    industry === item.id
                      ? 'border-cyan bg-cyan/15 text-mist shadow-[0_0_15px_rgba(2,163,254,0.3)]'
                      : 'border-white/10 bg-white/5 text-mist/70 hover:border-white/20 hover:text-mist',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Spend */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mist/60">
              2. Monthly Growth Budget
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { id: '5k', label: '< $15k / mo' },
                { id: '15k', label: '$15k – $50k' },
                { id: '50k', label: '$50k – $100k' },
                { id: '100k', label: '$100k+ / mo' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSpend(item.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-200',
                    spend === item.id
                      ? 'border-royal bg-royal/20 text-mist shadow-[0_0_15px_rgba(46,75,254,0.3)]'
                      : 'border-white/10 bg-white/5 text-mist/70 hover:border-white/20 hover:text-mist',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Conversion Rate */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mist/60">
              3. Current Site Conversion Rate
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { id: 'lt1', label: '< 1.0%' },
                { id: '1-2', label: '1.0% – 2.0%' },
                { id: '2-4', label: '2.0% – 4.0%' },
                { id: 'gt4', label: '> 4.0%' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setConvRate(item.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-200',
                    convRate === item.id
                      ? 'border-magenta bg-magenta/20 text-mist shadow-[0_0_15px_rgba(233,59,242,0.3)]'
                      : 'border-white/10 bg-white/5 text-mist/70 hover:border-white/20 hover:text-mist',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Bottleneck */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mist/60">
              4. Immediate Growth Objective
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { id: 'performance', label: '⚡ Lower CAC & Scale Spend' },
                { id: 'ai-search', label: '🤖 Dominate AI Overviews' },
                { id: 'cro', label: '🛒 Double Funnel Conversion' },
                { id: 'retention', label: '🔁 Build Predictable Retention' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFocus(item.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all duration-200',
                    focus === item.id
                      ? 'border-coral bg-coral/15 text-mist shadow-[0_0_15px_rgba(255,84,77,0.3)]'
                      : 'border-white/10 bg-white/5 text-mist/70 hover:border-white/20 hover:text-mist',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Gauge & Dimensions */}
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-ink-soft/80 p-6 text-center backdrop-blur-xl lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-mist/50">Estimated Score</p>
          
          {/* Animated Radial Score */}
          <div className="relative my-4 flex h-36 w-36 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-white/10"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#calc-ribbon)"
                strokeWidth="8"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * calculated.finalScore) / 100 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="calc-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#02A3FE" />
                  <stop offset="50%" stopColor="#7B3FFE" />
                  <stop offset="100%" stopColor="#FF8E2D" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-4xl font-extrabold text-mist">{calculated.finalScore}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-mist/50">/ 100</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid w-full grid-cols-2 gap-2 border-y border-white/10 py-3 text-center">
            <div>
              <p className="font-mono text-base font-bold text-cyan">+{calculated.potentialRoas}x</p>
              <p className="text-[10px] uppercase tracking-wider text-mist/60">Target Scale Multiple</p>
            </div>
            <div>
              <p className="font-mono text-base font-bold text-coral">-{calculated.cacReduction}%</p>
              <p className="text-[10px] uppercase tracking-wider text-mist/60">Achievable CAC Savings</p>
            </div>
          </div>

          {/* 4 Dimension mini-bars */}
          <div className="mt-4 flex w-full flex-col gap-2.5 text-left">
            {calculated.dimensions.map((dim) => (
              <div key={dim.name}>
                <div className="flex justify-between text-[11px] font-medium text-mist/80">
                  <span>{dim.name}</span>
                  <span className="font-mono" style={{ color: dim.color }}>{dim.score}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: dim.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.score}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-6 w-full">
            <ShimmerButton href="#contact" className="w-full">
              Get Your Custom Growth Blueprint
            </ShimmerButton>
            <p className="mt-2 text-[10px] text-mist/50">Free 48-Hour Growth Diagnostic • No Obligation</p>
          </div>
        </div>
      </div>
    </div>
  )
}
