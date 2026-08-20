<script setup lang="ts">
import { ref, computed, useId, watch, nextTick, toRaw } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { ChevronDown, ChevronUp, X } from '@lucide/vue';
import PxLabel from '@/components/base/PxLabel.vue';

export interface PxSelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  _original?: any;
}

export interface PxSelectProps {
  /** The value of the select */
  modelValue?: any;
  /** Array of options to select from */
  options: any[];
  /** The label text */
  label?: string;
  /** An error message. Changes select to error state. */
  error?: string;
  /** Hint text to display below the select */
  hint?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Native disabled state */
  disabled?: boolean;
  /** Mark field as required */
  required?: boolean;
  /** Property to use as the label if options are objects */
  optionLabel?: string;
  /** Property to use as the value if options are objects. Can be a string key or a reduce function. If not provided, the whole object is returned. */
  optionValue?: string | ((option: any) => any);
  /** Allow multiple selections */
  multiple?: boolean;
  /** Enable search input */
  searchable?: boolean;
  /** Allow clearing the selection */
  clearable?: boolean;
  /** Custom filter function */
  filterBy?: (option: any, search: string) => boolean;
}

const props = withDefaults(defineProps<PxSelectProps>(), {
  options: () => [],
  placeholder: 'Select...',
  disabled: false,
  required: false,
  optionLabel: 'label',
  // optionValue defaults to undefined (returns whole object if not provided)
  multiple: false,
  searchable: false,
  clearable: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: any];
  'change': [value: any];
  'search': [value: string];
  'option:selected': [option: any];
  'open': [];
  'close': [];
  'search:blur': [value: string];
}>();

const selectId = useId();
const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchQuery = ref('');

onClickOutside(containerRef, () => {
  if (isOpen.value) {
    isOpen.value = false;
    emit('close');
  }
  if (!props.multiple) {
    searchQuery.value = '';
  }
});

const toggleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      emit('open');
      if (props.searchable) {
        nextTick(() => {
          searchInputRef.value?.focus();
        });
      }
    } else {
      emit('close');
      searchQuery.value = '';
    }
  }
};

const normalizeOption = (option: any): PxSelectOption => {
  if (typeof option === 'object' && option !== null) {
    let val = option;
    if (typeof props.optionValue === 'function') {
      val = props.optionValue(option);
    } else if (typeof props.optionValue === 'string') {
      val = option[props.optionValue];
    }
    
    return {
      label: option[props.optionLabel] ?? String(option),
      value: val,
      disabled: option.disabled || false,
      _original: option
    };
  }
  return {
    label: String(option),
    value: option,
    disabled: false,
    _original: option
  };
};

const normalizedOptions = computed(() => {
  return props.options.map(normalizeOption);
});

const filteredOptions = computed(() => {
  if (!searchQuery.value) return normalizedOptions.value;
  
  if (props.filterBy) {
    return normalizedOptions.value.filter(opt => props.filterBy!(opt._original, searchQuery.value));
  }
  
  const lowerQuery = searchQuery.value.toLowerCase();
  return normalizedOptions.value.filter(opt => 
    opt.label.toLowerCase().includes(lowerQuery)
  );
});

// For single select, it returns the option or undefined.
// For multiple select, it returns an array of selected options.
const selectedOptions = computed(() => {
  if (props.multiple) {
    const valArray = Array.isArray(props.modelValue) ? props.modelValue : [];
    return valArray.map(val => {
      // Find in current options
      const found = normalizedOptions.value.find(opt => toRaw(opt.value) === toRaw(val));
      if (found) return found;
      // If not in options, fallback
      return { label: String(val), value: val };
    });
  } else {
    return normalizedOptions.value.find(opt => toRaw(opt.value) === toRaw(props.modelValue));
  }
});

const isSelected = (option: PxSelectOption) => {
  if (props.multiple) {
    const valArray = Array.isArray(props.modelValue) ? props.modelValue : [];
    return valArray.some(val => toRaw(val) === toRaw(option.value));
  }
  return toRaw(props.modelValue) === toRaw(option.value);
};

const selectOption = (option: PxSelectOption) => {
  if (option.disabled) return;
  
  if (props.multiple) {
    const valArray = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = valArray.findIndex(val => toRaw(val) === toRaw(option.value));
    
    if (index === -1) {
      valArray.push(option.value);
    } else {
      valArray.splice(index, 1);
    }
    
    emit('update:modelValue', valArray);
    emit('change', valArray);
    emit('option:selected', option._original);
    
    // Keep focus on input for continued searching in multiple mode
    if (props.searchable) {
      searchQuery.value = '';
      nextTick(() => {
        searchInputRef.value?.focus();
      });
    }
  } else {
    emit('update:modelValue', option.value);
    emit('change', option.value);
    emit('option:selected', option._original);
    isOpen.value = false;
    emit('close');
    searchQuery.value = '';
  }
};

const removeOption = (event: Event, valueToRemove: any) => {
  event.stopPropagation();
  if (props.disabled) return;
  
  if (props.multiple) {
    const valArray = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = valArray.findIndex(val => toRaw(val) === toRaw(valueToRemove));
    if (index !== -1) {
      valArray.splice(index, 1);
      emit('update:modelValue', valArray);
      emit('change', valArray);
    }
  }
};

const clearSelection = (event: Event) => {
  event.stopPropagation();
  if (props.disabled) return;
  
  const emptyVal = props.multiple ? [] : null;
  emit('update:modelValue', emptyVal);
  emit('change', emptyVal);
};

