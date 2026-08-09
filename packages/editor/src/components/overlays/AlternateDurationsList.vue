<script setup lang="ts">
import { X } from "@lucide/vue";
import { useFormActivitiesStore } from "@/stores/Forms/formActivities";
import { storeToRefs } from "pinia";

const activitiesStore = useFormActivitiesStore();
const { alternateDurations } = storeToRefs(activitiesStore);
const { removeAlternateDuration } = activitiesStore;

// Props del componente
interface Props {
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: "add"): void;
}>();

const openModal = (): void => {
  emit("add");
};

const removeItem = (index: string): void => {
  removeAlternateDuration(index);
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="border-b border-gray-900/10 dark:border-gray-400/10 py-1 px-4">
      <div class="flex items-center justify-between">
        <h2 class="h2-semibold">Provider Alternate Durations</h2>
        <button
          type="button"
          :disabled="disabled"
          :class="[
            'dark:border w-5 h-5 flex justify-center items-center p-4 rounded-md bg-gray-300 dark:bg-gray-600 dark:text-white',
            !disabled
              ? 'hover:bg-gray-400 dark:hover:bg-gray-800 cursor-pointer'
              : 'cursor-not-allowed opacity-50',
          ]"
          @click="openModal"
        >
          +
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="h-auto">
      <!-- Header de la tabla -->
      <div
        v-if="alternateDurations && alternateDurations.length >= 1"
        class="grid items-center bg-gray-500 text-white font-semibold px-4 py-2 rounded-t-md grid-cols-3"
      >
        <div class="flex justify-center items-center">Name</div>
        <div class="flex justify-center items-center">Duration</div>
        <div class="flex justify-center items-center">Actions</div>
      </div>

      <!-- Filas de items -->
      <div v-for="(item, index) in alternateDurations" :key="index">
        <!-- Si no hay staff seleccionados, mostrar una fila vacía -->
        <div
          v-if="!item.selectedStaff || item.selectedStaff.length === 0"
          class="grid items-center gap-4 border-b border-t border-gray-900/10 px-4 py-2 grid-cols-3"
        >
          <div class="flex justify-center items-center text-gray-500">
            No staff selected
          </div>
          <div class="flex justify-center items-center">
            {{ item.duration }} minutes
          </div>
          <div class="flex justify-center items-center">
            <div
              class="remove-item-button"
              :class="{ 'cursor-not-allowed opacity-50': disabled }"
              @click="removeItem(String(index))"
            >
              <X class="w-5 h-5 text-error" />
            </div>
          </div>
        </div>

        <!-- Para cada staff seleccionado, crear una fila separada -->
        <div
          v-for="staff in item.selectedStaff"
          :key="`${index}-${staff.id}`"
          class="grid items-center gap-4 border-b border-t border-gray-900/10 px-4 py-2 grid-cols-3"
        >
          <div class="flex justify-center items-center">
            {{ staff.full_name || staff.name }}
          </div>
          <div class="flex justify-center items-center">
            {{ item.duration }} minutes
          </div>
          <div class="flex justify-center items-center">
            <div
              class="remove-item-button"
              :class="{ 'cursor-not-allowed opacity-50': disabled }"
              @click="removeItem(staff.id)"
            >
              <X class="w-5 h-5 text-error" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay items -->
      <div
        v-if="!alternateDurations || alternateDurations.length === 0"
        class="p-4 text-center text-gray-500"
      >
        No alternate durations added
      </div>
    </div>
  </div>
</template>
