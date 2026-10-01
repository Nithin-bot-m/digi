'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { CtaArrow } from '@/components/digi/brand'

/**
 * 21st.dev / Magic UI: Shimmer Button
 * A premium CTA button with continuous shimmer gradient sweep and bloom glow.
 */
export function ShimmerButton({
  children,
  className,
  shimmerColor = '#ffffff',
  shimmerSize = '0.08em',
  shimmerDuration = '2.5s',
  background = 'var(--ribbon-gradient, linear-gradient(135deg, #02A3FE, #2E4BFE, #7B3FFE, #E93BF2, #FF544D, #FF8E2D))',
  borderRadius = '9999px',
  href,
  onClick,
  ...props
}: {
  children: React.ReactNode
  className?: string
  shimmerColor?: string
  shimmerSize?: string
  shimmerDuration?: string
  background?: string
  borderRadius?: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  [key: string]: any
}) {
  const Component = href ? 'a' : 'button'

  return (
    <Component
      href={href}
      onClick={onClick}
      style={
        {
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        } as React.CSSProperties
      }
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-sm font-semibold text-white transition-all duration-300',
        'hover:scale-[1.03] active:scale-[0.98] shadow-lg glow-ribbon',
        className,
      )}
      {...props}
    >
      {/* Background with continuous conic shimmer */}
      <div
        className="absolute inset-0 -z-30 overflow-visible [container-type:size]"
        style={{ borderRadius }}
      >
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-spin [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>

      {/* Button gradient surface */}
      <div
        className="absolute inset-[1.5px] -z-20 transition-all duration-300 group-hover:brightness-110"
        style={{
          borderRadius: `calc(${borderRadius} - 1.5px)`,
          background,
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Component>
  )
}
