<script setup lang="ts">
import {
  useAuditLogSidebarStore,
  type AuditLogContext,
} from "@/stores/auditLogSidebar";
import { storeToRefs } from "pinia";
import Drawer from "primevue/drawer";
import { FileClock, Download } from "@lucide/vue";
import { watch } from "vue";
import Button from "primevue/button";
import AuditLogContent from "@/components/ui/overlays/AuditLogContent.vue";

const props = defineProps<{
  service?: AuditLogContext;
  id?: string | number | null;
  title?: string;
}>();

const store = useAuditLogSidebarStore();
const { isOpen: visible, entityName, logs } = storeToRefs(store);

// Sync props and fetch logic
watch(
  [visible, () => store.currentId, () => store.currentContext],
  ([newVisible, newId, newContext], [oldVisible, oldId, oldContext]) => {
    if (newVisible) {
      // Sync props to store if passed (backward compatibility)
      if (props.service && props.service !== store.currentContext) {
        store.currentContext = props.service;
      }
      if (props.id !== undefined && props.id !== store.currentId) {
        store.currentId = props.id;
      }

      // Re-fetch only if:
      // 1. It just became visible
      // 2. OR It was already visible but ID or Context changed
      const justOpened = newVisible && !oldVisible;
      const dataChanged = newId !== oldId || newContext !== oldContext;

      if (justOpened || dataChanged) {
        store.fetchLogs(true);
      }
    } else {
      store.closeSidebar();
    }
  }
);
</script>

<template>
  <Drawer
    v-model:visible="visible"
    position="right"
    header="Audit Log History"
    class="audit-log-drawer w-137.5! max-w-[90vw]"
    :style="{ backgroundColor: 'var(--bg-primary)' }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full pr-8">
        <div class="flex items-center gap-2 min-w-0 flex-wrap">
          <FileClock class="w-5 h-5 text-p-secondary shrink-0" />
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">
            Activity Timeline
          </h2>
          <span
            v-if="entityName"
            class="text-sm text-gray-700 dark:text-gray-300 italic min-w-0 truncate"
            :title="entityName"
          >
            ({{ entityName }})
          </span>
        </div>

        <Button
          v-if="logs.length > 0"
          label="Export"
          class="p-button-sm p-button-outlined p-button-secondary shrink-0"
          :loading="store.loading"
          @click="store.downloadLogs"
        >
          <template #icon>
            <Download class="w-4 h-4 mr-2" />
          </template>
        </Button>
      </div>
    </template>

    <!-- Content is isolated to avoid re-rendering the Drawer shell -->
    <AuditLogContent v-if="visible" />
  </Drawer>
</template>

<style scoped>
@reference "@/index.css";

.audit-log-drawer :deep(.p-drawer-header) {
  @apply bg-primary border-b border-border-light px-6 py-4;
}

.audit-log-drawer :deep(.p-drawer-content) {
  @apply px-4 py-6 overflow-x-hidden transition-colors;
  background-color: var(--bg-primary);
}
</style>
