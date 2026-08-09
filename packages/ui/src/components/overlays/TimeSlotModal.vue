<script setup lang="ts">
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";
import { useFormScheduleTemplatesStore } from "@/stores/Forms/formScheduleTemplates";
import { storeToRefs } from "pinia";
import RequiredLabel from "@/components/ui/base/RequiredLabel.vue";
import DatePicker from "primevue/datepicker";
import SelectableList from "@/components/ui/forms/SelectableList.vue";
import { toast } from "vue3-toastify";
import type { FormDataScheduleTemplate } from "@/types/catalog/scheduleTemplates";

const scheduleTemplatesStore = useFormScheduleTemplatesStore();
const { showTimeSlotModal, activity_options, time_slots, modalType } =
  storeToRefs(scheduleTemplatesStore);
const { handleTimeSlotSave } = scheduleTemplatesStore;
import { checkStartEndTime } from "@/composables/useDateRangeValidation";
import type { Activities } from "@/types/api/catalog-endpoints/list";
import type { Activity } from "@/types/api/common";

const formData = ref<FormDataScheduleTemplate>({
  name: "", // Para time blockade
  start_time: null,
  end_time: null,
  activities: [], // Para time slot

  activity_options: [],
});

// Watch for visible changes to reset form when modal opens
watch(
  () => showTimeSlotModal.value,
  (newValue) => {
    if (newValue) {
      resetForm();
    }
  }
);

const resetForm = (): void => {
  formData.value = {
    name: "",
    start_time: null,
    end_time: null,
    activities: [],
  };
};

const closeModal = (): void => {
  showTimeSlotModal.value = false;
};

const save = (): void => {
  // make an array of durations
  const durations: number[] = formData.value.activities.map(
    (act: Activities | Activity) => act.duration || 0
  );

  // get the minimum duration from the array, if there are no activities, set it to 0
  const minDuration = durations.length > 0 ? Math.max(...durations) : 0;

  if (
    !checkStartEndTime(
      formData.value.start_time as Date,
      formData.value.end_time as Date,
      minDuration
    )
  ) {
    return;
  }

  // Validar que ambos tiempos estén completos
  if (!formData.value.start_time || !formData.value.end_time) {
    toast.error("Please select both start and end times");
    return;
  }

  // Validar campo name para time blockade
  if (modalType.value === "timeBlockade" && !formData.value.name.trim()) {
    toast.error("Please enter a name for the time blockade");
    return;
  }

  // Validar activity para time slot
  if (
    modalType.value === "timeSlot" &&
    (!formData.value.activities || formData.value.activities.length === 0)
  ) {
    toast.error("Please select at least one activity");
    return;
  }

  // Validar que el tiempo de inicio sea menor que el tiempo de fin
  const start_time: string = formatTimeToString(formData.value.start_time);
  const end_time: string = formatTimeToString(formData.value.end_time);

  const timeToMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    if (typeof timeStr !== "string") return 0;
    timeStr = timeStr.trim();
    const ampm: RegExpMatchArray | null = timeStr.match(
      /^(\d{1,2}):(\d{2})\s*([AP]M)$/i
    );
    if (ampm) {
      let [, h, m, period] = ampm;
      let hours: number = parseInt(h, 10);
      const minutes: number = parseInt(m, 10);
      if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
      if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    }
    const hm: RegExpMatchArray | null = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (hm) {
      return parseInt(hm[1], 10) * 60 + parseInt(hm[2], 10);
    }
    return 0;
  };

  if (timeToMinutes(start_time) >= timeToMinutes(end_time)) {
    toast.error("Start time must be before end time");
    return;
  }

  // // Validar rango de horario permitido (5:45 AM - 6:00 PM)
  // const minTime: number = timeToMinutes("5:45 AM");
  // const maxTime: number = timeToMinutes("6:00 PM");

  // if (
  //   timeToMinutes(start_time) < minTime ||
  //   timeToMinutes(end_time) > maxTime
  // ) {
  //   toast.error("Time slots must be between 5:45 AM and 6:00 PM");
  //   return;
  // }

  // Convertir los Date objects a strings de tiempo
  const timeSlotData: FormDataScheduleTemplate = {
    ...formData.value,
    start_time: formatTimeToString(formData.value.start_time),
    end_time: formatTimeToString(formData.value.end_time),
  };

  // Validar que no haya superposición con time slots existentes
  if (hasTimeSlotOverlap(timeSlotData)) {
    toast.error(
      "Time slot cannot overlap with existing time slots. Please change the time range before continuing."
    );
    return;
  }

  if (modalType.value === "timeBlockade") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (timeSlotData as any).activities;
  }

  // Usar la misma función para ambos tipos ya que comparten la misma lista
  handleTimeSlotSave(timeSlotData);
  closeModal();
};

