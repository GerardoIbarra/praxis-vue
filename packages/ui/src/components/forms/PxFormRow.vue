<script setup lang="ts">
import { Field } from "vee-validate";
import PxSelect from "@/components/_primitives/PxSelect.vue";
import PxInputText from "@/components/_primitives/PxInputText.vue";
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
            <PxInputText
              v-if="comp.type === 'integer'"
              v-model="comp.value"
              type="number"
              :min="getMinNumberValue(comp)"
              :max="getMaxNumberValue(comp)"
              :error="errors[0]"
            />

            <PxSelect
              v-else-if="comp.type === 'select'"
              v-model="comp.value"
              :options="comp.option_source.options"
              optionLabel="label"
              :optionValue="(option: Record<string, unknown>) => option.value"
              :clearable="
                comp.required && !comp.rules?.required_if ? false : true
              "
              @search="
                (searchTerm: string) => $emit('search', { field, searchTerm })
              "
              @option:selected="
                (option: unknown) => $emit('change', { option, field })
              "
            />
          </div>
        </Field>
      </template>
    </div>
  </div>
</template>
