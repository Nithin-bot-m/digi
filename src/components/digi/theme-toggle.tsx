'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({
  className,
  isLight = false,
}: {
  className?: string
  isLight?: boolean
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn('h-10 w-10 rounded-full', className)}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
        isLight
          ? 'border-ink/15 bg-ink/5 text-ink hover:bg-ink/10 hover:border-ink/25 shadow-sm'
          : 'border-white/15 bg-white/5 text-mist hover:bg-white/10 hover:border-white/25 shadow-inner',
        className,
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          'h-[18px] w-[18px] transition-all duration-300',
          isDark
            ? 'scale-0 rotate-90 opacity-0 absolute'
            : 'scale-100 rotate-0 opacity-100 text-amber-500',
        )}
      />
      <Moon
        className={cn(
          'h-[18px] w-[18px] transition-all duration-300',
          isDark
            ? 'scale-100 rotate-0 opacity-100 text-cyan'
            : 'scale-0 -rotate-90 opacity-0 absolute',
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
