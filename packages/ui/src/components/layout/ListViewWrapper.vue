<script setup lang="ts">
// Guardamos las props en una constante
const props = withDefaults(
  defineProps<{
    class?: string | null;
    noCard?: boolean;
  }>(),
  {
    class: "px-4",
    noCard: false,
  }
);
</script>
<template>
  <div>
    <slot name="tabs" />

    <!-- Slot para el filtro (UserCardFilter, DepartmentFilter, etc.) -->
    <slot name="filter" />

    <div :class="props.class">
      <div
        v-if="!props.noCard"
        class="p-4 rounded-lg bg-primary border border-border-light shadow-sm h-auto w-full max-w-full overflow-x-auto"
      >
        <!-- Slot por defecto para la tabla de datos -->
        <slot />
      </div>
      <div v-else class="mt-5 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
