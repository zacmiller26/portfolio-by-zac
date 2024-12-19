import { WindowConfig } from '@/app/components/windows/types'
import { Home } from 'lucide-react'

export const windowConfig: WindowConfig = {
  icon: Home,
  title: 'Home',
  id: 'home',
  Component: HomeWindow
}

function HomeWindow() {
  return (
    <div className='space-y-4'>
      <h1 className='text-4xl font-bold'>Zac Miller</h1>
      <p className='text-white/60'>TODO: this text.</p>
    </div>
  )
}

export default windowConfig
