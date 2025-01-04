import ThemeSelector from '@/app/components/windows/SettingsWindow/ThemeSelector'
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
    <div className='space-y-4'>
      <p className='text-primary-1'>Theme</p>
      <ThemeSelector />
    </div>
  )
}

export default windowConfig
