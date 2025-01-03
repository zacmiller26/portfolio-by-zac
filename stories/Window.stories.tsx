import type { Meta, StoryObj } from '@storybook/react'

import HomeWindowConfig from '@/app/components/windows/HomeWindow'
import WindowContainer from '@/ui/WindowContainer'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Windows',
  component: HomeWindowConfig.Component,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <WindowContainer className='max-w-[420px] rounded-lg'>
        <div className='p-6'>
          <Story />
        </div>
      </WindowContainer>
    )
  ],
  tags: [],
  argTypes: {},
  args: {}
} satisfies Meta<typeof HomeWindowConfig.Component>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HomeWindow: Story = {
  args: {
    primary: true,
    label: 'Window'
  }
}
