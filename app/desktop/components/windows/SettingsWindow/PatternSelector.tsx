'use client'

import { PATTERN_CONFIG } from '@/lib/config/themeConfig'
import { useAppearanceProvider } from '@/lib/contexts/appearance-context'
import { cn } from '@/lib/utils'

type PatternType = keyof typeof PATTERN_CONFIG

export function Pattern() {
  const { pattern } = useAppearanceProvider()
  const className = PATTERN_CONFIG[pattern as PatternType]?.className

  return (
    <div
      className={cn(`absolute inset-0 left-0 top-0 h-full w-full`, className)}
    />
  )
}

export default function PatternSelector() {
  const { pattern: activeWallpaper, setPattern } = useAppearanceProvider()

  return (
    <div className='flex flex-wrap gap-2'>
      {Object.entries(PATTERN_CONFIG).map(
        ([pattern, { label, previewClassName }]) => {
          const isActive = activeWallpaper === pattern
          return (
            <button
              key={pattern}
              onClick={() => setPattern(pattern as PatternType)}
              className={cn(
                'bg-surface-2 text-primary-2 flex items-center gap-1.5 rounded-md border-2 border-transparent text-xs font-semibold',
                !isActive && 'md:hover:bg-surface-3',
                isActive && 'bg-surface-4 border-accent-3 text-primary-0 shadow'
              )}
            >
              {previewClassName && (
                <span
                  className={cn(
                    'inset-0 block h-12 w-12 rounded-md',
                    previewClassName
                  )}
                />
              )}
              {!previewClassName && (
                <span className='px-2 opacity-50'>{label}</span>
              )}
            </button>
          )
        }
      )}
    </div>
  )
}
