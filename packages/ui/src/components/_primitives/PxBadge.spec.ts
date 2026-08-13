import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PxBadge from './PxBadge.vue'

describe('PxBadge.vue', () => {
  it('renders the default slot text', () => {
    const wrapper = mount(PxBadge, {
      slots: {
        default: 'New'
      }
    })
    
    expect(wrapper.text()).toContain('New')
  })

  it('renders the value prop if no slot is provided', () => {
    const wrapper = mount(PxBadge, {
      props: {
        value: 42
      }
    })
    
    expect(wrapper.text()).toContain('42')
  })

  it('applies the primary severity class by default', () => {
    const wrapper = mount(PxBadge)
    expect(wrapper.classes()).toContain('px-badge--primary')
  })

  it('applies the correct dynamic severity class', () => {
    const wrapper = mount(PxBadge, {
      props: {
        severity: 'success'
      }
    })
    
    expect(wrapper.classes()).toContain('px-badge--success')
  })
})
