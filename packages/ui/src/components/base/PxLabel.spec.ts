import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PxLabel from './PxLabel.vue'

describe('PxLabel.vue', () => {
  it('renders the label text correctly', () => {
    const wrapper = mount(PxLabel, {
      props: {
        label: 'My Custom Label'
      }
    })
    
    expect(wrapper.text()).toContain('My Custom Label')
    // By default required is false, so it shouldn't render the asterisk
    expect(wrapper.find('.px-label-required').exists()).toBe(false)
  })

  it('renders the required asterisk when required is true', () => {
    const wrapper = mount(PxLabel, {
      props: {
        label: 'Required Label',
        required: true
      }
    })
    
    expect(wrapper.find('.px-label-required').exists()).toBe(true)
    expect(wrapper.find('.px-label-required').text()).toBe('*')
  })

  it('applies the for attribute correctly', () => {
    const wrapper = mount(PxLabel, {
      props: {
        label: 'Username',
        for: 'username-input'
      }
    })
    
    expect(wrapper.attributes('for')).toBe('username-input')
  })
})
