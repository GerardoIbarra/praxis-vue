<script setup lang="ts">
import { Field } from "vee-validate";
import VueSelect from "vue-select";
import { ChevronDown } from "@lucide/vue";
import { onMounted, watch } from "vue";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  getFieldRules: {
    type: Function,
    default: () => "",
  },
  getMinNumberValue: {
    type: Function,
    default: () => null,
  },
  validateMinRange: {
    type: Function,
    default: () => {},
  },
  getMaxNumberValue: {
    type: Function,
    default: () => null,
  },
  validateMaxRange: {
    type: Function,
    default: () => {},
  },
});

watch(
  () => props.field,
  () => {
    if (props.field.required) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.field.components.filter((comp: any) => {
        if (comp.rules) {
          comp.required = true;
        }
      });
    }
  }
);

onMounted(() => {
  if (props.field.required) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props.field.components.filter((comp: any) => {
      if (comp.rules) {
        comp.required = true;
      }
    });
  }
});

defineEmits(["search", "change"]);
</script>
<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <template v-for="(comp, compIdx) in field.components" :key="compIdx">
        <template v-if="comp.type === 'static_text'">
          <span class="text-sm pr-2">{{ comp.label }}</span>
        </template>

        <Field
          v-if="comp.key"
          v-slot="{ errors }"
          v-model="comp.value"
          :name="comp.key"
          :rules="getFieldRules(comp)"
          class="flex-1"
        >
          <div class="flex flex-col">
            <input
              v-if="comp.type === 'integer'"
              v-model="comp.value"
              type="number"
              class="input-base w-full"
              :min="getMinNumberValue(comp)"
              :max="getMaxNumberValue(comp)"
            />

            <VueSelect
              v-else-if="comp.type === 'select'"
              v-model="comp.value"
              class="vue-select-standard text-gray-400 is-enabled"
              :options="comp.option_source.options"
              :label="'label'"
              :reduce="(option: Record<string, unknown>) => option.value"
              :clearable="
                comp.required && !comp.rules?.required_if ? false : true
              "
              @search="
                (searchTerm: string) => $emit('search', { field, searchTerm })
              "
              @option:selected="
                (option: unknown) => $emit('change', { option, field })
              "
            >
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes">
                  <ChevronDown class="w-4 h-4" />
                </span>
              </template>
            </VueSelect>

            <span
              v-if="errors[0]"
              class="text-error text-xs"
              aria-live="polite"
            >
              {{ errors[0] }}
            </span>
          </div>
        </Field>
      </template>
    </div>
  </div>
</template>
