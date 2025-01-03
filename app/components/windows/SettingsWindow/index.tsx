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
      <h1 className='text-4xl font-bold'>Settings</h1>
      <p className='text-white/60'>Theme</p>
    </div>
  )
}

export default windowConfig
