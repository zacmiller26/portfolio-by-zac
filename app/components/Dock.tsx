'use client'

import DockContainer from '@/app/components/DockContainer'
import { DockIcon } from '@/app/components/DockIcon'
import { MacOSWindow } from '@/app/components/Window'
import { windowConfigs } from '@/app/components/windows'
import { useCallback, useEffect, useRef, useState } from 'react'

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

  // On mount, open the first window after a few seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleIconClick(0)
    }, 1000)

    return () => clearTimeout(timeout)

    // Don't include handleIconClick in deps, we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='min-h-screen text-white'>
      {windowConfigs.map((win, index) => {
        return (
          <MacOSWindow
            key={index}
            isOpen={windowStates[index].isOpen}
            isExpanded={windowStates[index].isExpanded}
            isMounted={windowStates[index].isMounted}
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
        )
      })}

      <DockContainer>
        {windowConfigs.map((win, index) => (
          <DockIcon
            key={index}
            icon={win.icon}
            onClick={() => handleIconClick(index)}
            isMounted={windowStates[index].isMounted}
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
  isMounted: boolean
}

export function useDockState(windowCount: number) {
  const [windowStates, setWindowStates] = useState<WindowState[]>(
    Array.from({ length: windowCount }, () => ({
      isOpen: false,
      isExpanded: false,
      isMounted: false
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
      newStates[index].isMounted = true
      return newStates
    })
    setActiveWindow(index)
  }

  const closeWindow = (index: number) => {
    setWindowStates(prev => {
      const newStates = [...prev]
      newStates[index].isOpen = false
      newStates[index].isMounted = false
      return newStates
    })
    if (activeWindow === index) setActiveWindow(null)
  }

  const minimizeWindow = useCallback(
    (index: number) => {
      setWindowStates(prev => {
        const newStates = [...prev]
        newStates[index].isOpen = false
        return newStates
      })
      if (activeWindow === index) setActiveWindow(null)
    },
    [setWindowStates, activeWindow]
  )

  const toggleExpandWindow = (index: number) => {
    setWindowStates(prev =>
      prev.map((state, i) =>
        i === index ? { ...state, isExpanded: !state.isExpanded } : state
      )
    )
  }

  const handleIconClick = useCallback(
    (index: number) => {
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
    },
    [activeWindow, minimizeWindow]
  )

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
