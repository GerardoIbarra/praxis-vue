<script setup lang="ts">
import type { BasicLabelValue } from "@/types/api/catalog-endpoints/list";

defineProps<{
  title?: string;
  items: BasicLabelValue[];
  classGrid?: string;
}>();
</script>

<template>
  <section class="mb-8">
    <div
      class="flex items-center gap-2 mb-4 border-b pb-1 border-black dark:border-white"
    >
      <span class="text-lg font-bold text-black dark:text-white">
        {{ title }}
      </span>
      <slot name="header-right"></slot>
    </div>

    <div :class="classGrid ? classGrid : 'grid grid-cols-3 gap-6'">
      <div v-for="(item, index) in items" :key="index" class="flex flex-col">
        <span class="text-xs font-bold text-gray-500">{{ item.label }}</span>
        <div class="text-sm text-gray-800 dark:text-gray-300">
          <span :class="item.class">
            {{ item.value || "—" }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
