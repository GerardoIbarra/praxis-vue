<script setup lang="ts">
import { RadioButton, Textarea } from "primevue";

interface DisplayOptionItem {
  title: string;
  value: string;
}

interface DisplayOptionInput {
  title: string;
  type: "textarea" | "radio" | "text";
  items: DisplayOptionItem[];
  value?: string; // Para radio buttons
}

interface DisplayOptions {
  inputs: DisplayOptionInput[];
}

interface Props {
  displayOptions: DisplayOptions;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <div
      v-for="(input, i) in props.displayOptions.inputs"
      :key="i"
      class="mb-4 border p-3 rounded-md bg-gray-50"
    >
      <label class="block font-semibold mb-1">{{ input.title }}</label>

      <!-- Textarea -->
      <Textarea
        v-if="input.type === 'textarea'"
        v-model="input.items[0].value"
        auto-resize
        rows="5"
        cols="30"
        class="w-full bg-white border border-gray-300 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <!-- Radio Buttons -->
      <div v-else-if="input.type === 'radio'" class="space-y-2">
        <label
          v-for="(opt, idx) in input.items"
          :key="idx"
          class="flex items-center space-x-2"
        >
          <RadioButton
            v-model="input.value"
            :value="opt.value"
            :input-id="`radio-${i}`"
            class="p-radiobutton-dark"
          />
          <span class="cursor-pointer">{{ opt.title }}</span>
        </label>
      </div>

      <!-- Text Input -->
      <input
        v-else-if="input.type === 'text'"
        v-model="input.items[0].value"
        type="text"
        class="w-full border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />

      <!-- Otros tipos no reconocidos -->
      <div v-else class="text-gray-500 italic">
        Tipo no soportado: {{ input.type }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Radio button styles for better visibility */
:deep(.p-radiobutton-dark .p-radiobutton-box) {
  border: 2px solid #374151 !important; /* Gray border for light mode */
  background: white !important;
}

:deep(.p-radiobutton-dark.p-radiobutton-checked .p-radiobutton-box) {
  background: #3b82f6 !important; /* Blue when selected */
  border-color: #3b82f6 !important;
}

/* Dark mode styles */
:deep(.dark .p-radiobutton-dark .p-radiobutton-box) {
  border: 2px solid #6b7280 !important; /* Lighter gray border for dark mode */
  background: #374151 !important;
}

:deep(.dark .p-radiobutton-dark.p-radiobutton-checked .p-radiobutton-box) {
  background: #3b82f6 !important; /* Blue when selected in dark mode */
  border-color: #3b82f6 !important;
}
</style>
