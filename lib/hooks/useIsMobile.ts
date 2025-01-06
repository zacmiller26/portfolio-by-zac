import { useEffect, useState } from 'react'

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkIfMobile = () => {
      if (typeof window !== 'undefined') {
        const isTouchDevice =
          'ontouchstart' in window || navigator.maxTouchPoints > 0
        const isSmallScreen = window.innerWidth <= 768 // You can adjust this threshold
        setIsMobile(isTouchDevice || isSmallScreen)
      }
    }

    checkIfMobile()

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIfMobile)
      return () => {
        window.removeEventListener('resize', checkIfMobile)
      }
    }
  }, [])

  return isMobile
}
