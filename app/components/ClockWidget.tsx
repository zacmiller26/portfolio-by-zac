'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Toggle to include or exclude seconds
const SHOW_SECONDS = false

export function ClockWidget() {
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
    .padStart(
      2,
      '0'
    )}${SHOW_SECONDS ? `:${seconds.toString().padStart(2, '0')}` : ''}`

  return (
    <div className='flex flex-col items-center text-primary-0'>
      <div className='text-lg font-light opacity-70'>{formattedDate}</div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='text-6xl font-light tracking-tighter'
      >
        {formattedTime}
      </motion.div>
    </div>
  )
}
