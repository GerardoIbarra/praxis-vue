<script setup lang="ts">
import VueSelect from "vue-select";
import { computed, ref, onMounted } from "vue";
import "vue-select/dist/vue-select.css";

export interface ActivityOption {
  value?: string | number;
  id?: string | number;
  name: string;
  label?: string;
  color?: string;
  duration?: number;
  [key: string]: unknown;
}

export interface GroupOption {
  value?: string | number;
  id?: string | number;
  name: string;
  label?: string;
  color?: string;
  activities?: ActivityOption[];
  children?: ActivityOption[];
  [key: string]: unknown;
}

export interface FlattenedOption {
  id: string | number;
  displayName: string;
  isGroup: boolean;
  parentId?: string | number;
  childIds?: (string | number)[];
  color?: string;
  duration?: number;
  raw: GroupOption | ActivityOption;
  [key: string]: unknown;
}

interface Props {
  modelValue?: (string | number | Record<string, unknown>)[];
  options: GroupOption[];
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce?: (option: any) => unknown;
  placeholder?: string;
  selectClass?: string;
  disabled?: boolean;
  showSelectAll?: boolean;
  showDuration?: boolean;
  showColor?: boolean;
  useCombinedId?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  label: "label",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce: (option: any) => option.id ?? option.value ?? option,
  placeholder: "",
  selectClass: "vue-select-standard text-gray-400",
  disabled: false,
  showSelectAll: true,
  showDuration: true,
  showColor: true,
  useCombinedId: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: unknown[]): void;
}>();

const vueSelectRef = ref<InstanceType<typeof VueSelect> | null>(null);

// Helper to get unique value/id from any option
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOptionValue = (option: Record<string, any>): string | number => {
  return option.id ?? option.value ?? option.name;
};

const getRawChildId = (id: string | number): string | number => {
  return typeof id === "string" && id.includes("_") ? id.split("_")[1] : id;
};

// All child activities flattened
const allChildren = computed(() => {
  const children: ActivityOption[] = [];
  for (const group of props.options) {
    const list = group.activities || group.children || [];
    children.push(...list);
  }
  return children;
});

const uniqueChildrenCount = computed(() => {
  const seenIds = new Set<string | number>();
  for (const child of allChildren.value) {
    seenIds.add(getOptionValue(child));
  }
  return seenIds.size;
});

// Flattened list for vue-select :options
const flattenedOptions = computed<FlattenedOption[]>(() => {
  const result: FlattenedOption[] = [];
  for (const group of props.options) {
    const list = group.activities || group.children || [];
    const groupId = getOptionValue(group);
    const childIds = list.map((c) => {
      const childId = getOptionValue(c);
      return props.useCombinedId ? `${groupId}_${childId}` : childId;
    });

    // Group Header
    result.push({
      id: groupId,
      displayName:
        (group[props.label || "label"] as string) || group.label || group.name,
      isGroup: true,
      childIds,
      color: group.color,
      raw: group,
    });

    // Children Activities
    for (const child of list) {
      const childId = getOptionValue(child);
      const uniqueId = props.useCombinedId ? `${groupId}_${childId}` : childId;
      result.push({
        id: uniqueId,
        displayName:
          (child[props.label || "label"] as string) ||
          child.label ||
          child.name,
        isGroup: false,
        parentId: groupId,
        color: child.color || group.color,
        duration: child.duration,
        raw: child,
      });
    }
  }
  return result;
});

const searchQuery = ref("");

const handleSearch = (search: string) => {
  searchQuery.value = search;
};

const handleClose = () => {
  if (vueSelectRef.value) {
    (vueSelectRef.value as unknown as { search: string }).search = "";
  }
  searchQuery.value = "";
};

