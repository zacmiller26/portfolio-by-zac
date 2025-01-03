import { cn } from '@/lib/utils'

export default function WindowContainer(props: CommonProps) {
  return (
    <div
      className={cn(
        'border-surface-3 bg-surface-1 flex flex-col overflow-hidden rounded-lg border shadow-2xl backdrop-blur-md',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
