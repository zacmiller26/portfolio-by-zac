'use client'

import { WALLPAPER_CONFIG } from '@/lib/config/themeConfig'
import { useAppearanceProvider } from '@/lib/contexts/appearance-context'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type WallpaperType = keyof typeof WALLPAPER_CONFIG

export function Wallpaper() {
  const { wallpaper } = useAppearanceProvider()
  const url = WALLPAPER_CONFIG[wallpaper as WallpaperType]?.url

  if (!url) return null
  return (
    <div
      className={cn(
        'absolute left-0 top-0 z-10 h-full w-full bg-cover bg-bottom bg-no-repeat opacity-10 blur-md'
      )}
      style={{ backgroundImage: `url(${url})` }}
    />
  )
}

export default function WallpaperSelector() {
  const { wallpaper: activeWallpaper, setWallpaper } = useAppearanceProvider()

  return (
    <div className='flex flex-wrap gap-2'>
      {Object.entries(WALLPAPER_CONFIG).map(([wallpaper, { label, url }]) => {
        const isActive = activeWallpaper === wallpaper
        const className = cn(
          'bg-surface-2 text-primary-2 flex h-12 w-20 items-center gap-1.5 rounded-lg border-2 border-transparent text-xs font-semibold opacity-50 transition-opacity duration-100',
          !isActive && 'md:hover:opacity-70',
          isActive &&
            'bg-surface-4 text-primary-0 opacity-1 border-accent-3 shadow'
        )

        return (
          <button
            key={wallpaper}
            onClick={() => setWallpaper(wallpaper as WallpaperType)}
          >
            {url ? (
              <Image
                width={40}
                height={60}
                src={url}
                alt={label}
                className={className}
              />
            ) : (
              <span
                className={cn(
                  className,
                  'inline-flex justify-center px-3 text-center'
                )}
              >
                <span className='opacity-90'>None</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
