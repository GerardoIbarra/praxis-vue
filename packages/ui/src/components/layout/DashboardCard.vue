<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  isMetric?: boolean; // If true, applies metric card styles (p-5, flex-row items-start)
}

withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  isMetric: false,
});
</script>

<template>
  <div
    class="bg-primary border border-border-light shadow-sm rounded-2xl transition-all duration-300 hover:shadow-sm"
    :class="[
      isMetric
        ? 'p-5 flex justify-between items-start'
        : 'p-6 flex flex-col justify-start',
    ]"
  >
    <!-- Standard Card Header (For Charts and Lists) -->
    <div
      v-if="!isMetric && (title || subtitle || $slots['header-action'])"
      class="flex justify-between items-start gap-4 mb-6"
    >
      <div>
        <h3
          v-if="title"
          class="text-base font-extrabold text-slate-900 dark:text-white"
        >
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-xs text-slate-500 dark:text-slate-400">
          {{ subtitle }}
        </p>
      </div>
      <div v-if="$slots['header-action']" class="shrink-0">
        <slot name="header-action" />
      </div>
    </div>

    <!-- Card Content -->
    <slot />
  </div>
</template>
