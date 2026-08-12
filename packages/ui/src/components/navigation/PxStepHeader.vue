<script setup lang="ts">
/**
 * PxStepHeader Component
 *
 * Reusable header for stepper steps with icon, title, and description.
 * Handles active/inactive styling based on current step position.
 *
 * @example
 * <Step v-slot="{ activateCallback, value }">
 *   <PxStepHeader
 *     :icon="User"
 *     title="Basic Information"
 *     description="Personal details"
 *     :required="true"
 *     :step-value="value"
 *     :active-step="activeStep"
 *     @activate="activateCallback"
 *   />
 * </Step>
 */

import type { Component } from "vue";

interface Props {
  /** Lucide icon component to display */
  icon: Component;
  /** Step title text */
  title: string;
  /** Step description text */
  description: string;
  /** Whether this step is required (shows red asterisk) */
  required?: boolean;
  /** Current step's value from PrimeVue Step slot */
  stepValue?: string | number;
  /** Current active step value */
  activeStep?: string | number;
}

withDefaults(defineProps<Props>(), {
  required: false,
  stepValue: "1",
  activeStep: "1",
});

const emit = defineEmits<{
  (e: "activate"): void;
}>();
</script>

<template>
  <button type="button" class="icon-circle-spacing" @click="emit('activate')">
    <span
      :class="[
        'icon-circle-contour ',
        {
          'bg-primary-500 border-p-terciary text-white':
            Number(stepValue) <= Number(activeStep),
          'border-p-terciary text-p-terciary':
            Number(stepValue) > Number(activeStep),
        },
      ]"
    >
      <component :is="icon" class="w-4 h-4" />
    </span>
    <div class="text-left">
      <div class="font-medium field-value">
        {{ title }}
        <span v-if="required" class="text-error">*</span>
      </div>
      <div class="text-sm text-gray-500">{{ description }}</div>
    </div>
  </button>
</template>
