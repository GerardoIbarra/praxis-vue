import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PxCheckbox from './PxCheckbox.vue'

describe('PxCheckbox.vue', () => {
  it('toggles value and emits events in binary mode', async () => {
    const wrapper = mount(PxCheckbox, {
      props: {
        binary: true,
        modelValue: false
      }
    })
    
    // Simulate click on the wrapper
    await wrapper.trigger('click')
    
    // Should emit update:modelValue with true
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    
    // Should emit change event
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([true])
  })

  it('does not emit events when disabled', async () => {
    const wrapper = mount(PxCheckbox, {
      props: {
        binary: true,
        modelValue: false,
        disabled: true
      }
    })
    
    await wrapper.trigger('click')
    
    // Should NOT emit events
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })
})
