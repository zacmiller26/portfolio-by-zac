import { WindowConfig } from '@/app/components/windows/types'
import { RocketIcon } from 'lucide-react'

export const windowConfig: WindowConfig = {
  icon: RocketIcon,
  title: 'Code Examples',
  id: 'apps',
  Component: AppsWindow
}

function AppsWindow() {
  return (
    <div className='space-y-4'>
      <h1 className='text-4xl font-bold'>Apps</h1>
      <p className='text-primary-1'>TODO: This</p>
    </div>
  )
}

export default windowConfig
