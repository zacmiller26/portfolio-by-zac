'use client'

import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { cn } from '@/lib/utils'
import { Fan, Flame, Lightbulb, Moon, Shell } from 'lucide-react'
import { useEffect } from 'react'
import { z } from 'zod'

const THEME_META = {
  midnight: {
    label: 'Midnight',
    icon: Moon
  },
  ember: {
    label: 'Ember',
    icon: Flame
  },
  ocean: {
    label: 'Ocean',
    icon: Shell
  },
  smoke: {
    label: 'Smoke',
    icon: Fan
  },
  light: {
    label: 'Light',
    icon: Lightbulb
  }
}
const THEMES = Object.keys(THEME_META)
const DEFAULT_THEME = THEMES[0]

type THEME_VAL = (typeof THEMES)[number]

const themeSchema = z
  .string()
  .refine(value => THEMES.includes(value), { message: 'Invalid theme value' })

export default function ThemeSelector() {
  const [activeTheme, setActiveTheme] = useAppTheme()

  const handleClick = (theme: THEME_VAL) => {
    document.documentElement.setAttribute('data-theme', theme)
    setActiveTheme(theme)
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {Object.entries(THEME_META).map(([theme, { icon, label }]) => {
        const isActive = activeTheme === theme
        const Icon = icon

        return (
          <button
            key={theme}
            onClick={() => handleClick(theme)}
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

const useAppTheme = () => {
  return useLocalStorage('theme', DEFAULT_THEME, themeSchema)
}

export const SetInitialTheme = () => {
  const [activeTheme] = useAppTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme)
  }, [activeTheme])

  return null
}
