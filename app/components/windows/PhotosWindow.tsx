import { WindowConfig } from '@/app/components/windows/types'
import { Image } from 'lucide-react'

export const windowConfig: WindowConfig = {
  icon: Image,
  title: 'Home',
  id: 'home',
  Component: PhotosWindow
}

function PhotosWindow() {
  return (
    <div className='space-y-4'>
      <h1 className='text-4xl font-bold'>Photos</h1>
      <p className='text-white/60'>TODO: This</p>
    </div>
  )
}

export default windowConfig
