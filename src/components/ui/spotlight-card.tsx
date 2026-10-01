'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * 21st.dev / Magic UI: 3D Spotlight Card
 * Features:
 * - Dynamic mouse-tracking radial spotlight glare
 * - Interactive 3D tilt perspective (desktop)
 * - Gradient border glow with customizable accent
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(2, 163, 254, 0.15)',
  accentColor = '#2E4BFE',
  enableTilt = true,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  accentColor?: string
  enableTilt?: boolean
  onClick?: () => void
}) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = React.useState(0)
  const [tilt, setTilt] = React.useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })

    if (enableTilt && window.innerWidth >= 1024) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6
      setTilt({ rotateX, rotateY })
    }
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => {
    setOpacity(0)
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-deep/80 p-6 backdrop-blur-xl transition-all duration-300',
        'hover:border-white/20 hover:shadow-[0_12px_40px_-10px_rgba(46,75,254,0.3)]',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {/* Dynamic mouse spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle border accent */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${accentColor}44`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
