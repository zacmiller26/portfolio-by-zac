import LoadingSpinner from '@/app/initializing/components/LoadingSpinner'
import { FULL_NAME } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Logging in as ${FULL_NAME}...`
}

export default function Page() {
  return (
    <div className='relative flex min-h-dvh flex-col items-center justify-center p-8 md:py-12'>
      <LoadingSpinner />
    </div>
  )
}