// Computed options that deduplicates child activities when searching
const displayOptions = computed(() => {
  if (!searchQuery.value) {
    return flattenedOptions.value;
  }

  const query = searchQuery.value.toLowerCase().trim();
  const result: FlattenedOption[] = [];
  const seenIds = new Set<string | number>();

  // 1. Identify matching group IDs
  const matchingGroupIds = new Set<string | number>();
  for (const option of flattenedOptions.value) {
    if (option.isGroup) {
      const groupName = (option.displayName || "").toLowerCase();
      if (groupName.includes(query)) {
        matchingGroupIds.add(option.id);
      }
    }
  }

  // 2. Filter child activities
  for (const option of flattenedOptions.value) {
    if (option.isGroup) continue;

    const nameMatch = (option.displayName || "").toLowerCase().includes(query);
    const parentMatch =
      option.parentId !== undefined && matchingGroupIds.has(option.parentId);

    if (nameMatch || parentMatch) {
      const rawId = getOptionValue(option.raw);
      if (!seenIds.has(rawId)) {
        seenIds.add(rawId);
        result.push(option);
      }
    }
  }

  return result;
});

// Normalized array of selected IDs (always converted to raw IDs to prevent duplicates and synchronize states)
const selectedIds = computed<(string | number)[]>(() => {
  if (!Array.isArray(props.modelValue)) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return props.modelValue.map((item: any) => {
    const val =
      item !== null && typeof item === "object"
        ? (item.id ?? item.value ?? item.name)
        : item;
    return getRawChildId(val);
  });
});

// Computed modelValue for VueSelect binding (returns exactly one option per selected raw ID)
const computedModelValue = computed({
  get: () => {
    const result: FlattenedOption[] = [];
    const seenRawIds = new Set<string | number>();
    for (const opt of flattenedOptions.value) {
      if (opt.isGroup) continue;
      const rawId = getOptionValue(opt.raw);
      if (selectedIds.value.includes(rawId) && !seenRawIds.has(rawId)) {
        seenRawIds.add(rawId);
        result.push(opt);
      }
    }
    return result;
  },
  set: (selectedItems: FlattenedOption[]) => {
    const groupOpt = selectedItems.find((opt) => opt.isGroup);
    if (groupOpt) {
      toggleGroup(groupOpt);
      return;
    }
    const newValues = selectedItems
      .filter((item) => !item.isGroup)
      .map((item) => {
        return props.reduce ? props.reduce(item.raw) : getOptionValue(item.raw);
      });
    emit("update:modelValue", newValues);
  },
});

// Checkbox state helpers
const isChildSelected = (option: FlattenedOption): boolean => {
  const rawId = getOptionValue(option.raw);
  return selectedIds.value.includes(rawId);
};

const isGroupSelected = (option: FlattenedOption): boolean => {
  if (!option.childIds || option.childIds.length === 0) return false;
  const groupRawIds = option.childIds.map((id) => getRawChildId(id));
  return groupRawIds.every((id) => selectedIds.value.includes(id));
};

const isGroupIndeterminate = (option: FlattenedOption): boolean => {
  if (!option.childIds || option.childIds.length === 0) return false;
  const groupRawIds = option.childIds.map((id) => getRawChildId(id));
  const selectedCount = groupRawIds.filter((id) =>
    selectedIds.value.includes(id)
  ).length;
  return selectedCount > 0 && selectedCount < groupRawIds.length;
};

const isAllSelected = computed<boolean>(() => {
  const childOpts = flattenedOptions.value.filter((opt) => !opt.isGroup);
  if (childOpts.length === 0) return false;
  return childOpts.every((opt) =>
    selectedIds.value.includes(getOptionValue(opt.raw))
  );
});

const isSomeSelected = computed<boolean>(() => {
  return selectedIds.value.length > 0;
});

// Actions
const toggleChild = (option: FlattenedOption) => {
  const rawId = getOptionValue(option.raw);
  const isSelected = selectedIds.value.includes(rawId);
  let newRawIds: (string | number)[];
  if (isSelected) {
    newRawIds = selectedIds.value.filter((id) => id !== rawId);
  } else {
    newRawIds = [...selectedIds.value, rawId];
  }
  emitIds(newRawIds);
};

