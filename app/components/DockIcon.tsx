import { cn } from '@/lib/utils'
import { motion, useAnimation } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { forwardRef, useCallback } from 'react'

interface DockIconProps {
  icon: LucideIcon
  onClick: () => void
  isActive: boolean
  isMounted: boolean
}

export const DockIcon = forwardRef<HTMLButtonElement, DockIconProps>(
  ({ icon: Icon, onClick, isActive, isMounted }, ref) => {
    const controls = useAnimation()

    const handleClick = useCallback(() => {
      controls.start({
        y: [0, -10, 0],
        transition: {
          duration: 0.7,
          times: [0, 0.25, 0.5],
          ease: 'easeInOut'
        }
      })
      onClick()
    }, [controls, onClick])

    return (
      <div className='relative'>
        <motion.button
          ref={ref}
          onClick={handleClick}
          className={cn(
            'relative rounded-full p-4 transition-colors',
            !isActive && 'md:hover:bg-indigo-600/20 md:hover:text-indigo-300',
            isActive && 'bg-indigo-600/60'
          )}
          whileHover={{ scale: 1.2 }}
          animate={controls}
          transition={{ type: 'easeInOut', duration: 0.3 }}
        >
          <Icon className='h-6 w-6' />
        </motion.button>
        <MountedIndicator show={isMounted} />
      </div>
    )
  }
)

function MountedIndicator(props: { show: boolean }) {
  return (
    <div
      className={cn(
        'absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-white/40 opacity-0 shadow transition-opacity duration-200',
        props.show && 'opacity-100'
      )}
    />
  )
}

// helpful for debugging
DockIcon.displayName = 'DockIcon'
