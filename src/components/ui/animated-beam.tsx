'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * 21st.dev / Magic UI: Animated Beam
 * Connects two interactive nodes with a luminous pulsing gradient laser.
 */
export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = 'rgba(255, 255, 255, 0.12)',
  pathWidth = 2,
  pathOpacity = 0.25,
  gradientStartColor = '#02A3FE',
  gradientStopColor = '#FF8E2D',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: {
  className?: string
  containerRef: React.RefObject<HTMLElement | null>
  fromRef: React.RefObject<HTMLElement | null>
  toRef: React.RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  duration?: number
  delay?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}) {
  const id = React.useId()
  const [pathD, setPathD] = React.useState('')
  const [svgDimensions, setSvgDimensions] = React.useState({ width: 0, height: 0 })

  const updatePath = React.useCallback(() => {
    if (!containerRef.current || !fromRef.current || !toRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const rectA = fromRef.current.getBoundingClientRect()
    const rectB = toRef.current.getBoundingClientRect()

    const svgWidth = containerRect.width
    const svgHeight = containerRect.height
    setSvgDimensions({ width: svgWidth, height: svgHeight })

    const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
    const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset
    const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
    const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

    const controlY = startY - curvature
    const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
    setPathD(d)
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  React.useEffect(() => {
    updatePath()
    window.addEventListener('resize', updatePath)
    window.addEventListener('scroll', updatePath)
    return () => {
      window.removeEventListener('resize', updatePath)
      window.removeEventListener('scroll', updatePath)
    }
  }, [updatePath])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none absolute left-0 top-0 transform-gpu stroke-2', className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth * 1.5}
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: '0%',
            x2: '0%',
            y1: '0%',
            y2: '0%',
          }}
          animate={{
            x1: reverse ? ['100%', '0%'] : ['0%', '100%'],
            x2: reverse ? ['110%', '10%'] : ['-10%', '90%'],
            y1: ['0%', '0%'],
            y2: ['0%', '0%'],
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0"></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
