import { cn } from '@/lib/utils'

type StyledListItemProps = CommonProps<{
  children: React.ReactNode
  label: string
}>

type StyledList = CommonProps<{
  children: React.ReactElement<StyledListItemProps>[]
}>

export default function StyledList(props: CommonProps) {
  return (
    <ul className={cn('flex list-none flex-col gap-1', props.className)}>
      {props.children}
    </ul>
  )
}

export function StyledListItem(props: StyledListItemProps) {
  return (
    <li
      className={cn(
        'text-primary-1 flex gap-6 border-b border-white/10 py-4 pl-0',
        'last:border-b-0',
        props.className
      )}
    >
      <span className='flex-1 font-semibold'>{props.label}</span>
      <span className='inline-block'>{props.children}</span>
    </li>
  )
}
