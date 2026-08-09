<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker, InputText } from "primevue";
import RequiredLabel from "@/components/ui/base/RequiredLabel.vue";

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
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div>
    <RequiredLabel
      v-if="label"
      :label="label"
      :required="required"
      class="mb-0"
    />

    <div class="flex items-center space-x-3">
      <ColorPicker v-model="colorValue" :disabled="disabled" />

      <InputText
        id="alphabetic"
        v-model="colorValue"
        v-keyfilter.regex="/[0-9a-fA-F]/"
        maxlength="6"
        type="text"
        :placeholder="placeholder"
        class="input-base"
        :disabled="disabled"
        :class="disabled ? 'is-disabled' : 'is-enabled'"
        fluid
      />
    </div>

    <span v-if="error" class="text-error">{{ error }}</span>
  </div>
</template>
