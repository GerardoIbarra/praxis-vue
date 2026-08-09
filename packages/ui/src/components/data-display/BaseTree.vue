<script setup lang="ts">
import { type TreeNode as StoreTreeNode } from "@/types/catalog/documentTemplates";
import { Tree } from "primevue";
import {
  FileText,
  FolderOpen,
  IdCard,
  Globe,
  Check,
  X,
  Plus,
  FileUser,
  Form,
} from "@lucide/vue";
import { computed, watch } from "vue";
import VueSelect from "vue-select";
import { usePopperPosition } from "@/utils/usePopperPosition";
import { hasPermission } from "@/utils/permissions";
import { Field } from "vee-validate";
import { setupVeeValidate } from "@/utils/veeValidateConfig";

setupVeeValidate();

defineSlots<{
  actions(props: { node: StoreTreeNode }): unknown;
}>();

export interface Props {
  nodes: StoreTreeNode[];
  expandedKeys: Record<string, boolean>;
  selectedKey?: string | null;
  selectable?: boolean;
  newChildName?: string | null;
  newChildType?: boolean | string | null;
  newChildTypeOptions?: Record<string, unknown>[] | null;
  catalogItemId?: string | null;
  catalogOptions?: Record<string, unknown>[] | null;
  newChildRequiered?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  selectedKey: null,
  selectable: true,
  newChildName: null,
  newChildType: null,
  newChildTypeOptions: null,
  catalogItemId: null,
  catalogOptions: null,
  newChildRequiered: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: "nodeClick", node: StoreTreeNode): void;
  (e: "update:expandedKeys", val: Record<string, boolean>): void;
  (e: "update:newChildName", val: string): void;
  (e: "update:newChildType", val: boolean | string): void;
  (e: "update:catalogItemId", val: string): void;
  (e: "update:newChildRequiered", val: boolean): void;
  (e: "confirmAddChild", node: StoreTreeNode): void;
  (e: "cancelAddChild"): void;
  (e: "confirmEditNode", node: StoreTreeNode): void;
  (e: "cancelEditNode"): void;
  (e: "startAddChild", node: StoreTreeNode): void;
}>();

const expandedKeysModel = computed({
  get: () => props.expandedKeys,
  set: (val) => emit("update:expandedKeys", val),
});

const childTypeModel = computed({
  get: () => props.newChildType,
  set: (val) => emit("update:newChildType", val as boolean | string),
});

const catalogItemModel = computed({
  get: () => props.catalogItemId,
  set: (val) => emit("update:catalogItemId", val as string),
});

// const newChildRequieredModel = computed({
//   get: () => props.newChildRequiered,
//   set: (val) => emit("update:newChildRequiered", val),
// });

const handleNodeClick = (node: StoreTreeNode) => {
  if (!node.isEditing && hasPermission("document-templates", "R")) {
    emit("nodeClick", node);
  }
};

const handleConfirmClick = (node: StoreTreeNode) => {
  if (node.key?.toString().startsWith("temp-")) {
    emit("confirmAddChild", node);
  } else {
    emit("confirmEditNode", node);
  }
};

const handleCancelClick = (node: StoreTreeNode) => {
  if (node.key?.toString().startsWith("temp-")) {
    emit("cancelAddChild");
  } else {
    emit("cancelEditNode");
  }
};

watch(
  () => childTypeModel.value,
  (newType) => {
    if (newType !== "template" && newType !== "form") {
      catalogItemModel.value = null;
    } else {
      catalogItemModel.value = "";
    }
  }
);
</script>

