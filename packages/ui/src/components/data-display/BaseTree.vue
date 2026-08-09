<script setup lang="ts">
import { type TreeNode as StoreTreeNode } from "@/types/catalog/documentTemplates";
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
  ChevronRight,
  ChevronDown
} from "@lucide/vue";
import { computed, watch } from "vue";
import VueSelect from "vue-select";
import { usePopperPosition } from "@/utils/usePopperPosition";
import type { PropType } from "vue";
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
  level?: number;
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
  level: 1,
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

const handleNodeClick = (node: StoreTreeNode) => {
  if (!node.isEditing) {
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

const toggleExpand = (node: StoreTreeNode, event: MouseEvent) => {
  event.stopPropagation();
  if (node.key) {
    const keys = { ...expandedKeysModel.value };
    if (keys[node.key]) {
      delete keys[node.key];
    } else {
      keys[node.key] = true;
    }
    expandedKeysModel.value = keys;
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
  <div class="w-full">
    <template v-for="node in nodes" :key="node.key">
      <div
        class="flex items-center gap-2 p-1 rounded transition-colors min-w-0"
        :style="{
          marginLeft: (level - 1) * 20 + 'px',
          borderLeft: level > 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          paddingLeft: '8px',
        }"
        :class="{
          'cursor-pointer': (node.children?.length ?? 0) > 0 && !node.isEditing,
          'cursor-default': !node.children?.length || node.isEditing,
          'bg-p-terciary dark:bg-p-primary text-gray-800 dark:text-white':
            selectable && node.key === selectedKey && !node.isAddButton,
          'hover:bg-gray-100 dark:hover:bg-gray-800': !node.isEditing
        }"
        @click="handleNodeClick(node)"
      >
        <!-- Toggler for expansion -->
        <button 
          v-if="(node.children?.length ?? 0) > 0" 
          @click="(e) => toggleExpand(node, e)"
          class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex-shrink-0"
        >
          <ChevronDown v-if="expandedKeysModel[node.key]" class="w-4 h-4 text-gray-500" />
          <ChevronRight v-else class="w-4 h-4 text-gray-500" />
        </button>
        <div v-else class="w-6 h-6 flex-shrink-0"></div> <!-- Placeholder for alignment -->

        <!-- Editing state -->
        <template v-if="node.isEditing">
          <VueSelect
            v-model="childTypeModel"
            :options="newChildTypeOptions"
            label="label"
            :reduce="(payerGroup: Record<string, unknown>) => payerGroup.value"
            data-testid="tree-select"
            :clearable="false"
            class="w-full sm:min-w-60 md:min-w-50 lg:min-w-50 border border-gray-300 px-4 py-1 rounded-md text-gray-400"
            :class="
              node.type !== 'temp' && ((node?.children?.length ?? 0) > 0 || node.has_templates)
                ? 'cursor-not-allowed is-disabled'
                : 'is-enabled'
            "
            :calculate-position="usePopperPosition"
            :append-to-body="true"
            :disabled="node.type !== 'temp' && ((node?.children?.length ?? 0) > 0 || node.has_templates)"
          >
            <template #option="{ label }">
              <div class="flex items-center gap-1 px-1 py-1">
                <FolderOpen v-if="label === 'Folder'" class="icon-amber w-4 h-4" />
                <Globe v-else-if="label === 'Service'" class="w-4 h-4 text-blue-500" />
                <IdCard v-else-if="label === 'Placeholder'" class="w-4 h-4 text-blue-500" />
                <FileText v-else-if="label === 'Template'" class="w-4 h-4" />
                <Form v-else-if="label === 'Form'" class="w-4 h-4" />
                <span class="text-gray-800 dark:text-gray-400">{{ label }}</span>
              </div>
            </template>
            <template #selected-option="{ label }">
              <div class="flex items-center gap-2">
                <FolderOpen v-if="label === 'Folder'" class="icon-amber w-4 h-4" />
                <Globe v-else-if="label === 'Service'" class="w-4 h-4 text-blue-500" />
                <IdCard v-else-if="label === 'Placeholder'" class="w-4 h-4" />
                <FileText v-else-if="label === 'Template'" class="w-4 h-4 text-blue-500" />
                <Form v-else-if="label === 'Form'" class="w-4 h-4" />
                <span class="text-gray-700 dark:text-gray-100">{{ label }}</span>
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
            />
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
            />
          </div>

          <div v-if="childTypeModel !== 'template' && childTypeModel !== 'form'" class="flex flex-col gap-1 w-full">
            <Field v-slot="{ errors, field, meta }" v-model="node.newChildName" name="node Name" rules="required|max:255">
              <input
                v-bind="field"
                v-model="node.newChildName"
                placeholder="New child name"
                class="input-base sm:min-w-60 md:min-w-50 lg:min-w-50 dark:bg-secondary"
              />
              <span v-if="errors.length" class="text-red-500 text-xs mt-1">{{ errors[0] }}</span>
              <div v-show="false">{{ (node as any).isValid = meta.valid }}</div>
            </Field>
          </div>

          <button
            v-if="hasPermission('document-templates', 'U')"
            class="px-2 py-1 bg-green-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            :disabled="childTypeModel !== 'template' && childTypeModel !== 'form' && !(node as any).isValid"
            @click.stop="handleConfirmClick(node)"
          >
            <Check class="w-4 h-4" />
          </button>
          <button
            class="px-2 py-1 bg-red-400 text-black rounded cursor-pointer"
            @click.stop="handleCancelClick(node)"
          >
            <X class="w-4 h-4" />
          </button>
        </template>

        <!-- Normal node rendering -->
        <template v-else>
          <template v-if="node.isAddButton">
            <button
              class="flex items-center gap-2 px-3 py-1 text-sm rounded text-dark dark:text-white border border-border-light"
              @click.stop="emit('startAddChild', node)"
            >
              <Plus class="w-4 h-4" />
              {{ node.label }}
            </button>
          </template>
          
          <template v-else>
            <FolderOpen v-if="node.type === 'folder' || (node.has_children === true && !node.isAddButton)" class="w-4 h-4 text-amber-500" />
            <FileText v-else-if="node.type === 'template' && !node.is_provider_override" class="w-4 h-4 text-blue-500" />
            <FileUser v-else-if="node.type === 'template' && node.is_provider_override" class="w-4 h-4 text-teal-500" />
            <IdCard v-else-if="node.type === 'placeholder'" class="w-4 h-4" />
            <Form v-else-if="node.type === 'form'" class="w-4 h-4" />
            <Globe v-if="node.has_children === false && !node.isAddButton && !['placeholder', 'folder', 'template', 'form'].includes(node.type!)" class="w-4 h-4 text-blue-500" />

            <span class="flex-1 min-w-0 text-sm" :title="node.label">
              {{ (node.label || "").length > 60 ? (node.label || "").substring(0, 60) + ".." : node.label || "" }}
            </span>

            <div v-if="node.type === 'form' && (node.data as any)?.selection_group" class="ml-2 flex items-center shrink-0">
              <span class="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm whitespace-nowrap">
                {{ (node.data as any).selection_group }}
              </span>
            </div>

            <div v-if="node.type === 'template' && (node.data as any)?.is_main" class="flex ml-2 items-center">
              <span class="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-green-500/10 text-green-500 border border-green-500/20 shadow-sm whitespace-nowrap">
                Main Template
              </span>
            </div>

            <div class="mr-2 flex items-center gap-2">
              <slot name="actions" :node="node" />
            </div>
          </template>
        </template>
      </div>

      <!-- Recursive children -->
      <template v-if="node.children?.length && expandedKeysModel[node.key]">
        <BaseTree
          :nodes="node.children as any"
          :expanded-keys="expandedKeysModel"
          :selected-key="selectedKey"
          :selectable="selectable"
          :new-child-name="newChildName"
          :new-child-type="newChildType"
          :new-child-type-options="newChildTypeOptions"
          :catalog-item-id="catalogItemId"
          :catalog-options="catalogOptions"
          :new-child-requiered="newChildRequiered"
          :disabled="disabled"
          :level="level + 1"
          @node-click="(n) => emit('nodeClick', n)"
          @update:expanded-keys="(val) => emit('update:expandedKeys', val)"
          @update:new-child-name="(val) => emit('update:newChildName', val)"
          @update:new-child-type="(val) => emit('update:newChildType', val)"
          @update:catalog-item-id="(val) => emit('update:catalogItemId', val)"
          @update:new-child-requiered="(val) => emit('update:newChildRequiered', val)"
          @confirm-add-child="(n) => emit('confirmAddChild', n)"
          @cancel-add-child="emit('cancelAddChild')"
          @confirm-edit-node="(n) => emit('confirmEditNode', n)"
          @cancel-edit-node="emit('cancelEditNode')"
          @start-add-child="(n) => emit('startAddChild', n)"
        >
          <template #actions="slotProps">
            <slot name="actions" :node="slotProps.node" />
          </template>
        </BaseTree>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  name: "BaseTree"
}
</script>