const toggleGroup = (option: FlattenedOption) => {
  if (!option.childIds) return;
  const groupSelected = isGroupSelected(option);
  const groupRawIds = option.childIds.map((id) => getRawChildId(id));
  let newRawIds: (string | number)[];
  if (groupSelected) {
    // Deselect all children in this group
    newRawIds = selectedIds.value.filter((id) => !groupRawIds.includes(id));
  } else {
    // Select all children in this group
    const toAdd = groupRawIds.filter((id) => !selectedIds.value.includes(id));
    newRawIds = [...selectedIds.value, ...toAdd];
  }
  emitIds(newRawIds);
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emitIds([]);
  } else {
    const allRawIds = Array.from(
      new Set(
        flattenedOptions.value
          .filter((opt) => !opt.isGroup)
          .map((opt) => getOptionValue(opt.raw))
      )
    );
    emitIds(allRawIds);
  }
};

const emitIds = (ids: (string | number)[]) => {
  const rawIds = ids.map((id) => getRawChildId(id));
  const newValuesSet = new Set<string | number>();
  for (const opt of flattenedOptions.value) {
    if (opt.isGroup) continue;
    const rawId = getOptionValue(opt.raw);
    if (rawIds.includes(rawId)) {
      const reducedValue = props.reduce ? props.reduce(opt.raw) : rawId;
      newValuesSet.add(reducedValue as string | number);
    }
  }
  emit("update:modelValue", Array.from(newValuesSet));

  handleClose();
};

const handleOptionClick = (option: FlattenedOption) => {
  if (option.isGroup) {
    toggleGroup(option);
  } else {
    toggleChild(option);
  }
};

// Custom search filter that preserves parent groups when child matches
const customFilterBy = (
  option: FlattenedOption,
  label: string,
  search: string
) => {
  if (!search) return true;
  const query = search.toLowerCase().trim();
  const nameMatch = (option.displayName || "").toLowerCase().includes(query);
  if (nameMatch) return true;

  if (option.isGroup && option.childIds) {
    return option.childIds.some((id) => {
      const child = allChildren.value.find((c) => getOptionValue(c) === id);
      const childName = child
        ? (child[props.label || "label"] as string) ||
          child.label ||
          child.name ||
          ""
        : "";
      return String(childName).toLowerCase().includes(query);
    });
  } else if (!option.isGroup && option.parentId !== undefined) {
    const parentGroup = props.options.find(
      (g) => getOptionValue(g) === option.parentId
    );
    if (parentGroup) {
      const parentName =
        (parentGroup[props.label || "label"] as string) ||
        parentGroup.label ||
        parentGroup.name ||
        "";
      if (String(parentName).toLowerCase().includes(query)) {
        return true;
      }
    }
  }
  return false;
};

const getOptionIndex = (option: FlattenedOption) => {
  return computedModelValue.value.findIndex((item) => item.id === option.id);
};

const showAllTags = computed(() => computedModelValue.value.length <= 4);

onMounted(() => {
  if (vueSelectRef.value) {
    // Override maybeAdjustScroll to fix the scroll-jumping issue when praxis-list-header slot is used
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (vueSelectRef.value as any).maybeAdjustScroll = function () {
      const menu = this.$refs.dropdownMenu;
      if (!menu) return;

      // Adjust index by +1 if showSelectAll is true because of the header slot
      const hasHeader =
        menu.children[0] &&
        !menu.children[0].classList.contains("vs__dropdown-option");
      const index = this.typeAheadPointer + (hasHeader ? 1 : 0);
      const activeEl = menu.children[index];
      if (activeEl) {
        const viewport = this.getDropdownViewport();
        const {
          top: n,
          bottom: l,
          height: i,
        } = activeEl.getBoundingClientRect();

        if (n < viewport.top) {
          menu.scrollTop = activeEl.offsetTop;
        } else if (l > viewport.bottom) {
          menu.scrollTop = activeEl.offsetTop - (viewport.height - i);
        }
      }
    };
  }
});
</script>

