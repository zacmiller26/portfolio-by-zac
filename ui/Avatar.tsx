import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Avatar(props: { className?: string }) {
  return (
    <div
      className={cn(
        'border-surface-4 relative h-12 w-12 rounded-full border bg-black/20',
        props.className
      )}
    >
      <Image
        fill
        src='/thumbnail.jpg'
        sizes='(max-width: 768px) 32'
        alt='Avatar'
        className='rounded-full object-cover object-center'
        style={{
          objectFit: 'cover',
          objectPosition: 'top center'
        }}
      />
    </div>
  )
}
