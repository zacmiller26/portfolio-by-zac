'use client'

import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import WindowContainer from '@/ui/WindowContainer'
import {
  type PanInfo,
  motion,
  TargetAndTransition,
  useDragControls
} from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface MacOSWindowProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
  onToggleExpand: () => void
  isExpanded: boolean
  isMounted: boolean
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
  isMounted,
  dockIcon = { x: 0, y: 0, width: 0, height: 0 },
  title,
  className
}: MacOSWindowProps) {
  const dragControls = useDragControls()
  const isMobile = useIsMobile()
  const isDraggable = !isMobile && isOpen && !isExpanded

  const defaultWindowBounds = useMemo(() => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 0, width: 500, height: 300 }
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const maxWidth = 500
    const maxHeight = 400

    const desiredWidth = Math.min(maxWidth, viewportWidth * 0.9)
    const desiredHeight = Math.min(maxHeight, viewportHeight * 0.7)

    return {
      x: viewportWidth / 2 - desiredWidth / 2,
      y: viewportHeight / 2 - desiredHeight / 2,
      width: desiredWidth,
      height: desiredHeight
    }
  }, [])

  const [windowBounds, setWindowBounds] = useState(defaultWindowBounds)

  const animateProps: TargetAndTransition = useMemo(() => {
    if (!isOpen) {
      return {
        opacity: 0,
        x: dockIcon.x,
        y: dockIcon.y,
        width: dockIcon.width,
        height: 'auto',
        scale: 0.5,
        pointerEvents: 'none' as const
      }
    }

    return {
      opacity: 1,
      x: isExpanded ? 0 : windowBounds.x,
      y: isExpanded ? 0 : windowBounds.y,
      width: isExpanded ? '100%' : windowBounds.width,
      height: isExpanded ? '100%' : 'auto',
      scale: 1,
      pointerEvents: 'auto' as const
    }
  }, [isOpen, isExpanded, windowBounds, dockIcon])

  // Trigger the drag start event on the control bar during pointer down
  const handleControlBarPointerDown = (e: React.PointerEvent) => {
    if (!isDraggable) {
      return
    }

    dragControls.start(e)
  }

  // Set the window bounds based on the drag offset when dragging ends
  const handleWindowDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!isDraggable) {
      return
    }

    setWindowBounds(prev => ({
      ...prev,
      x: prev.x + info.offset.x,
      y: prev.y + info.offset.y
    }))
  }

  useEffect(() => {
    if (!isMounted) {
      setWindowBounds(defaultWindowBounds)
    }
  }, [isMounted, defaultWindowBounds])

  return (
    <motion.div
      layout
      animate={animateProps}
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }}
      drag={isDraggable}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={false}
      onDragEnd={handleWindowDragEnd}
      className={cn('fixed z-0', isOpen && 'z-50', className)}
    >
      <WindowContainer>
        {/* Window Control Bar */}
        <div
          className={cn(
            'border-surface-3 flex select-none items-center justify-between border-b p-3',
            !isMobile && 'hover:cursor-move'
          )}
          onPointerDown={handleControlBarPointerDown}
        >
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
          <div className='text-primary-4 font-mono text-sm'>{title}</div>
          <div className='w-16' />
        </div>

        {/* Window Content */}
        <div
          className='overflow-auto p-6'
          style={{ height: 'calc(100% - 40px)' }}
        >
          {isMounted ? children : null}
        </div>
      </WindowContainer>
    </motion.div>
  )
}
