<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    containerClass?: string;
  }>(),
  {
    containerClass:
      "bg-white dark:bg-surface-800 border-border-light shadow-xs text-slate-900 dark:text-white",
  }
);
</script>

<template>
  <div
    :class="[
      'mb-6 p-5 border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4',
      props.containerClass,
    ]"
  >
    <div class="space-y-1">
      <h1 class="text-xl md:text-2xl font-black tracking-tight">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </h1>
      <p class="text-xs md:text-sm opacity-80">
        <slot name="subtitle">
          <span>{{ subtitle }}</span>
        </slot>
      </p>
    </div>

    <!-- Actions / Controls -->
    <div v-if="$slots.actions" class="flex items-center gap-3 w-full md:w-auto">
      <slot name="actions" />
    </div>
  </div>
</template>
