import { WindowConfig } from '@/app/components/windows/types'
import { FULL_NAME } from '@/lib/constants'
import Avatar from '@/ui/Avatar'
import ClickToReveal from '@/ui/ClickToReveal'
import StyledLink from '@/ui/StyledLink'
import StyledList, { StyledListItem } from '@/ui/StyledList'
import { ContactRoundIcon } from 'lucide-react'

const windowConfig: WindowConfig = {
  icon: ContactRoundIcon,
  title: 'Contact',
  id: 'contact',
  Component: ContactWindow
}

function ContactWindow() {
  return (
    <div className='max-w-full space-y-4 md:min-w-[400px]'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-12 w-12 border-0' />
        <div className='flex flex-col gap-0'>
          <h1 className='text-xl font-bold'>{FULL_NAME}</h1>
        </div>
      </div>
      <StyledList>
        <StyledListItem label='LinkedIn'>
          <StyledLink
            external
            href='https://linkedin.com/in/zac-miller'
            className='text-sm'
          >
            /in/zac-miller
          </StyledLink>
        </StyledListItem>
        <StyledListItem label='GitHub'>
          <StyledLink
            external
            href='https://github.com/zacmiller26'
            className='text-sm'
          >
            @zacmiller26
          </StyledLink>
        </StyledListItem>
        <StyledListItem label='Instagram'>
          <StyledLink
            external
            href='https://www.instagram.com/zacmiller26/'
            className='text-sm'
          >
            @zacmiller26
          </StyledLink>
        </StyledListItem>
        <StyledListItem label='Email'>
          <ClickToReveal text='Click to Email Me' className='text-sm'>
            <StyledLink href='mailto:zacmiller72@gmail.com' className='text-sm'>
              zacmiller72@gmail.com
            </StyledLink>
          </ClickToReveal>
        </StyledListItem>
      </StyledList>
    </div>
  )
}

export default windowConfig
