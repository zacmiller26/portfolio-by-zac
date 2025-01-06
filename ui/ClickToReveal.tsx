'use client'

import { cn } from '@/lib/utils'
import { MousePointerClick } from 'lucide-react'
import { useState } from 'react'

function ClickToReveal({ text, ...props }: CommonProps<{ text: string }>) {
  const [isRevealed, setIsRevealed] = useState(false)

  const handleReveal = () => {
    setIsRevealed(true)
  }

  return (
    <>
      {isRevealed ? (
        props.children
      ) : (
        <button
          onClick={handleReveal}
          aria-expanded={isRevealed}
          aria-controls='reveal-content'
          className={cn('inline-flex items-center gap-1', props.className)}
        >
          <MousePointerClick className='h-4 w-4 opacity-50' />
          {text}
        </button>
      )}
    </>
  )
}

export default ClickToReveal
