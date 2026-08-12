<script setup lang="ts">
type BadgeSeverity = "primary" | "secondary" | "success" | "warning" | "danger" | "info";

interface Props {
  value?: string | number;
  severity?: BadgeSeverity;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  severity: "primary",
  class: undefined,
});
</script>

<template>
  <span
    class="px-badge"
    :class="[`px-badge--${severity}`, props.class]"
  >
    <slot>{{ value }}</slot>
  </span>
</template>

<style scoped>
.px-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
}

.px-badge--primary {
  background-color: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.px-badge--secondary {
  background-color: rgba(107, 114, 128, 0.15);
  color: #6b7280;
}

.px-badge--success {
  background-color: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.px-badge--warning {
  background-color: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.px-badge--danger {
  background-color: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.px-badge--info {
  background-color: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}
</style>
