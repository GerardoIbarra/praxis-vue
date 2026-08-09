<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Dialog } from "primevue";
import VueSelect from "vue-select";
import { useFormActivitiesStore } from "@/stores/Forms/formActivities";
import { storeToRefs } from "pinia";
import StaffList from "@/components/staff/StaffList.vue";
import RequiredLabel from "@/components/ui/base/RequiredLabel.vue";
import { useProvidersStore } from "@/stores/Filters/staff";
import { toast } from "vue3-toastify";
import type { StaffTableResult } from "@/types/catalog/staff";

const activitiesStore = useFormActivitiesStore();

const { durationOptions, duration, allSelectedStaff } =
  storeToRefs(activitiesStore);
const { addAlternateDuration } = activitiesStore;

// Props del componente
interface Props {
  visible: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

//const emit = defineEmits(["update:visible"]);

const providers = useProvidersStore();

const {
  fullName,
  type,
  specialty,
  title,
  npi,
  typeOptions,
  specialtyOptions,
  titleOptions,
  staffType,
  usersActive,
} = storeToRefs(providers);

const newAlternateDuration = ref({
  duration: "",
});

// Track selected staff members
const selectedStaff = ref<StaffTableResult[]>([]);

// Handle staff selection - receives array of selected staff
const handleStaffSelected = (staffArray: StaffTableResult[]): void => {
  selectedStaff.value = staffArray || [];
};

// Computed property for two-way binding
const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

// Reset form when modal opens/closes
watch(
  () => props.visible,
  (newValue) => {
    usersActive.value = true;
    staffType.value = "provider";
    if (newValue) {
      // Reset form when opening
      newAlternateDuration.value = {
        duration: "15",
      };
      selectedStaff.value = [];
    }
  }
);

const closeModal = (): void => {
  emit("update:visible", false);
  newAlternateDuration.value = {
    duration: "",
  };
  selectedStaff.value = [];
  usersActive.value = false;
  staffType.value = "";
};

const saveAlternateDuration = (): void => {
  if (newAlternateDuration.value.duration) {
    if (selectedStaff.value.length <= 0) {
      toast.error("You must select at least one staff member.");
      return;
    }
    addAlternateDuration({
      duration: newAlternateDuration.value.duration,
      selectedStaff: selectedStaff.value,
    });
    closeModal();
  }
};
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="Alternate Durations"
    :style="{ width: '85vw', height: '86vh' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :closable="true"
    @hide="closeModal"
  >
    <div class="flex gap-6 h-full">
      <!-- Left Panel - Form (Minimal) -->
      <div class="w-[12%] space-y-4">
        <!-- Activity Information -->
        <div class="space-y-4">
          <div>
            <label class="block field-title"> Default Duration </label>
            <div
              class="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              {{ duration }} minutes
            </div>
          </div>

          <div>
            <label for="alternate-duration" class="block field-title">
              Alternate Duration
            </label>
            <VueSelect
              id="alternate-duration"
              v-model="newAlternateDuration.duration"
              :options="durationOptions"
              :reduce="(option: { value: string }) => option.value"
              label="name"
              class="vue-select-standard dark:bg-secondary"
              placeholder="Select duration"
              :disabled="disabled"
            />
          </div>
        </div>

        <!-- Resource Assignment Instruction -->
        <div
          class="mt-6 p-3 bg-p-secondary/10 border border-border-light rounded-md"
        >
          <p class="text-sm font-medium text-p-secondary">
            The selected checkboxes on the right will be added to the list of
            resources for this alternate duration.
          </p>
        </div>
      </div>

      <!-- Right Panel - Resource Selection (Maximum Space) -->
      <div class="w-[88%] border-l border-gray-200 dark:border-gray-700 pl-6">
        <!-- Resource Table Placeholder -->
        <div class="rounded-md bg-white dark:bg-primary h-full">
          <div class="flex-1 overflow-hidden">
            <div
              class="my-0 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-6 border border-border-light rounded-lg p-4"
            >
              <div class="sm:col-span-2">
                <RequiredLabel label="Full name" :required="false" />
                <input
                  v-model="fullName"
                  type="text"
                  class="input-base dark:bg-secondary dark:text-white"
                />
              </div>

              <div class="sm:col-span-1">
                <RequiredLabel label="Type" :required="false" />
                <VueSelect
                  v-model="type"
                  :options="typeOptions"
                  label="name"
                  :reduce="(status: { value: string }) => status.value"
                  data-testid="patient-Type-select"
                  class="vue-select-standard dark:bg-secondary"
                />
              </div>
              <div class="sm:col-span-1">
                <RequiredLabel label="Specialty" :required="false" />
                <VueSelect
                  v-model="specialty"
                  :options="specialtyOptions"
                  label="name"
                  :reduce="(status: { value: string }) => status.value"
                  data-testid="patient-Type-select"
                  class="vue-select-standard dark:bg-secondary"
                />
              </div>
              <div class="sm:col-span-1">
                <RequiredLabel label="Title" :required="false" />
                <VueSelect
                  v-model="title"
                  :options="titleOptions"
                  label="name"
                  :reduce="(status: { value: string }) => status.value"
                  data-testid="patient-Type-select"
                  class="vue-select-standard dark:bg-secondary"
                />
              </div>
              <div class="sm:col-span-1">
                <RequiredLabel label="NPI" :required="false" />
                <input
                  v-model="npi"
                  type="text"
                  class="input-base dark:bg-secondary dark:text-white"
                />
              </div>
            </div>

            <StaffList
              :is-modal="true"
              :existing-agents="allSelectedStaff"
              @staff-selected="handleStaffSelected"
            />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between items-center">
        <div
          v-if="selectedStaff && selectedStaff.length > 0"
          class="field-description"
        >
          Selected:
          <span class="font-medium">{{ selectedStaff.length }} staff</span>
        </div>
        <div class="flex gap-2">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button class="btn-save" @click="saveAlternateDuration">Save</button>
        </div>
      </div>
    </template>
  </Dialog>
</template>
