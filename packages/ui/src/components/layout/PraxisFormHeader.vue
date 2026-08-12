<script setup lang="ts">
/**
 <PraxisFormHeader
 validtitle="true"           <!-- Si el título es dinámico, se puede usar esta prop para evitar que
  title="Entidad"         <!-- Ej: "Usuario", "Paciente", "Cita" -->
  :is-edit-mode="isEdit"  <!-- Boolean para cambiar entre Edit/Create -->
  audit-context="users"    <!-- Opcional: Contexto del store -->
  :audit-entity-name="name"<!-- Opcional: Nombre que aparecerá en el sidebar -->
  audit-table-name="Table" <!-- Opcional: Filtro por tabla -->
/>
 */

withDefaults(
  defineProps<{
    title: string;
    validtitle?: boolean; // Si el título es dinámico, se puede usar esta prop para evitar que se muestre "Create/Edit" en el título
    isEditMode: boolean;
  }>(),
  {
    validtitle: true,
  }
);
</script>

<template>
  <div class="section-divider">
    <div class="flex justify-between items-center">
      <h2 v-if="validtitle" class="h2-semibold flex items-center">
        {{ isEditMode ? `Edit ${title}` : `Create ${title}` }}
      </h2>
      <h2 v-else class="h2-semibold flex items-center">
        {{ title }}
      </h2>

      <div class="flex items-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
