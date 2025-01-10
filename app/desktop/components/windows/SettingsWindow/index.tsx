import PatternSelector from '@/app/desktop/components/windows/SettingsWindow/PatternSelector'
import ThemeSelector from '@/app/desktop/components/windows/SettingsWindow/ThemeSelector'
import WallpaperSelector from '@/app/desktop/components/windows/SettingsWindow/WallpaperSelector'
import { WindowConfig } from '@/app/desktop/components/windows/types'
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
  return <p className='text-sm font-semibold text-accent-3'>{children}</p>
}

export default windowConfig
