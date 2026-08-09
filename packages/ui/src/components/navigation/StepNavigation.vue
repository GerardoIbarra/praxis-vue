<script setup lang="ts">
/**
 * StepNavigation Component
 *
 * Reusable navigation buttons for multi-step forms (steppers).
 * Provides Previous/Next/Save buttons with consistent styling and behavior.
 *
 * @example
 * <StepNavigation
 *   :show-previous="true"
 *   :can-proceed="isStepValid"
 *   :loading="isSaving"
 *   next-label="Next: Contact Info"
 *   @previous="goToPreviousStep"
 *   @next="goToNextStep"
 * />
 */
import { computed } from "vue";

const props = defineProps({
  /** Whether to show the Previous button */
  showPrevious: {
    type: Boolean,
    default: true,
  },
  /** Whether the Next/Proceed button is enabled */
  canProceed: {
    type: Boolean,
    default: true,
  },
  /** Loading state - disables buttons and shows spinner */
  loading: {
    type: Boolean,
    default: false,
  },
  /** Label for the Next button */
  nextLabel: {
    type: String,
    default: "Next",
  },
  /** Label for the Previous button */
  previousLabel: {
    type: String,
    default: "Previous",
  },
  /** Loading text shown when loading is true */
  loadingLabel: {
    type: String,
    default: "Processing...",
  },
  /** Whether to show a Save button alongside Next */
  showSave: {
    type: Boolean,
    default: false,
  },
  /** Label for the Save button */
  saveLabel: {
    type: String,
    default: "Save",
  },
  /** Loading text for Save button */
  saveLoadingLabel: {
    type: String,
    default: "Saving...",
  },
  /** If the user has permission to edit/save */
  hasPermission: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["previous", "next", "save"]);

const isDisabled = computed(() => !props.canProceed || props.loading);

const isPermissionDisabled = computed(() => !props.hasPermission);

// El botón Next solo se bloquea por permisos si estamos en el último paso (showSave)
const isNextDisabled = computed(
  () => isDisabled.value || (props.showSave && isPermissionDisabled.value)
);

// El botón Save siempre se bloquea si no hay permisos
const isSaveDisabled = computed(
  () => props.loading || isPermissionDisabled.value
);

const nextButtonClasses = computed(() => ({
  "btn-disabled-permission": isNextDisabled.value,
}));

const saveButtonClasses = computed(() => ({
  "btn-disabled-permission": isSaveDisabled.value,
}));
</script>

<template>
  <!-- Ambos botones alineados a la derecha -->
  <div class="flex justify-end gap-3 mt-6">
    <!-- Previous Button -->
    <button
      v-if="showPrevious"
      type="button"
      class="btn-previous"
      :disabled="loading"
      @click="emit('previous')"
    >
      {{ previousLabel }}
    </button>

    <!-- Save Button (optional) -->
    <button
      v-if="showSave"
      type="button"
      class="btn-previous"
      :disabled="isSaveDisabled"
      :class="saveButtonClasses"
      @click="emit('save')"
    >
      <div v-if="loading" class="flex items-center gap-2">
        <div class="loading-animation border-gray-500"></div>
        <span>{{ saveLoadingLabel }}</span>
      </div>
      <span v-else>{{ saveLabel }}</span>
    </button>

    <!-- Next/Proceed Button -->
    <button
      type="button"
      class="blue-button"
      :disabled="isNextDisabled"
      :class="nextButtonClasses"
      @click="emit('next')"
    >
      <div v-if="loading" class="flex items-center gap-2">
        <div class="loading-animation border-white"></div>
        <span>{{ loadingLabel }}</span>
      </div>
      <span v-else>{{ nextLabel }}</span>
    </button>
  </div>
</template>
