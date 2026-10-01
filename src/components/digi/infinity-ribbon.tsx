'use client'

import * as React from 'react'
import { useReducedMotion } from './hooks'

/**
 * Living ∞ ribbon (Master Prompt §5.2)
 *
 * Renders the signature lemniscate as an SVG path with the brand gradient
 * stroke + a glow, plus a Canvas overlay painting flowing particle streaks
 * along the path. The ribbon reacts to cursor and scroll velocity.
 *
 * Used as a fixed cinematic backdrop across the dark stage scenes.
 */

type Props = {
  className?: string
  intensity?: number // 0..1 particle density
}

export function InfinityRibbon({ className, intensity = 0.6 }: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const svgRef = React.useRef<SVGSVGElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const pointer = React.useRef({ x: 0.5, y: 0.5 })
  const scrollVel = React.useRef(0)

  // Build the path length sampler once.
  const pathRef = React.useRef<SVGPathElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let lastScroll = window.scrollY
    let lastT = performance.now()
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      canvas.width = Math.max(2, rect.width * dpr)
      canvas.height = Math.max(2, rect.height * dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onScroll = () => {
      const now = performance.now()
      const dy = window.scrollY - lastScroll
      const dt = Math.max(1, now - lastT)
      scrollVel.current = Math.min(2.5, Math.abs(dy / dt) * 0.4)
      lastScroll = window.scrollY
      lastT = now
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      pointer.current.x = (e.clientX - rect.left) / rect.width
      pointer.current.y = (e.clientY - rect.top) / rect.height
    }
    wrap.addEventListener('pointermove', onPointer)

    // Particle pool
    type P = { t: number; speed: number; size: number; hue: number; life: number }
    const particles: P[] = []
    const MAX = Math.max(30, Math.floor(120 * intensity))
    const spawn = (i: number) => ({
      t: (i / MAX) % 1,
      speed: 0.0006 + Math.random() * 0.0018,
      size: 1 + Math.random() * 2.4,
      hue: i / MAX,
      life: 1,
    })
    for (let i = 0; i < MAX; i++) particles.push(spawn(i))

    // Sample path point at param t in [0,1]. Use the same lemniscate formula as the SVG.
    // Lemniscate of Gerono approx, scaled to viewport:
    // x = A * sin(t) / (1 + cos^2(t))
    // y = A * sin(t) * cos(t) / (1 + cos^2(t))
    // We rotate it slightly for the diagonal feel.
    const sample = (t: number) => {
      const rect = wrap.getBoundingClientRect()
      const cx = rect.width / 2
      const cy = rect.height / 2
      const A = Math.min(rect.width, rect.height * 1.6) * 0.42
      const u = t * Math.PI * 2
      const denom = 1 + Math.cos(u) * Math.cos(u)
      const x = cx + (A * Math.sin(u)) / denom
      const y = cy + (A * Math.sin(u) * Math.cos(u)) / denom
      return { x, y }
    }

    const COLORS = ['#02A3FE', '#2E4BFE', '#7B3FFE', '#E93BF2', '#FF544D', '#FF8E2D']

    const render = (now: number) => {
      const rect = wrap.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      // pointer parallax offset
      const px = (pointer.current.x - 0.5) * 16
      const py = (pointer.current.y - 0.5) * 16

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        // scroll velocity accelerates particles
        p.t = (p.t + p.speed * (1 + scrollVel.current * 1.5)) % 1
        const pt = sample(p.t)
        // tail
        const tailLen = 6
        for (let k = 0; k < tailLen; k++) {
          const tt = (p.t - k * 0.012 + 1) % 1
          const tpt = sample(tt)
          const alpha = (1 - k / tailLen) * 0.55
          const col = COLORS[Math.floor(p.hue * (COLORS.length - 1))]
          ctx.fillStyle = col
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.arc(tpt.x + px, tpt.y + py, p.size * (1 - k / tailLen), 0, Math.PI * 2)
          ctx.fill()
        }
        // head sparkle
        ctx.globalAlpha = 0.9
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(pt.x + px, pt.y + py, p.size * 1.1, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    if (!reduced) raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      wrap.removeEventListener('pointermove', onPointer)
    }
  }, [intensity, reduced])

  const uid = React.useId().replace(/:/g, '')
  const bgGradId = `ribbon-bg-grad-${uid}`
  const glowFilterId = `ribbon-glow-${uid}`

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={bgGradId} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#02A3FE" />
              <stop offset="0.2" stopColor="#2E4BFE" />
              <stop offset="0.4" stopColor="#7B3FFE" />
              <stop offset="0.6" stopColor="#E93BF2" />
              <stop offset="0.8" stopColor="#FF544D" />
              <stop offset="1" stopColor="#FF8E2D" />
            </linearGradient>
            <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Lemniscate path, centered at (400,200), amplitude ~340 */}
          <path
            ref={pathRef}
            d="M 400 200
               C 400 80, 240 80, 230 200
               C 220 320, 400 320, 400 200
               C 400 80, 560 80, 570 200
               C 580 320, 400 320, 400 200 Z"
            fill="none"
            stroke={`url(#${bgGradId})`}
            strokeWidth="5"
            strokeLinecap="round"
            filter={`url(#${glowFilterId})`}
            opacity="0.45"
          />
          <path
            d="M 400 200
               C 400 80, 240 80, 230 200
               C 220 320, 400 320, 400 200
               C 400 80, 560 80, 570 200
               C 580 320, 400 320, 400 200 Z"
            fill="none"
            stroke={`url(#${bgGradId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
    )
}
