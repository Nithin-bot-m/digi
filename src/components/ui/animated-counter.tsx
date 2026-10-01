'use client'

import * as React from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

/**
 * 60. Animated Counter — Number that smoothly rolls up to target value
 */
export function AnimatedCounter({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const spring = useSpring(0, { mass: 0.7, stiffness: 60, damping: 14 })
  const display = useTransform(spring, (current) => Math.round(current))

  React.useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span className={className}>{display}</motion.span>
}
