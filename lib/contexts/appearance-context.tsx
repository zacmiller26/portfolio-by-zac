'use client'

import { Pattern } from '@/app/components/windows/SettingsWindow/PatternSelector'
import { Wallpaper } from '@/app/components/windows/SettingsWindow/WallpaperSelector'
import {
  DEFAULT_PATTERN_KEY,
  DEFAULT_THEME_KEY,
  DEFAULT_WALLPAPER_KEY,
  PATTERN_KEYS,
  PATTERN_OPTION_TYPE,
  THEME_KEYS,
  THEME_OPTION_TYPE,
  WALLPAPER_KEYS,
  WALLPAPER_OPTION_TYPE
} from '@/lib/config/themeConfig'
import useLocalStorage from '@/lib/hooks/useLocalStorage'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react'
import { z } from 'zod'

const INITIAL_CONTEXT = {
  theme: DEFAULT_THEME_KEY,
  pattern: DEFAULT_PATTERN_KEY,
  wallpaper: DEFAULT_WALLPAPER_KEY,
  setTheme: () => {},
  setPattern: () => {},
  setWallpaper: () => {}
}

const Context = createContext<{
  theme: THEME_OPTION_TYPE
  pattern: PATTERN_OPTION_TYPE
  wallpaper: WALLPAPER_OPTION_TYPE
  setTheme: (theme: THEME_OPTION_TYPE) => void
  setPattern: (pattern: PATTERN_OPTION_TYPE) => void
  setWallpaper: (wallpaper: WALLPAPER_OPTION_TYPE) => void
}>(INITIAL_CONTEXT)

const storageStateSchema = z.object({
  theme: z.string().refine(value => THEME_KEYS.includes(value), {
    message: 'Invalid theme'
  }),
  pattern: z.string().refine(value => PATTERN_KEYS.includes(value), {
    message: 'Invalid pattern'
  }),
  wallpaper: z.string().refine(value => WALLPAPER_KEYS.includes(value), {
    message: 'Invalid wallpaper'
  })
})

const initialStorageState = {
  theme: INITIAL_CONTEXT.theme,
  pattern: INITIAL_CONTEXT.pattern,
  wallpaper: INITIAL_CONTEXT.wallpaper
}

export default function AppearanceProvider({ children }: PropsWithChildren) {
  const [storage, setStorage] = useLocalStorage(
    'zm-portfolio-settings',
    initialStorageState,
    storageStateSchema
  )

  const setPattern = useCallback(
    (pattern: PATTERN_OPTION_TYPE) => setStorage({ ...storage, pattern }),
    [storage, setStorage]
  )

  const setTheme = useCallback(
    (theme: THEME_OPTION_TYPE) => {
      setStorage({ ...storage, theme })
    },
    [storage, setStorage]
  )

  const setWallpaper = useCallback(
    (wallpaper: WALLPAPER_OPTION_TYPE) => {
      setStorage({ ...storage, wallpaper })
    },
    [storage, setStorage]
  )

  const exposed = useMemo(
    () => ({
      theme: storage.theme,
      pattern: storage.pattern as PATTERN_OPTION_TYPE,
      wallpaper: storage.wallpaper as WALLPAPER_OPTION_TYPE,
      setPattern,
      setTheme,
      setWallpaper
    }),
    [storage, setPattern, setTheme, setWallpaper]
  )

  return (
    <Context.Provider value={exposed}>
      <SyncAppearance />
      <Pattern />
      <Wallpaper />
      {children}
    </Context.Provider>
  )
}

const SyncAppearance = () => {
  const { theme } = useAppearanceProvider()

  // Sync the theme with the document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return null
}

export const useAppearanceProvider = () => useContext(Context)
