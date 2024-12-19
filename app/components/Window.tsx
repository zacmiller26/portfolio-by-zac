'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

interface MacOSWindowProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
  onToggleExpand: () => void
  isExpanded: boolean
  dockIcon?: {
    x: number
    y: number
    width: number
    height: number
  }
  title: string
  className?: string
}

export function MacOSWindow({
  children,
  isOpen,
  onClose,
  onMinimize,
  onToggleExpand,
  isExpanded,
  dockIcon = { x: 0, y: 0, width: 0, height: 0 },
  title,
  className
}: MacOSWindowProps) {
  const [windowBounds, setWindowBounds] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 - 250 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 150 : 0,
    width: 500,
    height: 300
  })

  const animateProps = useMemo(() => {
    if (!isOpen) {
      return {
        opacity: 0,
        x: dockIcon.x,
        y: dockIcon.y,
        width: dockIcon.width,
        height: dockIcon.height,
        scale: 0.5,
        pointerEvents: 'none' as const
      }
    }

    return {
      opacity: 1,
      x: isExpanded ? 20 : windowBounds.x,
      y: isExpanded ? 20 : windowBounds.y,
      width: isExpanded ? 'calc(100% - 40px)' : windowBounds.width,
      height: isExpanded ? 'calc(100% - 40px - 120px)' : windowBounds.height,
      scale: 1,
      pointerEvents: 'auto' as const
    }
  }, [isOpen, isExpanded, windowBounds, dockIcon])

  return (
    <motion.div
      initial={false}
      animate={animateProps}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      drag={isOpen && !isExpanded}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (isOpen && !isExpanded) {
          setWindowBounds(prev => ({
            ...prev,
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y
          }))
        }
      }}
      className={cn(
        'fixed flex flex-col overflow-hidden rounded-lg border border-indigo-500/40 bg-indigo-950/80 shadow-2xl backdrop-blur-md',
        className
      )}
      style={{ zIndex: isOpen ? 50 : 0 }}
    >
      {/* Window Controls */}
      <div className='flex items-center justify-between border-b border-indigo-500/40 p-3'>
        <div className='flex gap-2'>
          <button
            onClick={onClose}
            className='h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600'
          />
          <button
            onClick={onMinimize}
            className='h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600'
          />
          <button
            onClick={onToggleExpand}
            className='h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600'
          />
        </div>
        <div className='font-mono text-sm text-indigo-200/50'>{title}</div>
        <div className='w-16' /> {/* Spacer to center the title */}
      </div>

      {/* Window Content */}
      <div
        className='overflow-auto p-6'
        style={{ height: 'calc(100% - 40px)' }}
      >
        {children}
      </div>
    </motion.div>
  )
}
