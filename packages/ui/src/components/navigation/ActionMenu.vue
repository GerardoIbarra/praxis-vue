<script setup lang="ts">
import { ref } from "vue";
import { MoreVertical } from "@lucide/vue";
import { Menu } from "primevue";
import type { ActionMenuItem } from "@/types/ui/navigation";

defineProps<{
  items: ActionMenuItem[];
}>();

const menu = ref<InstanceType<typeof Menu> | null>(null);

const toggle = (event: MouseEvent) => {
  menu.value?.toggle(event as Event);
};
</script>

<template>
  <div class="inline-flex items-center">
    <button
      type="button"
      aria-label="Open actions menu"
      aria-haspopup="true"
      class="flex items-center justify-center p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"
      @click.stop="toggle($event)"
    >
      <MoreVertical class="tree-templete-format" aria-hidden="true" />
    </button>
    <Menu ref="menu" :popup="true" :model="items">
      <template #item="{ item }">
        <div
          class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-p-terciary! dark:hover:text-black!"
        >
          <component
            :is="item.lucideIcon"
            v-if="item.lucideIcon"
            class="w-4 h-4"
            :class="item.class"
          />
          <span>{{ item.label }}</span>
        </div>
      </template>
    </Menu>
  </div>
</template>
