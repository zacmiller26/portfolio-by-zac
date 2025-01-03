import { cn } from '@/lib/utils'

export default function WindowContainer(props: CommonProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-indigo-500/40 bg-indigo-950/80 shadow-2xl backdrop-blur-md',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
