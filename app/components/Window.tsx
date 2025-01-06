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
import { type RefObject, useEffect, useMemo, useState } from 'react'

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
  forwardedContainerRef: RefObject<HTMLDivElement | null>
}

export function MacOSWindow({
  children,
  isOpen,
  onClose,
  onMinimize,
  onToggleExpand,
  isMounted,
  title,
  className,
  dockIcon = { x: 0, y: 0, width: 0, height: 0 },
  isExpanded: isExpandedState,
  forwardedContainerRef: containerRef
}: MacOSWindowProps) {
  const dragControls = useDragControls()
  const isMobile = useIsMobile()
  const [isHidden, setIsHidden] = useState(false)

  const isDraggable = !isMobile && isOpen && !isExpandedState
  const isExpanded = isMobile || isExpandedState
  const canBeExpanded = !isMobile

  const calculateDefaultWindowBounds = () => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const parentWidth =
      containerRef.current?.getBoundingClientRect().width || viewportWidth
    const parentHeight =
      containerRef.current?.getBoundingClientRect().height || viewportHeight

    const maxWidth = 500
    const maxHeight = 400

    const desiredWidth = Math.min(maxWidth, viewportWidth * 0.9)
    const desiredHeight = Math.min(maxHeight, viewportHeight * 0.7)

    return {
      x: parentWidth / 2 - desiredWidth / 2,
      y: parentHeight / 2 - desiredHeight / 2,
      width: desiredWidth,
      height: desiredHeight
    }
  }

  const [defaultWindowBounds, setDefaultWindowBounds] = useState(
    calculateDefaultWindowBounds()
  )
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
        pointerEvents: 'none'
      }
    }

    if (isExpanded) {
      return {
        opacity: 1,
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
        scale: 1,
        pointerEvents: 'auto'
      }
    }

    return {
      opacity: 1,
      x: windowBounds.x,
      y: windowBounds.y,
      width: windowBounds.width,
      height: 'auto',
      scale: 1,
      pointerEvents: 'auto'
    }
  }, [isOpen, isExpanded, windowBounds, dockIcon, isMobile])

  const handleControlBarPointerDown = (e: React.PointerEvent) => {
    if (!isDraggable) {
      return
    }

    dragControls.start(e)
  }

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

  // Recalculate bounds on resize if still using default bounds
  useEffect(() => {
    const handleResize = () => {
      const newDefaultBounds = calculateDefaultWindowBounds()
      setDefaultWindowBounds(newDefaultBounds)

      // Only update window bounds if still using the default
      setWindowBounds(prevBounds => {
        if (
          prevBounds.x === defaultWindowBounds.x &&
          prevBounds.y === defaultWindowBounds.y &&
          prevBounds.width === defaultWindowBounds.width &&
          prevBounds.height === defaultWindowBounds.height
        ) {
          return newDefaultBounds
        }
        return prevBounds
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [defaultWindowBounds])

  // set to isHidden after close animation (0.3s)
  useEffect(() => {
    if (isOpen) {
      setIsHidden(false)
      return
    }

    const timeout = setTimeout(() => {
      setIsHidden(true)
    }, 300)

    return () => clearTimeout(timeout)
  }, [isOpen])

  return (
    <motion.div
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
      className={cn(
        'absolute z-0',
        isOpen && 'z-50',
        isHidden && 'hidden',
        isExpanded && 'inset-0',
        className
      )}
    >
      <WindowContainer className={isExpanded ? 'h-full' : ''}>
        <div
          className={cn(
            'border-surface-3 text-primary-4 flex select-none items-center justify-between border-b p-3',
            !isMobile && 'md:hover:text-primary-3 hover:cursor-move'
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
            {canBeExpanded && (
              <button
                onClick={onToggleExpand}
                className='h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600'
              />
            )}
          </div>
          <div className='font-mono text-sm'>{title}</div>
          <div className='w-16' />
        </div>

        <div
          className={cn(
            'overflow-auto p-6',
            isExpanded ? 'h-[calc(100%-40px)]' : ''
          )}
        >
          {isMounted ? children : null}
        </div>
      </WindowContainer>
    </motion.div>
  )
}
