import { cn } from '@/lib/utils'
import { motion, useAnimation } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { forwardRef, useCallback } from 'react'

interface DockIconProps {
  icon: LucideIcon
  onClick: () => void
  isActive: boolean
}

export const DockIcon = forwardRef<HTMLButtonElement, DockIconProps>(
  ({ icon: Icon, onClick, isActive }, ref) => {
    const controls = useAnimation()

    const handleClick = useCallback(() => {
      controls.start({
        y: [0, -10, 0],
        transition: {
          duration: 0.7,
          times: [0, 0.35, 0.7],
          ease: 'easeInOut'
        }
      })
      onClick()
    }, [controls, onClick])

    return (
      <motion.button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'rounded-full p-4 transition-colors',
          !isActive && 'md:hover:bg-indigo-600/20 md:hover:text-indigo-300',
          isActive && 'bg-indigo-600/60'
        )}
        whileHover={{ scale: 1.2 }}
        animate={controls}
        transition={{ type: 'easeInOut', duration: 0.3 }}
      >
        <Icon className='h-6 w-6' />
      </motion.button>
    )
  }
)

// helpful for debugging
DockIcon.displayName = 'DockIcon'
