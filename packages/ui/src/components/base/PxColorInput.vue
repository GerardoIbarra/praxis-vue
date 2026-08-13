<script setup lang="ts">
import { computed } from "vue";
import PxRequiredLabel from "@/components/base/PxRequiredLabel.vue";

// Props del componente
interface Props {
  modelValue?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  required: false,
  disabled: false,
  placeholder: "000000",
  error: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const colorValue = computed({
  get: () => {
    const val = props.modelValue || "000000";
    return val.startsWith("#") ? val : `#${val}`;
  },
  set: (value) => {
    // Return value without #
    emit("update:modelValue", value.replace("#", ""));
  },
});

const textValue = computed({
  get: () => (props.modelValue || "").replace("#", ""),
  set: (value) => {
    // Only allow hex chars
    const cleaned = value.replace(/[^0-9a-fA-F]/g, "").substring(0, 6);
    emit("update:modelValue", cleaned);
  },
});
</script>

<template>
  <div>
    <PxRequiredLabel
      v-if="label"
      :label="label"
      :required="required"
      class="mb-0"
    />

    <div class="flex items-center space-x-3">
      <input
        v-model="colorValue"
        type="color"
        :disabled="disabled"
        class="w-10 h-10 p-0 border-0 rounded cursor-pointer shrink-0"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      />

      <input
        id="alphabetic"
        v-model="textValue"
        maxlength="6"
        type="text"
        :placeholder="placeholder"
        class="input-base w-full"
        :disabled="disabled"
        :class="disabled ? 'is-disabled' : 'is-enabled'"
      />
    </div>

    <span v-if="error" class="text-error">{{ error }}</span>
  </div>
</template>
