'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LockOpen } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TopBar() {
  return (
    <div className='relative w-full px-4 py-1.5 text-xs text-primary-3 shadow-md'>
      <div className='absolute left-0 top-0 h-full w-full bg-surface-2 opacity-40' />
      <div className='relative flex items-center gap-1'>
        <div className='flex flex-1 items-center gap-2'>
          <Link
            href='/'
            className={cn(
              'flex cursor-pointer items-center gap-1 rounded-lg bg-white/10 p-1.5 transition-colors duration-150',
              'md:hover:bg-surface-4 md:hover:text-primary-1'
            )}
          >
            <LockOpen className='h-3 w-3 opacity-50' />
          </Link>
        </div>
        <div>
          <TimeDisplay />
        </div>
      </div>
    </div>
  )
}

function TimeDisplay() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(date)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const formattedTime = `${hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:${minutes
    .toString()
    .padStart(2, '0')}`

  const amPm = hours >= 12 ? 'PM' : 'AM'

  return (
    <div className='flex cursor-default items-center gap-1'>
      <div className=''>{formattedDate}</div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className=''
      >
        {formattedTime}
        {amPm}
      </motion.div>
    </div>
  )
}
