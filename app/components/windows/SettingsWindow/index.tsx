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
      <SelectorContainer>
        <SelectorLabel>Theme</SelectorLabel>
        <ThemeSelector />
      </SelectorContainer>

      <SelectorContainer>
        <SelectorLabel>Pattern</SelectorLabel>
        <PatternSelector />
      </SelectorContainer>

      <SelectorContainer>
        <SelectorLabel>Wallpaper</SelectorLabel>
        <WallpaperSelector />
      </SelectorContainer>
    </div>
  )
}

function SelectorContainer({ children }: CommonProps) {
  return <div className='space-y-2'>{children}</div>
}

function SelectorLabel({ children }: CommonProps) {
  return <p className='text-accent-3 text-sm font-semibold'>{children}</p>
}

export default windowConfig
