import type { Meta, StoryObj } from '@storybook/vue3'
import { WordgardEditor } from '@praxis/editor'

const meta: Meta<typeof WordgardEditor> = {
  title: 'Editor/WordgardEditor',
  component: WordgardEditor,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'HTML content (v-model)' },
    placeholder: { control: 'text', description: 'Placeholder text when empty' },
    readOnly: { control: 'boolean', description: 'Toggles read-only mode' },
    minHeight: { control: 'text', description: 'Min height of the editor' },
    maxHeight: { control: 'text', description: 'Max height of the editor' },
    toolbarGroups: {
      control: { type: 'multi-select' },
      options: ['commands', 'inline', 'block', 'insert'],
      description: 'Which toolbar groups to show',
    },
  },
}

export default meta
type Story = StoryObj<typeof WordgardEditor>

export const Default: Story = {
  args: {
    modelValue: '<p>Start writing here...</p>',
    placeholder: 'Write something...',
    readOnly: false,
    minHeight: '120px',
    maxHeight: '300px',
    toolbarGroups: ['commands', 'inline', 'block', 'insert'],
  },
}

export const ReadOnly: Story = {
  args: {
    modelValue: '<p>This content is <strong>read only</strong>.</p>',
    readOnly: true,
  },
}

export const Minimal: Story = {
  args: {
    modelValue: '',
    placeholder: 'Enter notes...',
    toolbarGroups: ['inline'],
    minHeight: '80px',
    maxHeight: '200px',
  },
}
