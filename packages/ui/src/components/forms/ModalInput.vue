<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";
import { CloudUpload, X, File } from "@lucide/vue";
import type { UploadDocumentFile } from "@/types/api/medical-charts/document";

withDefaults(
  defineProps<{
    theme?: "light" | "dark" | "default";
  }>(),
  {
    theme: "default",
  }
);

const visible = ref<boolean>(true);
const activeStep = ref<number>(1);

const emit = defineEmits<{
  // (nombre_evento: tipo_argumento): retorno
  (e: "close"): void;
  (e: "uploadComplete", file: UploadDocumentFile): void;
}>();

const totalSize = ref<number>(0);
const files = ref<UploadDocumentFile[]>([]);

const onRemoveTemplatingFile = (
  removeFileCallback: (index: number) => void,
  index: number
): void => {
  removeFileCallback(index);
  files.value = [];
  totalSize.value = 0;
};

const onSelectedFiles = (event: { files: UploadDocumentFile[] }): void => {
  files.value = event.files;
  totalSize.value = 0;

  if (files.value.length > 0) {
    totalSize.value = files.value[0].size;
  }
};

const onTemplatedUpload = (): void => {
  visible.value = false;
  emit("close");
};

const simulateSend = (): void => {
  if (files.value.length === 0) return;
  const fileToUpload = files.value[0];
  visible.value = false;
  emit("uploadComplete", fileToUpload);
  emit("close");
  // onTemplatedUpload();
};

const fileUploadRef = ref<{ choose: () => void } | null>(null);

const triggerChoose = (): void => {
  fileUploadRef.value?.choose();
};

const cleanModal = (): void => {
  activeStep.value = 1;
  files.value = [];
  totalSize.value = 0;
  emit("close");
};
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="visible"
      modal
      header="Upload Document"
      :style="{ width: '100%', maxWidth: '50rem' }"
      :class="['px-4 sm:px-6', { 'light-theme-dialog': theme === 'light' }]"
      @hide="cleanModal"
    >
      <div class="text-center mt-4 mb-4 text-xl font-semibold">
        <FileUpload
          ref="fileUploadRef"
          name="demo[]"
          url="/api/upload"
          :multiple="false"
          accept="application/pdf,image/jpeg,image/jpg,image/png,image"
          @upload="onTemplatedUpload()"
          @select="onSelectedFiles"
        >
          <template #header>
            <div class="hidden"></div>
          </template>
          <template #content="{ files: selectedFiles, removeFileCallback }">
            <div
              v-if="selectedFiles.length > 0"
              class="flex justify-center w-full"
            >
              <div
                class="p-6 flex flex-col items-center gap-3"
                style="width: 100%; max-width: 18rem"
              >
                <div class="flex items-center justify-center">
                  <File class="w-10 h-10" />
                </div>

                <span
                  class="text-center text-base"
                  :title="selectedFiles[0].name"
                  style="
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-word;
                  "
                >
                  {{ selectedFiles[0].name }}
                </span>

                <button
                  type="button"
                  aria-label="Remove selected file"
                  class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors group"
                  @click="onRemoveTemplatingFile(removeFileCallback, 0)"
                >
                  <X
                    class="w-6 h-6 text-red-500 group-hover:text-red-600"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div
              v-else
              class="flex flex-col items-center justify-center w-full gap-4 py-8 cursor-pointer"
              @click="triggerChoose()"
            >
              <div
                class="border-2 rounded-full p-4 inline-flex items-center justify-center border-gray-300 dark:border-gray-600 hover:border-p-secondary transition-colors"
              >
                <CloudUpload class="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Click, drag and drop files here to upload.
              </p>
            </div>
          </template>
        </FileUpload>
      </div>
      <div class="flex pt-6 justify-end">
        <button
          type="button"
          :disabled="files.length !== 1"
          class="btn-group-end blue-button!"
          :class="files.length !== 1 ? 'not-allowed-cursor' : ''"
          @click="simulateSend()"
        >
          Send
        </button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
:deep(.p-fileupload) {
  border: 1px solid var(--p-fileupload-border-color);
  border-radius: var(--p-fileupload-border-radius);
  background: var(--p-fileupload-background);
  color: var(--p-fileupload-color);
}
</style>

<style>
/* Unscoped overrides to force light background on the upload document dialog when theme is light */
.light-theme-dialog.p-dialog,
.light-theme-dialog.p-dialog .p-dialog-header,
.light-theme-dialog.p-dialog .p-dialog-content,
.light-theme-dialog.p-dialog .p-dialog-footer,
.light-theme-dialog.p-dialog .p-fileupload,
.light-theme-dialog.p-dialog .p-fileupload-header,
.light-theme-dialog.p-dialog .p-fileupload-content {
  background: #ffffff !important;
  color: #1f2937 !important;
}

.light-theme-dialog.p-dialog {
  border: 1px solid #e5e7eb !important;
}

.light-theme-dialog.p-dialog .p-dialog-header {
  border-bottom: 1px solid #f3f4f6 !important;
}

.light-theme-dialog.p-dialog .p-dialog-footer {
  border-top: 1px solid #f3f4f6 !important;
}
</style>
