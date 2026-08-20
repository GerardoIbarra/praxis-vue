<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import PxSelect from "@/components/_primitives/PxSelect.vue";
import PxAvatar from "@/components/base/PxAvatar.vue";
export type SelectableItem = Record<string, unknown>;

// Props del componente
interface Props {
  modelValue?: string | number | object | null;
  options?: unknown[] | SelectableItem[];
  placeholder?: string;
  label?: string;
  reduce?: (option: unknown) => unknown;
  filterable?: boolean;
  hasMore?: boolean;
  loading?: boolean;
  searchable?: boolean;
  showSearchIcon?: boolean;
  selectable?: (option: SelectableItem) => boolean;
  disabled?: boolean;
  customClass?: string | string[];
  testId?: string;
  multiple?: boolean;
  clearable?: boolean;
  inputFree?: boolean;
  showAvatar?: boolean;
}

// Props del componente
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  placeholder: "",
  label: "name",
  reduce: undefined,
  filterable: false,
  hasMore: false,
  loading: false,
  searchable: true,
  showSearchIcon: true,
  selectable: undefined,
  disabled: false,
  customClass: "vue-select-standard  text-gray-400",
  testId: "px-async-select",
  multiple: false,
  clearable: true,
  inputFree: false,
  showAvatar: false,
});

// Emits del componente
const emit = defineEmits<{
  (e: "update:modelValue", value: unknown): void;
  (e: "search", query: string): void;
  (e: "open"): void;
  (e: "select", item: unknown): void;
  (e: "scrolling"): void;
}>();

// Ref para el elemento trigger del infinite scroll
const infiniteScrollTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
const vSelectRef = ref<{ $el: HTMLElement } | null>(null);
let savedScrollTop: number = 0;
const selectValues = ref<string | number | object | null>(null);

const getDropdownListElement = () => {
  if (vSelectRef.value && vSelectRef.value.$el) {
    return vSelectRef.value.$el.querySelector("ul");
  }
  return null;
};

//<T extends (...args: any[]) => any> para capturar cualquier tipo de función
const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    // extrae automáticamente los tipos de los argumentos de
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const emitScrolling = debounce(() => {
  emit("scrolling");
}, 500);

// Setup del IntersectionObserver para infinite scroll
const setupInfiniteScroll = () => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !props.loading) {
          const dropdownEl = getDropdownListElement();
          if (dropdownEl) {
            savedScrollTop = dropdownEl.scrollTop;
          }
          emitScrolling();
        }
      });
    },
    {
      root: null,
      rootMargin: "10px",
      threshold: 0.1,
    }
  );

  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value);
  }
};

// Limpiar observer al desmontar
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// Reconfigurar observer cuando cambien las opciones
watch(
  () => props.options,
  () => {
    nextTick(() => {
      const dropdownEl = getDropdownListElement();
      if (dropdownEl) {
        dropdownEl.scrollTop = savedScrollTop;
      }
      setupInfiniteScroll();
    });
  },
  { deep: true }
);

// Handlers de eventos
const handleUpdateModelValue = (value: string | number | object) => {
  emit("update:modelValue", value);
  emit("select", value);
};

const currentSearch = ref<string>("");

const handleSearch = (query: string) => {
  currentSearch.value = query;
  savedScrollTop = 0;
  emit("search", query);
};

const handleBlur = () => {
  if (props.inputFree && currentSearch.value) {
    emit("update:modelValue", currentSearch.value);
    emit("select", currentSearch.value);
  }
};

const handleOpen = () => {
  emit("open");
  nextTick(() => {
    setupInfiniteScroll();
  });
};

// Setup inicial
onMounted(() => {
  nextTick(() => {
    setupInfiniteScroll();
  });
});

watch(
  [() => props.loading, () => props.modelValue],
  ([newLoading, newModel]) => {
    if (!newLoading) {
      selectValues.value = newModel;
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <PxSelect
    ref="vSelectRef"
    :model-value="selectValues"
    :options="options"
    :placeholder="placeholder"
    :optionLabel="label"
    :optionValue="reduce"
    :data-testid="testId"
    :class="customClass"
    :disabled="disabled"
    :multiple="multiple"
    :clearable="clearable"
    :searchable="searchable"
    @update:model-value="handleUpdateModelValue"
    @search="handleSearch"
    @open="handleOpen"
    @search:blur="handleBlur"
  >

    <template #no-options>
      <span v-if="loading"> Please wait while searching... </span>
      <span v-else-if="!hasMore"> Sorry, no matching options. </span>
      <span v-else> Please wait while searching... </span>
    </template>

    <!-- Infinite Scroll Footer -->
    <template #list-footer>
      <li
        v-show="hasMore"
        ref="infiniteScrollTrigger"
        class="text-center py-2 text-gray-500"
      >
        <span v-if="loading">Loading...</span>
        <!--  <span v-else>Scroll for more...</span> -->
      </li>
      <li
        v-show="!hasMore && options.length > 0"
        class="text-center py-2 text-gray-500"
      >
        No more results
      </li>
    </template>

    <!-- Pasar slots adicionales del componente padre -->
    <template v-for="(slot, name) in $slots" :key="name" #[name]="slotProps">
      <slot
        v-if="
          !(showAvatar && (name === 'option' || name === 'selected-option'))
        "
        :name="name"
        v-bind="slotProps"
      />
    </template>

    <!-- Option Slot with Avatar -->
    <template v-if="showAvatar" #option="option">
      <slot name="option" v-bind="option">
        <div class="flex items-center gap-3 py-0.5">
          <PxAvatar
            :name="option[label]"
            size="w-7 h-7"
            text-class="text-xs font-bold"
          />
          <span class="font-medium text-gray-200">{{ option[label] }}</span>
        </div>
      </slot>
    </template>

    <!-- Selected Option Slot with Avatar -->
    <template v-if="showAvatar" #selected-option="option">
      <slot name="selected-option" v-bind="option">
        <div class="flex items-center gap-2 overflow-hidden max-w-full">
          <PxAvatar
            :name="option[label]"
            size="w-5 h-5"
            text-class="text-[10px] font-semibold"
            class="shrink-0"
          />
          <span
            class="truncate"
            :class="
              multiple ? 'text-gray-200' : 'text-gray-700 dark:text-gray-200'
            "
            >{{ option[label] }}</span
          >
        </div>
      </slot>
    </template>
  </PxSelect>
</template>