// Emit search event
watch(searchQuery, (newVal) => {
  emit('search', newVal);
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full text-left relative" ref="containerRef">
    <PxLabel 
      v-if="label" 
      :label="label" 
      :for="selectId" 
      :required="required" 
      class="mb-0" 
    />
    
    <div class="relative w-full">
      <!-- Trigger -->
      <div
        :id="selectId"
        @click="toggleOpen"
        class="w-full min-h-[44px] px-3 py-1.5 text-left flex items-center bg-surface-0 dark:bg-surface-900 border rounded-lg outline-none transition-all duration-200 cursor-pointer"
        :class="[
          error 
            ? 'border-red-500 hover:border-red-600 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20' 
            : 'border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
          disabled ? 'opacity-60 bg-surface-100 dark:bg-surface-800 cursor-not-allowed pointer-events-none' : '',
          isOpen && !error ? 'border-primary-500 ring-2 ring-primary-500/20' : ''
        ]"
      >
        <div class="flex-1 flex flex-wrap items-center gap-1.5 overflow-hidden">
          
          <!-- Selected Items (Multiple) -->
          <template v-if="multiple && (selectedOptions as any[]).length > 0">
            <span 
              v-for="(opt, idx) in (selectedOptions as any[])" 
              :key="idx"
              class="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200 px-2 py-0.5 rounded text-sm font-medium border border-surface-200 dark:border-surface-700"
            >
              <slot name="selected-option" v-bind="opt">
                {{ opt.label }}
              </slot>
              <button 
                type="button"
                @click.stop="(e) => removeOption(e, opt.value)"
                class="hover:bg-surface-200 dark:hover:bg-surface-700 rounded-full p-0.5 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors focus:outline-none"
              >
                <X class="w-3 h-3" />
              </button>
            </span>
          </template>
          
          <!-- Selected Item (Single) -->
          <template v-else-if="!multiple && selectedOptions && !searchQuery && (!isOpen || !searchable)">
            <span class="truncate block w-full text-surface-900 dark:text-surface-50">
              <slot name="selected-option" v-bind="(selectedOptions as any)">
                {{ (selectedOptions as any).label }}
              </slot>
            </span>
          </template>
          
          <!-- Placeholder (When empty and not searching) -->
          <template v-if="(!searchQuery && (!selectedOptions || (multiple && (selectedOptions as any[]).length === 0))) && (!isOpen || !searchable)">
            <span class="text-surface-400 dark:text-surface-500 truncate w-full">
              {{ placeholder }}
            </span>
          </template>
          
          <!-- Search Input -->
          <input 
            v-if="searchable && (isOpen || (!selectedOptions && !multiple))"
            ref="searchInputRef"
            type="text"
            v-model="searchQuery"
            class="flex-1 bg-transparent border-none outline-none text-surface-900 dark:text-surface-50 min-w-[50px] p-0 m-0 focus:ring-0"
            :placeholder="(!selectedOptions || (multiple && (selectedOptions as any[]).length === 0)) ? placeholder : (!multiple && selectedOptions ? (selectedOptions as any).label : '')"
            @click.stop
            @blur="$emit('search:blur', searchQuery)"
          />
        </div>
        
        <!-- Controls Right -->
        <div class="flex items-center gap-1 shrink-0 ml-1">
          <button
            v-if="clearable && ((multiple && (selectedOptions as any[]).length > 0) || (!multiple && selectedOptions)) && !disabled"
            type="button"
            @click.stop="clearSelection"
            class="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 p-0.5 focus:outline-none transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
          <component 
            :is="isOpen ? ChevronUp : ChevronDown" 
            class="w-5 h-5 transition-transform duration-200"
            :class="error ? 'text-red-500' : 'text-surface-400'"
          />
        </div>
      </div>
      
      <!-- Dropdown -->
      <Transition name="select-dropdown">
        <div 
          v-if="isOpen"
          class="absolute z-[100] w-full mt-1 bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg shadow-xl max-h-60 overflow-auto flex flex-col"
        >
          <!-- Custom Header Slot -->
          <slot name="list-header"></slot>
          
          <ul class="py-1 m-0 list-none flex-1 overflow-auto">
            <li 
              v-for="(option, index) in filteredOptions" 
              :key="index"
              @click.stop="selectOption(option)"
              class="px-3 py-2 cursor-pointer transition-colors flex items-center justify-between"
              :class="[
                option.disabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800',
                isSelected(option)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium' 
                  : 'text-surface-700 dark:text-surface-300'
              ]"
            >
              <div class="flex items-center gap-2">
                <slot name="option" v-bind="option">
                  {{ option.label }}
                </slot>
              </div>
            </li>
            
            <li 
              v-if="filteredOptions.length === 0"
              class="px-3 py-3 text-center text-surface-500 text-sm"
            >
              No options available
            </li>
          </ul>
          
          <!-- Custom Footer Slot -->
          <slot name="list-footer"></slot>
        </div>
      </Transition>
    </div>

    <div v-if="error || hint" class="text-sm mt-0.5">
      <p v-if="error" class="text-red-500 font-medium m-0">{{ error }}</p>
      <p v-else-if="hint" class="text-surface-500 dark:text-surface-400 m-0">{{ hint }}</p>
    </div>
  </div>
</template>

<style scoped>
.select-dropdown-enter-active,
.select-dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.select-dropdown-enter-from,
.select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
/* Ensure input has no tailwind ring */
input:focus {
  outline: none;
  box-shadow: none;
}
</style>
