<script setup lang="ts">
import type { BasicLabelValue } from "@/types/api/catalog-endpoints/list";
import Badge from "primevue/badge";

defineProps<{
  badgeSeverety: string;
  badgeValue: string;
  subtitle: string;
  items: BasicLabelValue[];
  // Prop opcional para controlar cuántas columnas quieres (por defecto 3)
  classGrid?: string;
}>();

// Función auxiliar para manejar arrays (como los serviceTypes)
const formatValue = (val: unknown): unknown => {
  if (Array.isArray(val)) return val.join(", ");
  return val ?? "—";
};
</script>

<template>
  <section>
    <div v-if="items.length > 0">
      <div
        class="flex items-center justify-between gap-2 mb-4 border-b border-gray-400 border-dashed pb-1"
      >
        <span class="text-sm font-bold text-gray-600 dark:text-gray-200 italic">
          {{ subtitle }}
        </span>
        <div class="flex flex-col mb-4">
          <Badge :value="badgeValue" size="small" :severity="badgeSeverety" />
        </div>
      </div>

      <div
        :class="[
          'grid gap-4',
          classGrid || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
        ]"
      >
        <div v-for="(item, index) in items" :key="index" class="flex flex-col">
          <span class="text-xs font-bold text-gray-500">
            {{ item.label }}
          </span>
          <div class="text-sm">
            <span :class="item.class">
              {{ formatValue(item.value) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
