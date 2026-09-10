<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { Search, X, CornerDownLeft, Command, ArrowUp, ArrowDown } from "@lucide/vue";
import type { CommandItem } from "@/types/ui/commandPalette";

export type { CommandItem };

interface Props {
  modelValue?: boolean;
  commands?: CommandItem[];
  placeholder?: string;
  emptyText?: string;
  disableShortcut?: boolean;
  shortcutKey?: string; // 'k' by default
  maxHeight?: string;
  closeOnSelect?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  commands: () => [],
  placeholder: "Escribe un comando o busca...",
  emptyText: "No se encontraron resultados",
  disableShortcut: false,
  shortcutKey: "k",
  maxHeight: "max-h-80",
  closeOnSelect: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "select", item: CommandItem): void;
  (e: "open"): void;
  (e: "close"): void;
}>();

const query = ref("");
const selectedIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

// Visibility management
const isOpen = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit("update:modelValue", val);
    if (val) emit("open");
    else emit("close");
  },
});

// Normalized search filter
const filteredCommands = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return props.commands;

  return props.commands.filter((cmd) => {
    const titleMatch = cmd.title.toLowerCase().includes(q);
    const subtitleMatch = cmd.subtitle?.toLowerCase().includes(q) ?? false;
    const groupMatch = cmd.group?.toLowerCase().includes(q) ?? false;
    const keywordMatch = cmd.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false;
    return titleMatch || subtitleMatch || groupMatch || keywordMatch;
  });
});

// Group filtered commands
const groupedCommands = computed(() => {
  const groups: Record<string, CommandItem[]> = {};
  const ungrouped: CommandItem[] = [];

  for (const cmd of filteredCommands.value) {
    if (cmd.group) {
      if (!groups[cmd.group]) groups[cmd.group] = [];
      groups[cmd.group].push(cmd);
    } else {
      ungrouped.push(cmd);
    }
  }

  const result: { name?: string; items: CommandItem[] }[] = [];
  if (ungrouped.length > 0) {
    result.push({ items: ungrouped });
  }
  for (const [name, items] of Object.entries(groups)) {
    result.push({ name, items });
  }
  return result;
});

// Flattened active list for index traversal
const flattenedList = computed(() => {
  return groupedCommands.value.flatMap((g) => g.items);
});

// Keep selectedIndex within bounds
watch(flattenedList, (list) => {
  if (selectedIndex.value >= list.length) {
    selectedIndex.value = Math.max(0, list.length - 1);
  }
});

// Reset search and selection on open
watch(isOpen, async (val) => {
  if (val) {
    query.value = "";
    selectedIndex.value = 0;
    await nextTick();
    inputRef.value?.focus();
  }
});

const close = () => {
  isOpen.value = false;
};

const selectItem = (item: CommandItem) => {
  if (item.disabled) return;
  if (props.closeOnSelect) {
    close();
  }
  emit("select", item);
  if (typeof item.perform === "function") {
    item.perform(item);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isOpen.value) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (flattenedList.value.length === 0) return;
    let nextIndex = (selectedIndex.value + 1) % flattenedList.value.length;
    // Skip disabled
    while (flattenedList.value[nextIndex]?.disabled && nextIndex !== selectedIndex.value) {
      nextIndex = (nextIndex + 1) % flattenedList.value.length;
    }
    selectedIndex.value = nextIndex;
    scrollToActive();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (flattenedList.value.length === 0) return;
    let prevIndex = (selectedIndex.value - 1 + flattenedList.value.length) % flattenedList.value.length;
    while (flattenedList.value[prevIndex]?.disabled && prevIndex !== selectedIndex.value) {
      prevIndex = (prevIndex - 1 + flattenedList.value.length) % flattenedList.value.length;
    }
    selectedIndex.value = prevIndex;
    scrollToActive();
  } else if (e.key === "Enter") {
    e.preventDefault();
    const item = flattenedList.value[selectedIndex.value];
    if (item && !item.disabled) {
      selectItem(item);
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    close();
  }
};

const scrollToActive = () => {
  nextTick(() => {
    const activeEl = listRef.value?.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  });
};

// Global shortcut listener (Ctrl+K / Cmd+K)
const handleGlobalKeydown = (e: KeyboardEvent) => {
  if (props.disableShortcut) return;

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === props.shortcutKey.toLowerCase()) {
    e.preventDefault();
    isOpen.value = !isOpen.value;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});

