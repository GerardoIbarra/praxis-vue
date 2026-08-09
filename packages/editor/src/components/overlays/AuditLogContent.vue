<script setup lang="ts">
import { useAuditLogSidebarStore } from "@/stores/auditLogSidebar";
import { storeToRefs } from "pinia";
import PraxisTimeline from "@/components/_primitives/PraxisTimeline.vue";
import { User, ChevronDown, ChevronUp, FileClock } from "@lucide/vue";
import { ref, useTemplateRef, watch } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import LazyLoadingSpinner from "@/components/ui/base/LazyLoadingSpinner.vue";

const store = useAuditLogSidebarStore();
const { loading, initialLoading, logs, currentId, currentContext, hasMore } =
  storeToRefs(store);

const scrollContainer = useTemplateRef<HTMLElement>("scrollContainer");
const expandedIndex = ref<number | null>(null);
const canLoadMore = ref(false);

// Enable loading more only after initial load finishes and small delay for layout
watch(initialLoading, (loading) => {
  if (!loading) {
    setTimeout(() => {
      canLoadMore.value = true;
    }, 500);
  } else {
    canLoadMore.value = false;
  }
});

const toggleExpand = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};

// Use VueUse for infinite scroll
useInfiniteScroll(
  scrollContainer,
  () => {
    if (canLoadMore.value && hasMore.value && !loading.value) {
      store.loadMore();
    }
  },
  { distance: 10 }
);

const formatValue = (val: unknown) => {
  if (val === null || val === undefined || val === "None") return "-";
  return String(val);
};

const parseChanges = (changes: string | Record<string, unknown> | null) => {
  if (!changes) return [];
  let parsed: Record<string, unknown>;
  if (typeof changes === "string") {
    try {
      parsed = JSON.parse(changes);
    } catch {
      return [{ field: "info", old: "-", new: changes }];
    }
  } else {
    parsed = changes as Record<string, unknown>;
  }

  return Object.entries(parsed).map(([key, value]) => {
    let oldVal = "-";
    let newVal: string;
    if (Array.isArray(value)) {
      oldVal = formatValue(value[0]);
      newVal = formatValue(value[1]);
    } else {
      newVal = formatValue(value);
    }
    return { field: key.replace(/_/g, " "), old: oldVal, new: newVal };
  });
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const getStatusClasses = (label: string, type: "marker" | "badge") => {
  const l = (label || "").toLowerCase();

  const colors: Record<string, string> = {
    view: "blue",
    sent: "blue",
    resent: "blue",
    update: "amber",
    pending: "amber",
    partial: "amber",
    delete: "red",
    cancelled: "red",
    create: "green",
    completed: "green",
    export: "violet",
    offline: "gray",
  };

  const color = colors[l] || "gray";

  if (type === "marker") {
    return {
      [`bg-${color}-500 border-${color}-500 dark:border-${color}-500`]: true,
    };
  } else {
    return {
      [`bg-${color}-100 text-${color}-700 dark:bg-${color}-900/40 dark:text-${color}-500`]: true,
    };
  }
};
</script>

<template>
  <div
    ref="scrollContainer"
    class="h-full overflow-y-auto"
    style="scrollbar-gutter: stable"
  >
    <Transition name="fade" mode="out-in">
      <div
        v-if="initialLoading"
        key="loading"
        class="flex flex-col items-center justify-center h-full"
      >
        <LazyLoadingSpinner loading-text="Fetching history..." />
      </div>

      <div
        v-else-if="!loading && logs.length === 0"
        key="empty"
        class="flex flex-col items-center justify-center h-full gap-3 px-10 text-center"
      >
        <div class="p-4 rounded-full bg-gray-100 dark:bg-secondary">
          <FileClock class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-base font-medium text-gray-900 dark:text-white">
          No history found
        </h3>
        <p class="text-sm text-gray-500 italic">
          We couldn't find any audit logs for this
          {{ currentContext.replace("_", " ") }} (ID: {{ currentId }}).
        </p>
      </div>

      <div v-else key="content" class="pb-20">
        <PraxisTimeline :value="logs" class="custom-timeline">
          <template #marker="slotProps">
            <div
              class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center z-10 transition-colors"
              :class="getStatusClasses(slotProps.item.action_label, 'marker')"
            ></div>
          </template>

          <template #content="slotProps">
            <!-- Log Card -->
            <div
              class="bg-secondary rounded-xl p-4 shadow-sm border border-border-light hover:border-p-secondary! transition-colors cursor-pointer mb-4"
              @click="toggleExpand(logs.indexOf(slotProps.item))"
            >
              <div class="flex justify-between items-start mb-2">
                <span
                  class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-colors"
                  :class="
                    getStatusClasses(slotProps.item.action_label, 'badge')
                  "
                >
                  {{ slotProps.item.action_label }}
                </span>
                <span class="text-xs text-black dark:text-white font-medium">
                  {{ formatDate(slotProps.item.timestamp) }}
                </span>
              </div>

              <h4
                class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1"
              >
                {{
                  slotProps.item.model_name
                    ? slotProps.item.model_name.replace(/_/g, " ")
                    : "Log Entry"
                }}
              </h4>

              <div
                class="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-500 mb-3"
              >
                <User class="w-4 h-4" />
                <span>{{ slotProps.item.actor_full_name }}</span>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ slotProps.item.event }}
                </p>
              </div>

              <div
                v-if="
                  expandedIndex === logs.indexOf(slotProps.item) &&
                  slotProps.item.action_label != 'View' &&
                  slotProps.item.action_label != 'Export'
                "
                class="mt-4 pt-4 border-t border-black dark:border-gray-700 space-y-3"
              >
                <div
                  v-for="change in parseChanges(slotProps.item.changes)"
                  :key="change.field"
                  class="space-y-1"
                >
                  <p
                    class="text-[10px] font-bold text-black dark:text-gray-400 uppercase tracking-widest"
                  >
                    {{ change.field }}
                  </p>
                  <div class="flex items-center gap-2 text-xs">
                    <span
                      class="bg-red-50 dark:bg-red-900/20 text-red-600 px-2 py-1 rounded line-through opacity-70"
                    >
                      {{ change.old }}
                    </span>
                    <span class="text-black dark:text-gray-400">→</span>
                    <span
                      class="bg-green-50 dark:bg-green-900/20 text-green-600 px-2 py-1 rounded font-medium"
                    >
                      {{ change.new }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                v-if="
                  slotProps.item.action_label != 'View' &&
                  slotProps.item.action_label != 'Export'
                "
                class="mt-2 flex justify-center"
              >
                <component
                  :is="
                    expandedIndex === logs.indexOf(slotProps.item)
                      ? ChevronUp
                      : ChevronDown
                  "
                  class="w-4 h-4 text-black dark:text-gray-300"
                />
              </div>
            </div>
          </template>
        </PraxisTimeline>
        <!-- Loading more indicator -->
        <div v-if="loading && !initialLoading" class="py-4 flex justify-center">
          <LazyLoadingSpinner loading-text="Loading more..." />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@reference "@/index.css";

.custom-timeline :deep(.p-timeline-event-opposite) {
  display: none;
}

.custom-timeline :deep(.p-timeline-event-content) {
  @apply pl-4;
}

.custom-timeline :deep(.p-timeline-event-marker) {
  @apply border-0 bg-transparent p-0;
}

.custom-timeline :deep(.p-timeline-event-connector) {
  @apply bg-gray-500 dark:bg-gray-400 w-0.5;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
