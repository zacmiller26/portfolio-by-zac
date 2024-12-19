import { WindowConfig } from '@/app/components/windows/types'
import { PersonStandingIcon } from 'lucide-react'

const windowConfig: WindowConfig = {
  icon: PersonStandingIcon,
  title: 'About',
  id: 'about',
  Component: AboutWindow
}

function AboutWindow() {
  return (
    <div className='space-y-4'>
      <h1 className='text-4xl font-bold'>About</h1>
      <p className='text-white/60'>TODO: This text</p>
    </div>
  )
}

export default windowConfig
