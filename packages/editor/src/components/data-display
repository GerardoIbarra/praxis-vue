<script setup lang="ts">
import { FileClock } from "@lucide/vue";
import { hasPermission } from "@/utils/permissions";
import { useAuditLogSidebarStore } from "@/stores/auditLogSidebar";
import type { AuditLogContext } from "@/stores/auditLogSidebar";

const props = defineProps<{
  auditContext: AuditLogContext;
  auditId?: string | number | null;
  auditEntityName?: string | null;
  auditTableName?: string | null;
  auditObjectPk?: string | null;
  auditUserId?: string | null;
  show?: boolean; // Manual control for visibility (defaults to true)
}>();

const { openSidebar } = useAuditLogSidebarStore();

const handleOpenAudit = () => {
  openSidebar(
    props.auditContext,
    props.auditId || null,
    props.auditEntityName || null,
    props.auditTableName || null,
    props.auditObjectPk || null,
    props.auditUserId || null
  );
};
</script>

<template>
  <button
    v-if="(show ?? true) && hasPermission('audit-log', 'R')"
    v-tooltip.left="'View activity history'"
    type="button"
    aria-label="View activity history"
    class="border border-secondary rounded-2xl p-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
    @click="handleOpenAudit"
  >
    <FileClock class="w-5 h-5 text-black dark:text-white" aria-hidden="true" />
  </button>
</template>
