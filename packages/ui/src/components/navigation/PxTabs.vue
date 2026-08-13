<script setup lang="ts">
import { computed, type PropType } from "vue";
import {
  User,
  Info,
  MapPinned,
  Dock,
  Handshake,
  Receipt,
  ShieldUser,
  FileLock2,
  File,
  History,
  Calendar,
  FolderTree,
  Workflow,
  Layout,
  FileText,
  X,
  FileUser,
  IdCardLanyard,
  Settings,
  Activity,
  Award,
  DollarSign,
  Store,
  Box,
  ClipboardList,
  Users,
} from "@lucide/vue";
import type { TabItemConfig } from "@/types/api/common";

const icons = {
  User,
  Info,
  MapPinned,
  Dock,
  Handshake,
  Receipt,
  ShieldUser,
  FileLock2,
  File,
  History,
  Calendar,
  FolderTree,
  Workflow,
  Layout,
  FileText,
  X,
  FileUser,
  IdCardLanyard,
  Settings,
  Activity,
  Award,
  DollarSign,
  Store,
  Box,
  ClipboardList,
  Users,
};

const props = defineProps({
  tabs: { type: Array as PropType<TabItemConfig[]>, required: true },
  modelValue: { type: String, required: true },
  protectedTabs: { type: Array as PropType<string[]>, default: () => [] },
});

const emit = defineEmits(["update:modelValue", "remove-tab"]);

const visibleTabs = computed(() => {
  if (props.tabs.length <= 0) {
    return;
  }
  return props.tabs.filter((tab) => tab.show !== false);
});

function select(tab: TabItemConfig) {
  if (tab.command) {
    tab.command();
    return;
  }
  emit("update:modelValue", tab.key);
}

const removeTab = (key: string | number) => {
  emit("remove-tab", key);
};
</script>

<template>
  <div class="mb-4 bg-white dark:bg-surface-800 border border-border-light rounded-md">
    <div class="flex justify-between">
      <ul
        class="flex overflow-x-auto min-w-0 flex-1 whitespace-nowrap -mb-px text-sm font-medium text-center no-scrollbar"
      >
        <li v-for="tab in visibleTabs" :key="tab.key" class="mr-2">
          <button
            :title="tab.tooltip"
            :aria-selected="modelValue === tab.key"
            class="p-4 border-b-2 rounded-t-lg flex items-center transition-colors duration-200 outline-none w-full text-left"
            :class="[
              protectedTabs.includes(tab.key) && tab.enabled === false
                ? 'text-gray-500 border-transparent cursor-not-allowed '
                : modelValue === tab.key
                  ? 'text-blue-600 border-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer'
                  : 'text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-600 hover:bg-secondary cursor-pointer',
            ]"
            @click="select(tab)"
          >
            <component
              :is="(icons as Record<string, any>)[tab.icon]"
              class="w-4 h-4 mr-2"
            />
            {{ tab.label }}

            <div
              v-if="tab.removeTab"
              class="ml-2 text-red-600 hover:text-error py-1 px-1 rounded-md cursor-pointer"
              :class="[
                modelValue === tab.key
                  ? 'bg-gray-200 hover:bg-gray-400'
                  : 'border border-gray-400  hover:bg-secondary',
              ]"
              @click.stop="removeTab(tab.key)"
            >
              <X class="w-3 h-3" />
            </div>
          </button>
        </li>
      </ul>

      <div class="flex items-center pr-4 gap-2">
        <slot name="actions" />
        <slot name="getback" />
      </div>
    </div>
  </div>
</template>
