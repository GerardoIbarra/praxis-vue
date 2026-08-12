<script setup lang="ts">
import { computed } from "vue";
import { Field } from "vee-validate";
import VueSelect from "vue-select";
import { Search, ChevronDown } from "@lucide/vue";
import PraxisRequiredLabel from "@/components/base/PraxisRequiredLabel.vue";

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue"]);

// Sincronización bidireccional para cleanedResults
const internalSelected = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// Filtra qué componentes mostrar según lo seleccionado en el VueSelect
const activeComponents = computed(() => {
  return (props.field.components || []).filter((c: { key: string }) =>
    internalSelected.value.includes(c.key)
  );
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-col gap-1">
      <VueSelect
        v-model="internalSelected"
        class="vue-select-standard text-gray-400 is-enabled"
        :options="field.options[0]?.options || []"
        :multiple="true"
        :reduce="(option: Record<string, unknown>) => option.value"
        :selectable="
          (option: Record<string, unknown>) =>
            !internalSelected.some((item: unknown) => item === option.value)
        "
      >
        <template #open-indicator="{ attributes }">
          <span v-if="field.search" v-bind="attributes">
            <Search class="w-4 h-4" />
          </span>
          <span v-else v-bind="attributes">
            <ChevronDown class="w-4 h-4" />
          </span>
        </template>
      </VueSelect>
    </div>

    <div v-if="internalSelected.length > 0">
      <div
        v-for="comp in activeComponents"
        :key="comp.key"
        class="flex flex-col gap-1 pt-2"
      >
        <PraxisRequiredLabel :label="comp.label" :required="false" class="mt-2" />

        <div class="flex items-center gap-2">
          <template
            v-for="(subComp, subCompIdx) in comp.components"
            :key="subCompIdx"
          >
            <template v-if="subComp.type === 'static_text'">
              <span class="text-xs">{{ subComp.label }}</span>
            </template>

            <Field
              v-else
              v-slot="{ errors }"
              v-model="subComp.value"
              :name="subComp.key"
              :rules="subComp.required ? 'required' : ''"
              class="flex-1 max-w-28"
            >
              <input
                v-if="subComp.type === 'integer'"
                v-model="subComp.value"
                type="number"
                class="input-base w-full"
                :placeholder="subComp.placeholder || ''"
              />
              <span class="text-error text-xs block" aria-live="polite">
                {{ errors[0] }}
              </span>
            </Field>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

