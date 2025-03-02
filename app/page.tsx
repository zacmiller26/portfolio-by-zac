import { ClockWidget } from '@/app/components/ClockWidget'
import LockScreen from '@/app/components/LockScreen'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Portfolio'
}

export default function Page() {
  return (
    <div className='relative flex min-h-dvh flex-col items-center justify-center p-8 md:py-12'>
      <ClockWidget />
      <LockScreen />
    </div>
  )
}
