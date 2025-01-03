import { cn } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

export default function StyledLink({
  children,
  external,
  ...linkProps
}: LinkProps & {
  children?: React.ReactNode
  href: string
  className?: string
  external?: boolean
}) {
  return (
    <Link
      {...linkProps}
      className={cn(
        'text-accent-3 inline-flex items-center gap-1',
        external && 'md:hover:underline',
        linkProps.className
      )}
      target={external ? '_blank' : undefined}
    >
      {external && <ExternalLinkIcon className='block h-4 w-4 opacity-50' />}
      {children ?? linkProps.href}
    </Link>
  )
}
