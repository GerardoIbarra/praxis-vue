import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PxCard from './PxCard.vue'

describe('PxCard.vue', () => {
  it('renders the title and subtitle correctly', () => {
    const wrapper = mount(PxCard, {
      props: {
        title: 'User Profile',
        subtitle: 'Manage your settings'
      }
    })
    
    expect(wrapper.text()).toContain('User Profile')
    expect(wrapper.text()).toContain('Manage your settings')
  })

  it('renders default slot content', () => {
    const wrapper = mount(PxCard, {
      slots: {
        default: '<div class="test-content">Card Content</div>'
      }
    })
    
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Card Content')
  })

  it('changes layout when isMetric is true', () => {
    const wrapper = mount(PxCard, {
      props: {
        isMetric: true
      }
    })
    
    // Metric cards have a specific flex layout and padding
    expect(wrapper.classes()).toContain('p-5')
    expect(wrapper.classes()).toContain('justify-between')
    expect(wrapper.classes()).not.toContain('flex-col')
  })
})
