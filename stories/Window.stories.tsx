import type { Meta, StoryObj } from '@storybook/react'

import AppsWindowConfig from '@/app/components/windows/AppsWindow'
import ContactWindowConfig from '@/app/components/windows/ContactWindow'
import HomeWindowConfig from '@/app/components/windows/HomeWindow'
import SettingsWindowConfig from '@/app/components/windows/SettingsWindow'
import AppearanceProvider from '@/lib/contexts/appearance-context'
import WindowContainer from '@/ui/WindowContainer'

const meta = {
  title: 'Example/Windows',
  component: HomeWindowConfig.Component,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <AppearanceProvider>
        <WindowContainer className='max-w-[500px] rounded-lg'>
          <div className='p-6'>
            <Story />
          </div>
        </WindowContainer>
      </AppearanceProvider>
    )
  ],
  tags: [],
  argTypes: {},
  args: {}
} satisfies Meta<typeof HomeWindowConfig.Component>

export default meta
type Story = StoryObj<typeof meta>

export const HomeWindow: Story = {
  args: {
    primary: true,
    label: 'Window'
  }
}

export const ContactWindow: Story = {
  render: () => <ContactWindowConfig.Component />
}

export const SettingsWindow: Story = {
  render: () => <SettingsWindowConfig.Component />
}

export const AppsWindow: Story = {
  render: () => <AppsWindowConfig.Component />
}
