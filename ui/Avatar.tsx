import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Avatar(props: CommonProps) {
  return (
    <div
      className={cn(
        'relative h-12 w-12 rounded-full border border-surface-4 bg-black/20',
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
      {props.children}
    </div>
  )
}
