'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const INITIALIZING_STAGES = ['Initializing profile...']

export default function LoadingSpinner() {
  const router = useRouter()

  const [currentStage, setCurrentStage] = useState(0)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [showFallbackLink, setShowFallbackLink] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prevStage => {
        if (prevStage < INITIALIZING_STAGES.length - 1) {
          return prevStage + 1
        } else {
          setShowCheckmark(true)
          clearInterval(timer)

          // Trigger redirect
          const redirectAfterMs = 1200
          setTimeout(() => router.push('/desktop'), redirectAfterMs)
          // Show fallback link if redirect fails after 5 seconds
          setTimeout(() => setShowFallbackLink(true), redirectAfterMs + 5000)

          return prevStage
        }
      })
    }, 1500) // Change message every 1.5 seconds

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className='flex flex-col items-center justify-center space-y-6'>
      <AnimatePresence mode='wait'>
        {!showCheckmark ? (
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='text-center text-lg font-medium text-primary-2'
          >
            {INITIALIZING_STAGES[currentStage]}
          </motion.div>
        ) : showFallbackLink ? (
          <></>
        ) : (
          <motion.div
            key='checkmark'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='text-accent-3'
          >
            <Check size={50} strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback Enter Link */}
      {showFallbackLink && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='mt-4'
        >
          <Link href='/desktop' className='font-semibold text-primary-1'>
            Enter
          </Link>
        </motion.div>
      )}
    </div>
  )
}