<template>
  <VueSelect
    ref="vueSelectRef"
    v-model="computedModelValue"
    :options="displayOptions"
    :label="'displayName'"
    :multiple="true"
    :disabled="disabled"
    :selectable="() => true"
    :filter-by="customFilterBy"
    :placeholder="placeholder"
    :class="[selectClass, disabled ? 'is-disabled' : 'is-enabled']"
    @search="handleSearch"
    @close="handleClose"
  >
    <!-- Header: Seleccionar todo / Select All -->
    <template v-if="showSelectAll" #praxis-list-header>
      <div
        class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors"
        @click.stop.prevent="toggleSelectAll"
      >
        <div class="flex items-center gap-2.5">
          <input
            type="checkbox"
            :checked="isAllSelected"
            :indeterminate="isSomeSelected && !isAllSelected"
            class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 w-4 h-4 pointer-events-none"
            @click.stop
          />
          <span
            class="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300"
          >
            Seleccionar todo
          </span>
        </div>
        <span class="text-xs font-medium text-gray-400 dark:text-gray-400">
          {{ selectedIds.length }} / {{ uniqueChildrenCount }}
        </span>
      </div>
    </template>

    <!-- Option row in dropdown -->
    <template #option="option">
      <div
        class="flex items-center gap-2.5 py-2 px-3 select-none w-full transition-colors"
        :class="[
          option.isGroup
            ? 'font-semibold text-gray-800 dark:text-gray-100 bg-gray-50/90 dark:bg-gray-800/60 border-y border-gray-100 dark:border-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
            : 'pl-8 text-gray-600 dark:text-gray-300 font-normal cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/20',
        ]"
        @click.stop.prevent="handleOptionClick(option)"
      >
        <!-- Checkbox -->
        <input
          type="checkbox"
          :checked="
            option.isGroup ? isGroupSelected(option) : isChildSelected(option)
          "
          :indeterminate="option.isGroup && isGroupIndeterminate(option)"
          class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 w-4 h-4 pointer-events-none"
          @click.stop
        />

        <!-- Color dot -->
        <div
          v-if="showColor && option.color"
          class="w-4 h-4 rounded border border-gray-300 shrink-0"
          :style="{ backgroundColor: option.color?.startsWith('#') ? option.color : '#' + option.color }"
        ></div>

        <!-- Name / Label -->
        <span class="truncate flex-1 text-sm">{{ option.displayName }}</span>

        <!-- Duration Badge -->
        <span
          v-if="!option.isGroup && showDuration && option.duration"
          class="text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-gray-700/70 px-1.5 py-0.5 rounded"
        >
          {{ option.duration }} min
        </span>
      </div>
    </template>

    <!-- Selected option tag/pill -->
    <template
      #selected-option-container="{
        option,
        deselect,
        multiple,
        disabled: slotDisabled,
      }"
    >
      <span
        v-if="showAllTags || getOptionIndex(option) < 3"
        class="vs__selected"
      >
        <div
          v-if="showColor && option.color"
          class="w-4 h-4 rounded border border-gray-300 shrink-0"
          :style="{ backgroundColor: option.color?.startsWith('#') ? option.color : '#' + option.color }"
        ></div>
        <span class="truncate ml-2 max-w-30"> {{ option.displayName }} </span>
        <button
          v-if="multiple"
          :disabled="slotDisabled"
          type="button"
          class="vs__deselect"
          aria-label="Deselect option"
          @click="deselect(option)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </span>
      <span
        v-else-if="getOptionIndex(option) === 3"
        class="vs__selected bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-none font-medium px-2 py-0.5 rounded text-xs select-none"
      >
        +{{ computedModelValue.length - 3 }} más
      </span>
      <span v-else style="display: none"></span>
    </template>
  </VueSelect>
</template>

<style scoped>
/* Force truncation on vue-select selected option only for single select */
:deep(.vs--single .vs__selected-options) {
  flex-wrap: nowrap !important;
  overflow: hidden !important;
  min-width: 0 !important;
}

:deep(.vs--single .vs__selected) {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  max-width: 100% !important;
  min-width: 0 !important;
}

:deep(.vs--single .vs__selected > div) {
  overflow: hidden !important;
  max-width: 100% !important;
}

:deep(.vs--single .vs__selected span) {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
</style>
