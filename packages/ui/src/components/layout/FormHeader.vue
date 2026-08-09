<script setup lang="ts">
/**
 <FormHeader
 validtitle="true"           <!-- Si el título es dinámico, se puede usar esta prop para evitar que
  title="Entidad"         <!-- Ej: "Usuario", "Paciente", "Cita" -->
  :is-edit-mode="isEdit"  <!-- Boolean para cambiar entre Edit/Create -->
  audit-context="users"    <!-- Opcional: Contexto del store -->
  :audit-entity-name="name"<!-- Opcional: Nombre que aparecerá en el sidebar -->
  audit-table-name="Table" <!-- Opcional: Filtro por tabla -->
  :audit-object-pk="id"    <!-- Opcional: ID del objeto -->
  :audit-user-id="userId"  <!-- Opcional: ID del usuario que hizo la acción (si no se provee, se usará el ID del usuario actual) -->
/>
 */

import type { AuditLogContext } from "@/stores/auditLogSidebar";
import AuditLogButton from "@/components/ui/data-display/AuditLogButton.vue";

withDefaults(
  defineProps<{
    title: string;
    validtitle?: boolean; // Si el título es dinámico, se puede usar esta prop para evitar que se muestre "Create/Edit" en el título
    isEditMode: boolean;
    // Audit Log specific props
    auditContext?: AuditLogContext;
    auditId?: string | number | null;
    auditEntityName?: string | null;
    auditTableName?: string | null;
    auditObjectPk?: string | null;
    auditUserId?: string | null;
  }>(),
  {
    validtitle: true,
    auditContext: undefined,
    auditId: null,
    auditEntityName: null,
    auditTableName: null,
    auditObjectPk: null,
    auditUserId: null,
  }
);
</script>

<template>
  <div class="section-divider">
    <div class="flex justify-between items-center">
      <h2 v-if="validtitle" class="h2-semibold flex items-cent">
        {{ isEditMode ? `Edit ${title}` : `Create ${title}` }}
      </h2>
      <h2 v-else class="h2-semibold flex items-cent">
        {{ title }}
      </h2>

      <div class="flex items-center gap-2">
        <slot name="actions"></slot>
        <AuditLogButton
          :show="isEditMode"
          :audit-context="auditContext || 'users'"
          :audit-id="auditId"
          :audit-entity-name="auditEntityName"
          :audit-table-name="auditTableName"
          :audit-object-pk="auditObjectPk"
          :audit-user-id="auditUserId"
        />
      </div>
    </div>
  </div>
</template>
