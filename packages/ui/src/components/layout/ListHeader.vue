<template>
  <div class="flex items-center justify-between mb-2">
    <div class="flex items-center">
      <!-- slot para el título -->
      <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        <slot name="title" />
      </h3>
    </div>
    <div class="flex items-center justify-between">
      <!-- slot para acciones (botón “New”, filtros, etc.) -->
      <slot name="actions" />
    </div>
  </div>
</template>
