<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import PraxisDialog from "@/components/_primitives/PraxisDialog.vue";
import VueSelect from "vue-select";
import RequiredLabel from "@/components/ui/base/RequiredLabel.vue";
import { Form, Field } from "vee-validate";
import { setupVeeValidate } from "@/utils/veeValidateConfig";
import { useMedicalChartModalFormSection } from "@/stores/medicalChart/modalForm";
import DynamicForm from "@/components/ui/forms/DynamicForm.vue";
import { storeToRefs } from "pinia";
import { X } from "@lucide/vue";
import type { EditableTreeItem } from "@/types/api/medical-charts/document";

interface NodeOption {
  value: boolean;
  label: string;
}

interface Props {
  visible: boolean;
  title?: string;
  item: EditableTreeItem;
  selectedNode?: NodeOption[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Add/Edit Node",
  selectedNode: () => [],
  loading: false,
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "save", item: Record<string, any>): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "cancel", parentRef: any, item: EditableTreeItem): void;
}>();

const ModalData = useMedicalChartModalFormSection();
const {
  responseModalForm,
  loadingForm,
  showDirectory,
  selectedOptionsExits,
  selectedValuesReviewStore,
  selectedOptionsReviewStore,
  // formData,
} = storeToRefs(ModalData);
const { selectedOptionsReviewStoreRefresh } = ModalData;

// Setup vee-validate with centralized configuration
setupVeeValidate();

const showModal = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

// local reactive copy of the prop to avoid mutating props directly
const localItem = reactive<EditableTreeItem>({
  ...props.item,
  is_directory: props.item.is_directory ?? true,
});

// keep local copy in sync when parent provides a new item
watch(
  () => props.item,
  (newVal) => {
    if (newVal) {
      Object.assign(localItem, newVal);
    } /*  */
  },
  { immediate: true, deep: true }
);

const handleSave = () => {
  emit("save", { ...localItem });
};

const handleCancel = () => {
  showModal.value = false;
  selectedOptionsExits.value = false;
  selectedValuesReviewStore.value = null;
  selectedOptionsReviewStore.value = [];
  emit("cancel", localItem.parentRef, localItem);
};
</script>

<template>
  <PraxisDialog
    v-model:visible="showModal"
    max-width="1000px"
    :closable="false"
    @hide="handleCancel"
  >
    <template #header>
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
        <button
          type="button"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          @click="handleCancel"
        >
          <X class="w-6 h-6" />
        </button>
      </div>
    </template>

    <Form
      id="medical-AddForm"
      autocomplete="off"
      class="rounded-lg bg-primary"
      @submit="handleSave"
    >
      <div class="flex flex-col gap-3">
        <div v-if="localItem.is_directory && showDirectory" class="mt-2">
          <div v-if="!localItem.isEditing" class="mb-4">
            <RequiredLabel label="Type" :required="true" />
            <VueSelect
              v-model="localItem.is_directory"
              :clearable="false"
              :reduce="(value: { value: unknown }) => value.value"
              :options="selectedNode"
              :append-to-body="false"
              class="input-base is-enabled text-gray-400!"
            />
          </div>

          <RequiredLabel label="Name" :required="true" />
          <Field
            v-slot="{ errors }"
            v-model="localItem.label"
            name="Name"
            rules="required"
          >
            <input
              v-model="localItem.label"
              type="text"
              :placeholder="localItem.placeholder"
              class="input-base is-enabled dark:text-white"
            />
            <span class="text-error">{{ errors[0] }}</span>
          </Field>
        </div>
        <div v-else-if="!localItem.is_directory || !showDirectory" class="mt-2">
          <div v-if="selectedOptionsExits" class="mb-4 w-2/4">
            <RequiredLabel label="Order Type" :required="false" />
            <VueSelect
              v-model="selectedValuesReviewStore"
              :options="selectedOptionsReviewStore"
              label="name"
              :reduce="(option: { value: string }) => option.value"
              :clearable="false"
              class="vue-select-standard w-full! text-gray-400 is-enabled"
              @update:model-value="
                (value: string) => selectedOptionsReviewStoreRefresh(value)
              "
            />
          </div>
          <DynamicForm
            v-if="responseModalForm?.schema && loadingForm == false"
            :schema="responseModalForm.schema"
          />
        </div>
      </div>
    </Form>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="text-semibold-sm hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          @click.stop="handleCancel"
        >
          Cancel
        </button>
        <button
          form="medical-AddForm"
          type="submit"
          class="blue-button"
          :disabled="loading"
        >
          {{ loading ? "Saving..." : "Save" }}
        </button>
      </div>
    </template>
  </PraxisDialog>
</template>