<template>
  <Tree
    v-model:expanded-keys="expandedKeysModel"
    selection-mode="single"
    :value="nodes as any"
    class="w-full"
  >
    <template #default="slotProps">
      <div
        class="flex items-center gap-2 p-1 rounded transition-colors min-w-0"
        :style="{
          marginLeft: (slotProps.node.level - 1) * 20 + 'px',
          borderLeft:
            slotProps.node.level > 1
              ? '1px solid rgba(255,255,255,0.06)'
              : 'none',
          paddingLeft: '8px',
        }"
        :class="{
          'cursor-pointer':
            (slotProps.node.children?.length ?? 0) > 0 &&
            !slotProps.node.isEditing,
          'cursor-default':
            !slotProps.node.children?.length || slotProps.node.isEditing,
          ' bg-p-terciary dark:bg-p-primary text-gray-800 dark:text-white':
            props.selectable &&
            slotProps.node.key === props.selectedKey &&
            !slotProps.node.isAddButton,
        }"
        @click="handleNodeClick(slotProps.node as StoreTreeNode)"
      >
        <!-- 🔹 Si es un nodo temporal de edición -->
        <template v-if="slotProps.node.isEditing">
          <VueSelect
            v-model="childTypeModel"
            :options="newChildTypeOptions"
            label="label"
            :reduce="(payerGroup: Record<string, unknown>) => payerGroup.value"
            data-testid="tree-select"
            :clearable="false"
            class="w-full sm:min-w-60 md:min-w-50 lg:min-w-50 border border-gray-300 px-4 py-1 rounded-md text-gray-400"
            :class="
              slotProps.node.type !== 'temp' &&
              ((slotProps.node?.children?.length ?? 0) > 0 ||
                slotProps.node.has_templates)
                ? 'cursor-not-allowed is-disabled'
                : 'is-enabled'
            "
            :calculate-position="usePopperPosition"
            :append-to-body="true"
            :disabled="
              slotProps.node.type !== 'temp' &&
              ((slotProps.node?.children?.length ?? 0) > 0 ||
                slotProps.node.has_templates)
            "
          >
            <template #option="{ label }">
              <div class="flex items-center gap-1 px-1 py-1">
                <FolderOpen v-if="label === 'Folder'" class="icon-amber" />
                <Globe
                  v-else-if="label === 'Service'"
                  class="w-4 h-4 text-blue-500"
                />
                <IdCard
                  v-else-if="label === 'Placeholder'"
                  class="w-4 h-4 text-blue-500"
                />
                <FileText
                  v-else-if="label === 'Template'"
                  class="icon-small-size"
                />
                <Form v-else-if="label === 'Form'" class="icon-small-size" />
                <span class="text-gray-800 dark:text-gray-400">{{
                  label
                }}</span>
              </div>
            </template>

            <template #selected-option="{ label }">
              <div class="flex items-center gap-2">
                <FolderOpen v-if="label === 'Folder'" class="icon-amber" />
                <Globe
                  v-else-if="label === 'Service'"
                  class="w-4 h-4 text-blue-500"
                />
                <IdCard
                  v-else-if="label === 'Placeholder'"
                  class="icon-small-size"
                />
                <FileText
                  v-else-if="label === 'Template'"
                  class="w-4 h-4 text-blue-500"
                />
                <Form v-else-if="label === 'Form'" class="icon-small-size" />
                <span class="text-gray-700 dark:text-gray-100">{{
                  label
                }}</span>
              </div>
            </template>
          </VueSelect>
          <div v-if="childTypeModel === 'template'">
            <VueSelect
              v-model="catalogItemModel"
              :options="catalogOptions"
              label="name"
              :reduce="(status: Record<string, unknown>) => status.id"
              class="w-full sm:min-w-60 md:min-w-[320px] lg:min-w-[320px] max-h-full border border-gray-300 px-4 py-1 rounded-md"
              placeholder="Select a template"
              :calculate-position="usePopperPosition"
              :append-to-body="true"
              :clearable="false"
            >
              <!-- cómo se ven las opciones en el dropdown -->
              <template #option="{ name }">
                <span class="text-gray-700 dark:text-gray-400">
                  {{ name }}
                </span>
              </template>

              <!-- cómo se ve la opción seleccionada -->
              <template #selected-option="{ name }">
                <span class="text-gray-700 dark:text-gray-100">
                  {{ name }}
                </span>
              </template>
            </VueSelect>
          </div>

          <div v-if="childTypeModel === 'form'">
            <VueSelect
              v-model="catalogItemModel"
              :options="catalogOptions"
              label="name"
              :reduce="(status: Record<string, unknown>) => status.id"
              class="w-full sm:min-w-60 md:min-w-[320px] lg:min-w-[320px] max-h-full border border-gray-300 px-4 py-1 rounded-md"
              placeholder="Select a form"
              :calculate-position="usePopperPosition"
              :append-to-body="true"
              :clearable="false"
            >
              <!-- cómo se ven las opciones en el dropdown -->
              <template #option="{ name }">
                <span class="text-gray-700 dark:text-gray-400">
                  {{ name }}
                </span>
              </template>

              <!-- cómo se ve la opción seleccionada -->
              <template #selected-option="{ name }">
                <span class="text-gray-700 dark:text-gray-100">
                  {{ name }}
                </span>
              </template>
            </VueSelect>
          </div>

          <div
            v-if="childTypeModel !== 'template' && childTypeModel !== 'form'"
            class="flex flex-col gap-1 w-full"
          >
            <Field
              v-slot="{ errors, field, meta }"
              v-model="slotProps.node.newChildName"
              :name="'node Name'"
              rules="required|max:255"
            >
              <input
                v-bind="field"
                v-model="slotProps.node.newChildName"
                placeholder="New child name"
                class="input-base sm:min-w-60 md:min-w-50 lg:min-w-50 dark:bg-secondary"
              />
              <span v-if="errors.length" class="text-red-500 text-xs mt-1">
                {{ errors[0] }}
              </span>

              <!-- Store valid state for buttons if needed -->
              <div v-show="false">
                {{ (slotProps.node as any).isValid = meta.valid }}
              </div>
            </Field>
          </div>

          <!-- <div v-if="childTypeModel === 'placeholder'"> //Por el momento se oculta porque no se sabe que hacer con esta opción DC-1151
            <div class="flex items-center">
              <Checkbox
                v-model="newChildRequieredModel"
                inputId="required-checkbox"
                :binary="true"
                class="focus:ring-2 focus:ring-blue-500 rounded"
              />
              <span class="text-gray-700 dark:text-gray-100 ml-1">
                Required
              </span>
            </div>
          </div> -->
          <button
            v-if="hasPermission('document-templates', 'U')"
            class="px-2 py-1 bg-green-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            :disabled="
              childTypeModel !== 'template' &&
              childTypeModel !== 'form' &&
              !(slotProps.node as any).isValid
            "
            aria-label="Confirm"
            @click.stop="handleConfirmClick(slotProps.node as StoreTreeNode)"
          >
            <Check class="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            class="px-2 py-1 bg-red-400 text-black rounded cursor-pointer"
            aria-label="Cancel"
            @click.stop="handleCancelClick(slotProps.node as StoreTreeNode)"
          >
            <X class="w-4 h-4" aria-hidden="true" />
          </button>
        </template>

        <!-- 🔹 Renderizado normal de nodo -->
        <template v-else>
          <template v-if="slotProps.node.isAddButton">
            <button
              class="flex items-center gap-2 px-3 py-1 text-sm rounded text-dark dark:text-white border border-border-light"
              @click.stop="
                emit('startAddChild', slotProps.node as StoreTreeNode)
              "
            >
              <Plus class="w-4 h-4" />
              {{ slotProps.node.label }}
            </button>
          </template>
          <template v-else>
            <Plus
              v-if="slotProps.node.isAddButton"
              class="w-4 h-4 text-green-500"
            />

            <!-- Caso 1: carpeta -->
            <FolderOpen
              v-if="
                slotProps.node.type === 'folder' ||
                (slotProps.node.has_children === true &&
                  !slotProps.node.isAddButton)
              "
              v-tooltip="'Folder'"
              class="icon-amber"
            />

            <!-- Caso 2: template -->
            <FileText
              v-else-if="
                slotProps.node.type === 'template' &&
                !slotProps.node.is_provider_override
              "
              v-tooltip="'Template'"
              class="w-4 h-4 text-blue-500"
            />

            <FileUser
              v-else-if="
                slotProps.node.type === 'template' &&
                slotProps.node.is_provider_override
              "
              v-tooltip="'This is a custom template for this provider'"
              class="w-4 h-4 text-teal-500"
            />

            <!-- Caso 3: placeholder -->
            <IdCard
              v-else-if="slotProps.node.type === 'placeholder'"
              v-tooltip="'Placeholder'"
              class="icon-small-size"
            />

            <Form
              v-else-if="slotProps.node.type === 'form'"
              v-tooltip="'Form'"
              class="icon-small-size"
            />

            <!-- Caso 4: cualquier otro -->
            <Globe
              v-if="
                slotProps.node.has_children === false &&
                !slotProps.node.isAddButton &&
                slotProps.node.type !== 'placeholder' &&
                slotProps.node.type !== 'folder' &&
                slotProps.node.type !== 'template' &&
                slotProps.node.type !== 'form'
              "
              v-tooltip="'Service'"
              class="w-4 h-4 text-blue-500"
            />

            <span class="flex-1 min-w-0" :title="slotProps.node.label">
              {{
                (slotProps.node.label || "").length > 60
                  ? (slotProps.node.label || "").substring(0, 60) + ".."
                  : slotProps.node.label || ""
              }}
            </span>

            <div
              v-if="
                slotProps.node.type === 'form' &&
                (slotProps.node.data as any)?.selection_group
              "
              class="ml-2 flex items-center shrink-0"
            >
              <span
                v-tooltip="
                  'Selection Group: ' +
                  (slotProps.node.data as any).selection_group
                "
                class="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm whitespace-nowrap"
              >
                {{ (slotProps.node.data as any).selection_group }}
              </span>
            </div>

            <div
              v-if="
                slotProps.node.type === 'template' &&
                (slotProps.node.data as any)?.is_main
              "
              class="flex ml-2 items-center"
            >
              <span
                v-tooltip="'Main Template'"
                class="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-green-500/10 text-green-500 border border-green-500/20 shadow-sm whitespace-nowrap"
              >
                Main Template
              </span>
            </div>

            <div class="mr-2 flex items-center gap-2">
              <slot name="actions" :node="slotProps.node as StoreTreeNode" />
            </div>
          </template>
        </template>
      </div>
    </template>
  </Tree>
</template>

<style scoped>
:deep(.p-tree-node-children) {
  padding-left: 1rem;
}
</style>
