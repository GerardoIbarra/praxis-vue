<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { MoreVertical } from "@lucide/vue";
import type { ActionMenuItem } from "@/types/ui/navigation";

defineProps<{
  items: ActionMenuItem[];
}>();

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const toggle = (event: MouseEvent) => {
  isOpen.value = !isOpen.value;
};

const close = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", close);
});

onUnmounted(() => {
  document.removeEventListener("click", close);
});
</script>

<template>
  <div class="relative inline-flex items-center" ref="menuRef">
    <button
      type="button"
      aria-label="Open actions menu"
      aria-haspopup="true"
      class="flex items-center justify-center p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"
      @click.stop="toggle"
    >
      <MoreVertical class="tree-templete-format" aria-hidden="true" />
    </button>
    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 py-1"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        @click="
          () => {
            if (item.command) item.command();
            isOpen = false;
          }
        "
      >
        <component
          :is="item.lucideIcon"
          v-if="item.lucideIcon"
          class="w-4 h-4"
          :class="item.class"
        />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
