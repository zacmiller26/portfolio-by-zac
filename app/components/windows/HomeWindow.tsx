import { WindowConfig } from '@/app/components/windows/types'
import { FIRST_NAME, FULL_NAME, TITLE } from '@/lib/constants'
import { yearsSince } from '@/lib/utils'
import Avatar from '@/ui/Avatar'
import { Home } from 'lucide-react'

export const windowConfig: WindowConfig = {
  icon: Home,
  title: 'Home',
  id: 'home',
  Component: HomeWindow
}

const totalYearsOfExp = yearsSince('2010-04-11')

function HomeWindow() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-24 w-24' />
        <div className='flex flex-col gap-0'>
          <h1 className='text-4xl font-extrabold'>{FULL_NAME}</h1>
          <div className='flex flex-col gap-0'>
            <h3 className='text-accent-3 font-mono text-sm font-semibold leading-4 tracking-wider'>
              {TITLE}
            </h3>
          </div>
        </div>
      </div>
      <div className='text-primary-3 flex flex-col gap-3'>
        <p>
          Hi, {"I'm"} {FIRST_NAME} — a <strong>front-end specialist</strong>{' '}
          passionate about crafting dynamic, scalable interfaces and delivering
          full-stack solutions. With {totalYearsOfExp}+ years of experience,
          I've transformed ideas into impactful, user-focused products.
        </p>
        <p>
          Some of my favorite projects include conceptualizing and building a
          gaming platform that generated <em>over</em> a billion page views, and
          leading the front-end overhaul of a flagship product for an
          industry-leading enterprise.
        </p>
      </div>
    </div>
  )
}

export default windowConfig
