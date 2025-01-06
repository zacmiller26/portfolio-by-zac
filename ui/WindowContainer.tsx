import { cn } from '@/lib/utils'

export default function WindowContainer(props: CommonProps) {
  return (
    <div
      className={cn(
        'border-surface-3 relative flex flex-col overflow-hidden rounded-lg border shadow-2xl backdrop-blur-md',
        props.className
      )}
    >
      <div className='bg-surface-2 absolute left-0 top-0 h-full w-full rounded-lg opacity-20' />
      <div className='relative'>{props.children}</div>
    </div>
  )
}
