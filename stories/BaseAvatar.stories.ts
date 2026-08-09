import type { Meta, StoryObj } from '@storybook/vue3'
import { BaseAvatar } from '@praxis/vue'

const meta: Meta<typeof BaseAvatar> = {
  title: 'Base/BaseAvatar',
  component: BaseAvatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'URL of the avatar image' },
    alt: { control: 'text', description: 'Alt text for accessibility' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
  },
}

export default meta
type Story = StoryObj<typeof BaseAvatar>

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Jane Smith',
  },
}
