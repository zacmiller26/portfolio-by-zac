'use client'

import DockContainer from '@/app/components/DockContainer'
import { DockIcon } from '@/app/components/DockIcon'
import { MacOSWindow } from '@/app/components/Window'
import { windowConfigs } from '@/app/components/windows'
import { useEffect, useRef, useState } from 'react'

export function Dock() {
  const {
    windowStates,
    activeWindow,
    dockIconRefs,
    dockIconBounds,
    handleIconClick,
    closeWindow,
    minimizeWindow,
    toggleExpandWindow
  } = useDockState(windowConfigs.length)

  return (
    <div className='min-h-screen text-white'>
      {windowConfigs.map((win, index) => (
        // Always render MacOSWindow and its component.
        // We rely on motion animations and isOpen/isExpanded states
        // to visually show/hide instead of unmounting.
        <MacOSWindow
          key={index}
          isOpen={windowStates[index].isOpen}
          isExpanded={windowStates[index].isExpanded}
          title={win.title}
          dockIcon={
            dockIconBounds[index] || { x: 0, y: 0, width: 0, height: 0 }
          }
          onClose={() => closeWindow(index)}
          onMinimize={() => minimizeWindow(index)}
          onToggleExpand={() => toggleExpandWindow(index)}
        >
          <win.Component />
        </MacOSWindow>
      ))}

      <DockContainer>
        {windowConfigs.map((win, index) => (
          <DockIcon
            key={index}
            icon={win.icon}
            onClick={() => handleIconClick(index)}
            isActive={activeWindow === index}
            ref={(el: HTMLButtonElement | null) => {
              dockIconRefs.current[index] = el
            }}
          />
        ))}
      </DockContainer>
    </div>
  )
}

interface WindowState {
  isOpen: boolean
  isExpanded: boolean
}

export function useDockState(windowCount: number) {
  const [windowStates, setWindowStates] = useState<WindowState[]>(
    Array.from({ length: windowCount }, () => ({
      isOpen: false,
      isExpanded: false
    }))
  )
  const [activeWindow, setActiveWindow] = useState<number | null>(null)

  const dockIconRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [dockIconBounds, setDockIconBounds] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([])

  useEffect(() => {
    const updateDockIconBounds = () => {
      const newBounds = dockIconRefs.current.map(ref => {
        if (!ref) return { x: 0, y: 0, width: 0, height: 0 }
        const rect = ref.getBoundingClientRect()
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
      })
      setDockIconBounds(newBounds)
    }

    updateDockIconBounds()
    window.addEventListener('resize', updateDockIconBounds)
    return () => window.removeEventListener('resize', updateDockIconBounds)
  }, [])

  const openWindow = (index: number) => {
    setWindowStates(prev => {
      const newStates = [...prev]
      newStates[index].isOpen = true
      return newStates
    })
    setActiveWindow(index)
  }

  const closeWindow = (index: number) => {
    setWindowStates(prev => {
      const newStates = [...prev]
      newStates[index].isOpen = false
      return newStates
    })
    if (activeWindow === index) setActiveWindow(null)
  }

  const minimizeWindow = (index: number) => {
    setWindowStates(prev => {
      const newStates = [...prev]
      newStates[index].isOpen = false
      return newStates
    })
    if (activeWindow === index) setActiveWindow(null)
  }

  const toggleExpandWindow = (index: number) => {
    setWindowStates(prev =>
      prev.map((state, i) =>
        i === index ? { ...state, isExpanded: !state.isExpanded } : state
      )
    )
  }

  const handleIconClick = (index: number) => {
    const isCurrentlyActive = activeWindow === index
    if (isCurrentlyActive) {
      // Minimize if already active
      minimizeWindow(index)
      return
    }

    // Minimize currently active window if different
    if (activeWindow !== null && activeWindow !== index) {
      minimizeWindow(activeWindow)
    }

    openWindow(index)
  }

  return {
    windowStates,
    activeWindow,
    dockIconRefs,
    dockIconBounds,
    handleIconClick,
    closeWindow,
    minimizeWindow,
    toggleExpandWindow
  }
}
