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
      <p className='text-primary-3'>
        {FIRST_NAME} is a full-stack developer who{' '}
        <em>specializes in front-end</em>, with {totalYearsOfExp}+ years of
        experience turning ideas into impactful products.
        <br />
        <br />H{"e's"} conceptualized and built a gaming platform used by 70M+
        users, and led the front-end overhaul of a flagship product in an
        industry-leading enterprise.
      </p>
    </div>
  )
}

export default windowConfig
