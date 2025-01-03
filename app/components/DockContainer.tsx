import { cn } from '@/lib/utils'

export default function DockContainer(props: { children: React.ReactNode }) {
  return (
    <div className='fixed bottom-10 left-1/2 z-50 -translate-x-1/2'>
      <div
        className={cn(
          'border-surface-3 bg-surface-1 flex items-center gap-3 rounded-2xl border p-2 backdrop-blur-md'
        )}
      >
        {props.children}
      </div>
    </div>
  )
}
