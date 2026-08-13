import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PxLoader from './PxLoader.vue'

describe('PxLoader.vue', () => {
  it('renders default message in standard mode', () => {
    const wrapper = mount(PxLoader)
    
    // It should render "Loading..." by default
    expect(wrapper.text()).toContain('Loading...')
    
    // It should NOT render the fullscreen overlay
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('renders correctly in fullscreen mode with custom messages', () => {
    const wrapper = mount(PxLoader, {
      props: {
        fullscreen: true,
        message: 'Processing payment',
        subMessage: 'Do not close this window'
      }
    })
    
    // Should render the fullscreen overlay
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)
    
    // Should render custom texts
    expect(wrapper.text()).toContain('Processing payment')
    expect(wrapper.text()).toContain('Do not close this window')
  })
})
