<script setup lang="ts">
import { computed } from "vue";
import { Field } from "vee-validate";
import PxSelect from "@/components/_primitives/PxSelect.vue";
import PxInputText from "@/components/_primitives/PxInputText.vue";
import PxRequiredLabel from "@/components/base/PxRequiredLabel.vue";

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
      <PxSelect
        v-model="internalSelected"
        :options="field.options[0]?.options || []"
        :multiple="true"
        optionValue="value"
        :searchable="field.search"
      />
    </div>

    <div v-if="internalSelected.length > 0">
      <div
        v-for="comp in activeComponents"
        :key="comp.key"
        class="flex flex-col gap-1 pt-2"
      >
        <PxRequiredLabel :label="comp.label" :required="false" class="mt-2" />

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
              <PxInputText
                v-if="subComp.type === 'integer'"
                v-model="subComp.value"
                type="number"
                :placeholder="subComp.placeholder || ''"
                :error="errors[0]"
              />
            </Field>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

