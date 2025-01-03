import { WindowConfig } from '@/app/components/windows/types'
import { ContactRoundIcon } from 'lucide-react'

const windowConfig: WindowConfig = {
  icon: ContactRoundIcon,
  title: 'Contact',
  id: 'contact',
  Component: ContactWindow
}

function ContactWindow() {
  return (
    <div className='space-y-4'>
      <h1 className='text-4xl font-bold'>Contact</h1>
      <p className='text-white/60'>TODO: This</p>
    </div>
  )
}

export default windowConfig
