import { cn } from '@/lib/utils'

export default function DockContainer(props: { children: React.ReactNode }) {
  return (
    <div className='z-50'>
      <div
        className={cn(
          'border-surface-3 relative rounded-2xl border p-2 backdrop-blur-md'
        )}
      >
        <div className='bg-surface-1 absolute left-0 top-0 h-full w-full rounded-2xl opacity-40' />
        <div className='relative flex items-center gap-3'>{props.children}</div>
      </div>
    </div>
  )
}