// Función para verificar si hay superposición de time slots
const hasTimeSlotOverlap = (newTimeSlot: FormDataScheduleTemplate): boolean => {
  const existingTimeSlots = time_slots.value;

  // Convertir tiempos a minutos para comparación
  const timeToMinutes = (timeStr: string | Date) => {
    if (!timeStr) return 0;
    if (typeof timeStr !== "string") return 0;
    timeStr = timeStr.trim();
    const ampm: RegExpMatchArray | null = timeStr.match(
      /^(\d{1,2}):(\d{2})\s*([AP]M)$/i
    );
    if (ampm) {
      let [, h, m, period] = ampm;
      let hours: number = parseInt(h, 10);
      const minutes: number = parseInt(m, 10);
      if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
      if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    }
    const hm = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (hm) {
      return parseInt(hm[1], 10) * 60 + parseInt(hm[2], 10);
    }
    return 0;
  };

  const newStartMinutes: number = timeToMinutes(
    newTimeSlot.start_time as string | Date
  );
  const newEndMinutes: number = timeToMinutes(
    newTimeSlot.end_time as string | Date
  );

  // Verificar superposición con cada time slot existente
  for (const existingSlot of existingTimeSlots) {
    const existingStartMinutes: number = timeToMinutes(
      existingSlot.start_time as string | Date
    );
    const existingEndMinutes: number = timeToMinutes(
      existingSlot.end_time as string | Date
    );

    // Verificar si hay traslape real (sin permitir que se toquen en los extremos)
    const hasOverlap: boolean =
      newStartMinutes < existingEndMinutes &&
      newEndMinutes > existingStartMinutes;

    if (hasOverlap) {
      return true; // Hay superposición real
    }
  }

  return false; // No hay superposición
};

// Función para convertir Date a string de tiempo
const formatTimeToString = (date: string | Date): string => {
  if (!date) return "";
  if (typeof date === "string") return date;
  if (date instanceof Date) {
    // Usar exactamente el mismo formato que generateTimeSlots en el store
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return "";
};
</script>

<template>
  <Dialog
    v-model:visible="showTimeSlotModal"
    :modal="false"
    :style="{ width: '650px' }"
    :closable="true"
    :close-on-escape="true"
    :dismissable-mask="true"
    class="time-slot-modal border border-gray-400 dark:border-gray-700"
    :content-style="{ 'overflow-y': 'visible' }"
  >
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-white">
          {{ modalType === "timeSlot" ? "Time Slot" : "Time Blockade" }}
        </h2>
      </div>
    </template>

    <!-- Content -->
    <div class="p-6 flex flex-col">
      <!-- Form -->
      <div class="space-y-4 flex-1 min-h-0">
        <!-- Name Field (solo para time blockade) -->
        <div v-if="modalType === 'timeBlockade'" class="flex items-center">
          <RequiredLabel label="Name" :required="true" />
          <input
            v-model="formData.name"
            type="text"
            class="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 is-enabled"
            placeholder="Enter blockade name"
          />
        </div>

        <!-- Time Fields -->
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <RequiredLabel label="Start" :required="false" />
            <DatePicker
              id="datepicker_start"
              v-model="formData.start_time as Date"
              time-only
              :step-minute="15"
              hour-format="12"
              fluid
              :input-class="'ml-4 input-base '"
            />
          </div>
          <div class="flex items-center">
            <RequiredLabel label="End" :required="false" />
            <DatePicker
              id="datepicker_end"
              v-model="formData.end_time as Date"
              :step-minute="15"
              hour-format="12"
              time-only
              fluid
              :input-class="'ml-4 input-base '"
            />
          </div>
        </div>

        <!-- Activities Field (solo para time slot) -->
        <div v-if="modalType === 'timeSlot'">
          <SelectableList
            v-model:selected-items="formData.activities"
            :options="activity_options"
            title="Activities"
            placeholder="Choose Activity"
            label-field="name"
            value-field="id"
            :columns="['Color', 'Name', 'Duration (min)', 'Actions']"
            :additional-fields="[
              { field: 'duration', label: 'Duration (min)' },
            ]"
            :show-color-picker="true"
            class="w-full"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button
            :disabled="
              !formData.start_time ||
              !formData.end_time ||
              (modalType === 'timeSlot' &&
                (!formData.activities || formData.activities.length === 0)) ||
              (modalType === 'timeBlockade' && !formData.name)
            "
            class="btn-save"
            @click="save"
          >
            Save
          </button>
        </div>
      </div>
    </template>
  </Dialog>
</template>
