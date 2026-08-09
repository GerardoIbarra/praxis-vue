<script setup lang="ts">
import { useMedicalChartModalFormSection } from "@/stores/medicalChart/modalForm";
import { FolderOpen, UserCog, ChevronDown, ChevronRight } from "@lucide/vue";
import type { TreeItem } from "@/types/api/common";

defineProps<{
  items: TreeItem[];
}>();

defineSlots<{
  actions(props: { item: TreeItem }): unknown;
  itemAdd(props: { item: TreeItem }): unknown;
  itemAddChildren(props: { item: TreeItem }): unknown;
}>();

const ModalSection = useMedicalChartModalFormSection();
const { toggleOrInsert } = ModalSection;
</script>

<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :key="item.id || item.key || index"
      class="py-1"
    >
      <!-- 🔹 Agregar raíz -->
      <template v-if="item.type === 'virtual-add-root'">
        <div>
          <slot name="itemAdd" :item="item" />
        </div>
      </template>

      <!-- 🔹 Agregar hijo temporal -->
      <template v-else-if="item.type === 'virtual-add-child'">
        <slot name="itemAddChildren" :item="item" />
      </template>

      <!-- 🔹 Nodo normal -->
      <template v-else>
        <div
          class="cursor-pointer select-none rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-300 gap-4"
          @click="toggleOrInsert(item)"
        >
          <div class="flex items-start min-w-0 flex-1">
            <span
              v-if="item.children && item.children.length"
              class="text-gray-500 text-xs pr-4 flex-shrink-0"
            >
              <ChevronDown v-if="item.showChildren" class="h-5 w-5" />
              <ChevronRight v-else class="h-5 w-5" />
            </span>

            <FolderOpen
              v-if="
                (item.children && item.children.length > 0) ||
                item.is_directory === true
              "
              class="w-5 h-5 text-amber-500 mr-2 mt-[0.1rem] flex-shrink-0"
            />

            <UserCog
              v-if="item.is_user_uploaded && item.is_user_uploaded === true"
              class="w-5 h-5 text-neutral-500 mr-2 mt-[0.1rem] flex-shrink-0"
            />

            <span class="text-black break-words min-w-0 flex-1">{{
              item.label
            }}</span>
          </div>

          <div class="mr-2 flex gap-2 flex-shrink-0 items-center">
            <slot name="actions" :item="item" />
          </div>
        </div>

        <div
          v-if="item.showChildren && item.children && item.children.length"
          class="ml-4 border-l border-gray-400 pl-2"
        >
          <TreeList :items="item.children">
            <template #itemAddChildren="props">
              <slot name="itemAddChildren" v-bind="props" />
            </template>

            <template #actions="props">
              <slot name="actions" v-bind="props" />
            </template>
          </TreeList>
        </div>
      </template>
    </li>
  </ul>
</template>
