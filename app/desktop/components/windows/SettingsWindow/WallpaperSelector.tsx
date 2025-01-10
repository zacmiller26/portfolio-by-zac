'use client'

import { WALLPAPER_CONFIG } from '@/lib/config/themeConfig'
import { useAppearanceProvider } from '@/lib/contexts/appearance-context'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type WallpaperType = keyof typeof WALLPAPER_CONFIG

export function Wallpaper() {
  const { wallpaper } = useAppearanceProvider()
  const pathname = usePathname()
  const isDesktop = pathname.startsWith('/desktop')
  const url = WALLPAPER_CONFIG[wallpaper as WallpaperType]?.url

  if (!url) return null
  return (
    <div
      className={cn(
        'absolute left-0 top-0 z-0 h-full w-full bg-cover bg-bottom bg-no-repeat opacity-10 transition-transform duration-1000',
        !isDesktop && 'blur-lg'
      )}
      style={{
        backgroundImage: `url(${url})`,
        transition: 'filter 1.5s ease'
      }}
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
          'flex h-12 w-20 items-center gap-1.5 rounded-lg border-2 border-transparent bg-surface-2 text-xs font-semibold text-primary-2 opacity-50 transition-opacity duration-100',
          !isActive && 'md:hover:opacity-70',
          isActive &&
            'opacity-1 border-accent-3 bg-surface-4 text-primary-0 shadow'
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
