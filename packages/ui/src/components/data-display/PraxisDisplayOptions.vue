<script setup lang="ts">
import UiRadioButton from "@/components/_primitives/UiRadioButton.vue";

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

interface PraxisDisplayOptions {
  inputs: DisplayOptionInput[];
}

interface Props {
  displayOptions: PraxisDisplayOptions;
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
      <textarea
        v-if="input.type === 'textarea'"
        v-model="input.items[0].value"
        rows="5"
        class="w-full bg-white border border-gray-300 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
      />
      <!-- Radio Buttons -->
      <div v-else-if="input.type === 'radio'" class="space-y-2">
        <label
          v-for="(opt, idx) in input.items"
          :key="idx"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <UiRadioButton
            v-model="input.value"
            :value="opt.value"
            :input-id="`radio-${i}-${idx}`"
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
