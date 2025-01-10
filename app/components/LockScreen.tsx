'use client'

import { FULL_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Avatar from '@/ui/Avatar'
import { ChevronRight, CircleXIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LockScreen() {
  const [selectUser, setSelectUser] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setSelectUser(false)
  }, [pathname])

  return (
    <>
      <div className='flex h-full flex-1 flex-col items-center justify-center py-3'>
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-2',
            !selectUser && 'hidden'
          )}
        >
          <span className='text-xs tracking-wider opacity-50'>
            Select a user
          </span>
          <button
            className={cn(
              'flex items-center gap-3 rounded-lg bg-black/30 p-3 pr-6 text-lg font-semibold transition-colors duration-300 md:hover:bg-black/50'
            )}
            onClick={() => {
              setSelectUser(false)
            }}
          >
            <Avatar
              className={cn(
                'relative h-10 w-10 border-0 shadow transition-shadow duration-300',
                'group-hover:shadow-lg'
              )}
            />
            {FULL_NAME}
          </button>
        </div>
        <Link
          className={cn(
            'group relative flex flex-col items-center gap-4',
            selectUser && 'hidden'
          )}
          prefetch
          href='/initializing'
        >
          <div>
            <Avatar
              className={cn(
                'relative h-32 w-32 border-0 shadow transition-shadow duration-300',
                'group-hover:shadow-lg'
              )}
            >
              <span
                className={cn(
                  'absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-grayscale transition-opacity duration-300',

                  'group-hover:opacity-100'
                )}
              >
                <ChevronRight className='h-10 w-10 text-accent-1' />
              </span>
            </Avatar>
          </div>
          <span className='text-xl font-semibold transition-colors duration-300 group-hover:text-accent-3'>
            {FULL_NAME}
          </span>
        </Link>
      </div>
      <div className='h-32' />
      <div className='flex items-center gap-12'>
        <button
          className={cn(
            'group flex flex-col items-center gap-1 opacity-80 hover:opacity-90',
            selectUser && 'hidden'
          )}
          onClick={() => {
            setSelectUser(true)
          }}
        >
          <span className='flex items-center justify-center rounded-full bg-white/10 p-0.5 group-hover:bg-white/20'>
            <CircleXIcon className='block h-6 w-6 opacity-30' />
          </span>
          <span className='text-xs font-semibold text-primary-1'>Cancel</span>
        </button>
      </div>
    </>
  )
}