defineExpose({
  open: () => {
    isOpen.value = true;
  },
  close: () => {
    isOpen.value = false;
  },
  toggle: () => {
    isOpen.value = !isOpen.value;
  },
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm transition-opacity"
        @click="close"
      />

      <!-- Command Palette Modal -->
      <div
        class="relative w-full max-w-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700/80 rounded-2xl shadow-2xl overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-150 text-surface-900 dark:text-surface-100"
        @keydown="handleKeyDown"
      >
        <!-- Search Input Bar -->
        <div class="relative flex items-center px-4 py-3.5 border-b border-surface-200 dark:border-surface-700/80 bg-surface-50/50 dark:bg-surface-800/30">
          <Search class="w-5 h-5 text-surface-400 dark:text-surface-500 shrink-0 mr-3" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            :placeholder="placeholder"
            class="w-full bg-transparent border-0 text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-0"
          />
          <button
            v-if="query"
            type="button"
            @click="query = ''"
            class="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 rounded-md transition-colors"
            title="Limpiar búsqueda"
          >
            <X class="w-4 h-4" />
          </button>
          <div class="ml-2 flex items-center gap-1 text-[11px] font-medium text-surface-400 dark:text-surface-500 border border-surface-200 dark:border-surface-700 px-1.5 py-0.5 rounded bg-white dark:bg-surface-800">
            <span>ESC</span>
          </div>
        </div>

        <!-- Command List -->
        <div
          ref="listRef"
          class="overflow-y-auto p-2 divide-y divide-surface-100 dark:divide-surface-800/50"
          :class="maxHeight"
        >
          <!-- Empty State -->
          <div v-if="flattenedList.length === 0" class="py-12 text-center text-sm text-surface-400 dark:text-surface-500">
            <slot name="empty">
              <Command class="w-8 h-8 mx-auto mb-2 opacity-30 stroke-1" />
              <p>{{ emptyText }}</p>
            </slot>
          </div>

          <!-- Grouped Commands -->
          <div
            v-for="(group, gIndex) in groupedCommands"
            :key="gIndex"
            class="py-1.5 first:pt-0 last:pb-0"
          >
            <!-- Group Header -->
            <div
              v-if="group.name"
              class="px-3 py-1 text-[11px] font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider select-none"
            >
              <slot name="group-header" :group="group.name">
                {{ group.name }}
              </slot>
            </div>

            <!-- Items in Group -->
            <div class="space-y-0.5">
              <div
                v-for="item in group.items"
                :key="item.id"
                :data-active="flattenedList[selectedIndex]?.id === item.id"
                @click="selectItem(item)"
                @mouseenter="selectedIndex = flattenedList.findIndex((i) => i.id === item.id)"
                class="group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer select-none"
                :class="[
                  flattenedList[selectedIndex]?.id === item.id
                    ? 'bg-p-primary/10 dark:bg-p-primary/20 text-p-primary'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800/60',
                  item.disabled ? 'opacity-40 cursor-not-allowed' : ''
                ]"
              >
                <slot name="item" :item="item" :active="flattenedList[selectedIndex]?.id === item.id">
                  <div class="flex items-center gap-3 min-w-0">
                    <!-- Icon -->
                    <component
                      v-if="item.icon"
                      :is="item.icon"
                      class="w-4 h-4 shrink-0 transition-colors"
                      :class="flattenedList[selectedIndex]?.id === item.id ? 'text-p-primary' : 'text-surface-400 dark:text-surface-500'"
                    />
                    
                    <div class="flex flex-col min-w-0">
                      <span class="font-medium truncate">{{ item.title }}</span>
                      <span v-if="item.subtitle" class="text-xs text-surface-400 dark:text-surface-500 truncate">
                        {{ item.subtitle }}
                      </span>
                    </div>
                  </div>

                  <!-- Right Side: Badge & Shortcut -->
                  <div class="flex items-center gap-2 shrink-0 ml-3">
                    <span
                      v-if="item.badge"
                      class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400"
                    >
                      {{ item.badge }}
                    </span>

                    <div v-if="item.shortcut && item.shortcut.length > 0" class="flex items-center gap-1">
                      <kbd
                        v-for="(key, kIndex) in item.shortcut"
                        :key="kIndex"
                        class="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-500 dark:text-surface-400 shadow-2xs"
                      >
                        {{ key }}
                      </kbd>
                    </div>

                    <CornerDownLeft
                      v-if="flattenedList[selectedIndex]?.id === item.id"
                      class="w-3.5 h-3.5 text-p-primary opacity-75"
                    />
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bar with Navigation Hints -->
        <div class="flex items-center justify-between px-4 py-2.5 text-xs text-surface-400 dark:text-surface-500 bg-surface-50/75 dark:bg-surface-800/50 border-t border-surface-200 dark:border-surface-700/80">
          <slot name="footer">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1">
                <kbd class="px-1 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">↑</kbd>
                <kbd class="px-1 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">↓</kbd>
                <span class="text-[11px]">Navegar</span>
              </div>
              <div class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">↵</kbd>
                <span class="text-[11px]">Ejecutar</span>
              </div>
            </div>
            <div class="flex items-center gap-1 text-[11px]">
              <span>Praxis Command</span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
