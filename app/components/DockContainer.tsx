import { cn } from '@/lib/utils'

export default function DockContainer(props: { children: React.ReactNode }) {
  return (
    <div className='fixed bottom-10 left-1/2 z-50 -translate-x-1/2'>
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-indigo-600/70 bg-indigo-600/10 px-4 py-3 backdrop-blur-md',
          'md:hover:border-indigo-600'
        )}
      >
        {props.children}
      </div>
    </div>
  )
}
