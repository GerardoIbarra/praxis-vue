<script setup lang="ts">
import { Trash } from "@lucide/vue";
import { toRaw } from "vue";
import type { TemplateSection } from "@/types/catalog/documentTemplates";
import PraxisCheckbox from "@/components/_primitives/PraxisCheckbox.vue";
import { VueDraggable } from "vue-draggable-plus";

interface Props {
  element: TemplateSection;
  log: (evt: unknown) => void;
  clone: (original: TemplateSection) => TemplateSection;
  hasEditPermission: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:element": [element: TemplateSection];
}>();

const toggleRequired = (colIndex: number, index: number, value: boolean) => {
  const raw = toRaw(props.element);
  if (!raw.columns || !Array.isArray(raw.columns)) return;

  const updated = {
    ...raw,
    columns: (raw.columns as TemplateSection[][]).map((col, i) => {
      const newCol = col.map((item) => ({ ...item }));
      if (i === colIndex) {
        newCol[index].is_required = value;
      }
      return newCol;
    }),
    layout_options: { ...(raw.layout_options || {}) },
  } as TemplateSection;

  emit("update:element", JSON.parse(JSON.stringify(updated)));
};

const removeAt = (colIndex: number, index: number) => {
  // sacar el objeto sin proxy
  const raw = toRaw(props.element);

  if (!raw.columns || !Array.isArray(raw.columns)) return;

  // clonar sin compartir referencias
  const updated = {
    ...raw,
    columns: (raw.columns as TemplateSection[][]).map((col, i) => {
      const newCol = col.map((item) => ({ ...item })); // copia segura de cada ítem
      if (i === colIndex) newCol.splice(index, 1);
      return newCol;
    }),
    layout_options: { ...(raw.layout_options || {}) },
  } as TemplateSection;

  // emitir clon limpio
  emit("update:element", JSON.parse(JSON.stringify(updated)));
};

const updateWidth = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  const updatedElement = {
    ...props.element,
    layout_options: {
      ...(props.element.layout_options || {}),
      first_column_percentage: value,
    },
  } as TemplateSection;

  emit("update:element", updatedElement);
};

const getColumnWidth = (colIndex: number) => {
  const { layout_options } = props.element;
  if (!layout_options) return "50%";
  if (layout_options.columns === 1) return "100%";
  const firstWidth = Number(layout_options.first_column_percentage || 50);
  return colIndex === 0 ? `${firstWidth}%` : `${100 - firstWidth}%`;
};

const handleColumnUpdate = (colIndex: number, newColumn: TemplateSection[]) => {
  const raw = toRaw(props.element);
  if (!raw.columns || !Array.isArray(raw.columns)) return;

  const updated = {
    ...raw,
    columns: (raw.columns as TemplateSection[][]).map((col, i) => {
      return i === colIndex ? newColumn : col;
    }),
    layout_options: { ...(raw.layout_options || {}) },
  } as TemplateSection;

  emit("update:element", JSON.parse(JSON.stringify(updated)));
};
</script>

<template>
  <div v-if="props.element.layout_options">
    <div class="flex items-center mb-2">
      <label class="mr-2">Left Column Width Percentage:</label>
      <input
        :value="props.element.layout_options.first_column_percentage"
        type="text"
        class="w-20 border border-gray-600 px-2 py-1 rounded-md bg-white"
        @input="updateWidth"
      />
    </div>

    <div class="mt-2 h-auto min-h-20">
      <div class="flex h-full">
        <template
          v-for="(column, colIndex) in props.element.columns"
          :key="colIndex"
        >
          <div
            v-if="colIndex === 0 || props.element.layout_options.columns === 2"
            :style="{ width: getColumnWidth(colIndex) }"
          >
            <VueDraggable
              class="min-h-37.5 p-3 border-2 border-solid border-gray-300 rounded-lg bg-gray-50 text-black"
              :model-value="column"
              :animation="150"
              ghost-class="ghost"
              :group="{ name: 'people', pull: false, put: true }"
              :clone="props.clone"
              @update:model-value="
                (val: TemplateSection[]) => handleColumnUpdate(colIndex, val)
              "
              @change="props.log"
            >
              <div
                v-for="(element, index) in column"
                v-show="element.section_type !== 'layout'"
                :key="element.aux_id || index"
                class="list-item-interactive"
              >
                <div class="flex justify-between">
                  {{ element.name }}

                  <div class="flex items-center gap-6">
                    <div
                      v-if="element.section_type !== 'layout'"
                      class="flex items-center"
                      @click.stop
                    >
                      <label
                        :for="`is_required-col${colIndex}-${index}`"
                        class="text-sm text-gray-500 mr-2 cursor-pointer"
                      >
                        Is required?
                      </label>
                      <PraxisCheckbox
                        v-model="element.is_required"
                        :input-id="`is_required-col${colIndex}-${index}`"
                        :binary="true"
                        :disabled="!hasEditPermission"
                        @change="
                          () =>
                            toggleRequired(
                              colIndex,
                              index,
                              element.is_required!!
                            )
                        "
                      />
                    </div>

                    <Trash
                      class="delete-red-icon"
                      @click.stop="removeAt(colIndex, index)"
                    />
                  </div>
                </div>
              </div>
            </VueDraggable>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div v-else class="text-error">Invalid Layout Configuration</div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
