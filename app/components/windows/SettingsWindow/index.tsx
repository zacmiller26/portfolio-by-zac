import PatternSelector from '@/app/components/windows/SettingsWindow/PatternSelector'
import ThemeSelector from '@/app/components/windows/SettingsWindow/ThemeSelector'
import WallpaperSelector from '@/app/components/windows/SettingsWindow/WallpaperSelector'
import { WindowConfig } from '@/app/components/windows/types'
import { CogIcon } from 'lucide-react'

export const windowConfig: WindowConfig = {
  icon: CogIcon,
  title: 'Settings',
  id: 'settings',
  Component: SettingsWindow
}

function SettingsWindow() {
  return (
    <div className='space-y-6'>
      <p className='text-primary-1'>Theme</p>
      <ThemeSelector />

      <p className='text-primary-1'>Pattern</p>
      <PatternSelector />

      <p className='text-primary-1'>Wallpaper</p>
      <WallpaperSelector />
    </div>
  )
}

export default windowConfig
