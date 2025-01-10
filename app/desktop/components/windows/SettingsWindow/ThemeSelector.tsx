'use client'

import { THEME_CONFIG } from '@/lib/config/themeConfig'
import { useAppearanceProvider } from '@/lib/contexts/appearance-context'
import { cn } from '@/lib/utils'

export default function ThemeSelector() {
  const { theme: activeTheme, setTheme } = useAppearanceProvider()

  return (
    <div className='flex flex-wrap gap-2'>
      {Object.entries(THEME_CONFIG).map(([theme, { icon, label }]) => {
        const isActive = activeTheme === theme
        const Icon = icon

        return (
          <button
            key={theme}
            onClick={() => setTheme(theme)}
            className={cn(
              'bg-surface-2 text-primary-2 flex items-center gap-1.5 rounded-md p-2 pr-3 text-xs font-semibold',
              !isActive && 'md:hover:bg-surface-3',
              isActive && 'bg-surface-4 text-primary-0 shadow'
            )}
          >
            <Icon className='h-4 w-4 opacity-50' />
            {label}
          </button>
        )
      })}
    </div>
  )
}
