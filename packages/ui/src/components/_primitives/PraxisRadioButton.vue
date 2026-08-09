<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: unknown;
  value: unknown;
  inputId?: string;
  disabled?: boolean;
  name?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  inputId: undefined,
  disabled: false,
  name: undefined,
  class: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
  change: [value: unknown];
}>();

const isChecked = computed(() => props.modelValue === props.value);

const select = () => {
  if (props.disabled) return;
  emit("update:modelValue", props.value);
  emit("change", props.value);
};
</script>

<template>
  <span
    class="praxis-radio"
    :class="[
      { 'praxis-radio--checked': isChecked, 'praxis-radio--disabled': disabled },
      props.class,
    ]"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="disabled"
    tabindex="0"
    @click="select"
    @keydown.space.prevent="select"
    @keydown.enter.prevent="select"
  >
    <input
      :id="inputId"
      type="radio"
      class="praxis-radio-input"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      tabindex="-1"
      @change="select"
    />
    <span class="praxis-radio-box">
      <span v-if="isChecked" class="praxis-radio-dot" />
    </span>
  </span>
</template>

<style scoped>
.praxis-radio {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  outline: none;
}

.praxis-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.praxis-radio-box {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border-medium, #d1d5db);
  background-color: var(--bg-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s, background-color 0.15s, box-shadow 0.15s;
  flex-shrink: 0;
}

.praxis-radio:focus-visible .praxis-radio-box {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.35);
}

.praxis-radio--checked .praxis-radio-box {
  border-color: var(--color-primary, #3b82f6);
}

.praxis-radio--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.praxis-radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-primary, #3b82f6);
  animation: praxis-radio-pop 0.15s ease;
}

@keyframes praxis-radio-pop {
  0% { transform: scale(0); }
  80% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
