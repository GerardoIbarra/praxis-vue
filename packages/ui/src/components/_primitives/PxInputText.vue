<script setup lang="ts">
import { useId, type Component } from 'vue';
import PxLabel from '@/components/base/PxLabel.vue';

export interface PxInputTextProps {
  /** The value of the input */
  modelValue?: string | number;
  /** The label text */
  label?: string;
  /** An error message. Changes input to error state. */
  error?: string;
  /** Hint text to display below the input */
  hint?: string;
  /** Input type, defaults to text */
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  /** Native disabled state */
  disabled?: boolean;
  /** Native readonly state */
  readonly?: boolean;
  /** Mark field as required */
  required?: boolean;
  /** Left icon component */
  iconLeft?: Component;
  /** Right icon component */
  iconRight?: Component;
  /** Placeholder text */
  placeholder?: string;
  /** Native autocomplete attribute */
  autocomplete?: string;
  /** Number min */
  min?: string | number;
  /** Number max */
  max?: string | number;
  /** Number step */
  step?: string | number;
  /** Max length */
  maxlength?: string | number;
}

const props = withDefaults(defineProps<PxInputTextProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
}>();

const inputId = useId();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full text-left">
    <PxLabel 
      v-if="label" 
      :label="label" 
      :for="inputId" 
      :required="required" 
      class="mb-0" 
    />
    
    <div class="relative flex items-center w-full">
      <component 
        :is="iconLeft" 
        v-if="iconLeft" 
        class="absolute left-3 w-5 h-5 transition-colors pointer-events-none" 
        :class="error ? 'text-red-500' : 'text-surface-400 dark:text-surface-500'" 
      />
      
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        @input="updateValue"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        class="w-full h-11 px-3 py-2 text-surface-900 dark:text-surface-50 bg-surface-0 dark:bg-surface-900 border rounded-lg outline-none transition-all duration-200 placeholder:text-surface-400 dark:placeholder:text-surface-500"
        :class="[
          iconLeft ? 'pl-10' : '',
          iconRight ? 'pr-10' : '',
          error 
            ? 'border-red-500 hover:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : 'border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
          disabled ? 'opacity-60 bg-surface-100 dark:bg-surface-800 cursor-not-allowed pointer-events-none' : '',
          readonly && !disabled ? 'bg-surface-50 dark:bg-surface-800/50' : ''
        ]"
      />
      
      <component 
        :is="iconRight" 
        v-if="iconRight" 
        class="absolute right-3 w-5 h-5 transition-colors pointer-events-none" 
        :class="error ? 'text-red-500' : 'text-surface-400 dark:text-surface-500'" 
      />
    </div>

    <div v-if="error || hint" class="text-sm mt-0.5">
      <p v-if="error" class="text-red-500 font-medium m-0">{{ error }}</p>
      <p v-else-if="hint" class="text-surface-500 dark:text-surface-400 m-0">{{ hint }}</p>
    </div>
  </div>
</template>
