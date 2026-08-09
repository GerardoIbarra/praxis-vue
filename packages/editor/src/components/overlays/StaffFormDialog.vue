<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import PraxisDialog from "@/components/_primitives/PraxisDialog.vue";
import StaffList from "@/components/staff/StaffList.vue";
import { useProvidersStore } from "@/stores/Filters/staff";
import { storeToRefs } from "pinia";
import RequiredLabel from "@/components/ui/base/RequiredLabel.vue";
import VueSelect from "vue-select";
import { getStaffType } from "@/utils/catalog";
import { useFormProviders } from "@/stores/Forms/formStaff";
import type {
  StaffTableResult,
  AgentsDetail,
  AgentSaveData,
  StaffDetailWithEnums,
} from "@/types/catalog/staff";

const providers = useProvidersStore();
const staff = useFormProviders();

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
  staffTypeOptions,
  usersActive,
} = storeToRefs(providers);

usersActive.value = true;

const { staffTypeID, isclickmodalAgent } = storeToRefs(staff);

interface Props {
  visible?: boolean;
  isEditMode?: boolean;
  agent?: Partial<AgentsDetail>;
  agentOptions?: AgentsDetail[];
  existingAgents?: (AgentsDetail | StaffDetailWithEnums | AgentSaveData)[];
  headerModal?: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isEditMode: false,
  agent: () => ({}),
  agentOptions: () => [],
  existingAgents: () => [],
  headerModal: "",
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "saved", data: AgentSaveData[]): void;
  (e: "cancelled"): void;
}>();

const dialogVisible = ref(props.visible);
const selectedStaff = ref<StaffTableResult[]>([]);

// Sincronizar visible prop con dialogVisible
watch(
  () => props.visible,
  (newValue) => {
    dialogVisible.value = newValue;
    if (newValue) {
      selectedStaff.value = [];
    }
  }
);

watch(dialogVisible, (newValue) => {
  emit("update:visible", newValue);
  if (!newValue) {
    // Limpiar todos los filtros cuando se cierre el modal
    staffType.value = "";
    fullName.value = "";
    type.value = "";
    specialty.value = "";
    title.value = "";
    npi.value = "";
    emit("cancelled");
  }
});

const handleStaffSelected = (staffArray: StaffTableResult[]) => {
  selectedStaff.value = staffArray || [];
};

const handleSaved = () => {
  if (selectedStaff.value && selectedStaff.value.length > 0) {
    const agentsData: AgentSaveData[] = selectedStaff.value.map((staff) => ({
      agent_id: staff.id,
      agent_name: staff.full_name || "",
      full_name: staff.full_name || "",
      title: staff.title_display || staff.title || "",
      specialty: staff.specialty_display || staff.specialty || "",
      type: staff.type_display || staff.type || "",
      staff_type: staff.staff_type_display || staff.staff_type || "",
      user_id: staff.user?.id || null,
    }));
    emit("saved", agentsData);
  }
  dialogVisible.value = false;
};

const handleCancelled = () => {
  dialogVisible.value = false;
  emit("cancelled");
};

const getDialogTitle = (): string => {
  if (props.headerModal !== "") {
    return props.headerModal;
  }
  return props.isEditMode ? "Select Agent" : "Add New Agent";
};

// Función para actualizar staffType basado en staffTypeID e isclickmodalAgent
const updateStaffType = () => {
  if (staffTypeOptions.value && staffTypeOptions.value.length > 0) {
    if (staffTypeID.value === "provider") {
      if (isclickmodalAgent.value === false) {
        staffType.value = staffTypeOptions.value[1]?.value || "";
      } else {
        staffType.value = "";
      }
    } else {
      staffType.value = staffTypeOptions.value[0]?.value || "";
    }
  }
};

watch(staffTypeID, () => {
  updateStaffType();
});

watch(
  isclickmodalAgent,
  () => {
    updateStaffType();
  },
  { immediate: true }
);

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      updateStaffType();
    }
  }
);

onMounted(async () => {
  staffTypeOptions.value = await getStaffType();
});

onUnmounted(() => {
  usersActive.value = null;
});
</script>

<template>
  <PraxisDialog
    v-model:visible="dialogVisible"
    :header="getDialogTitle()"
    max-width="85vw"
  >
    <div class="h-full flex flex-col">
      <div class="flex-1 overflow-hidden">
        <div
          class="my-0 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-6 border border-border-light rounded-lg p-4 shadow-md"
        >
          <div class="sm:col-span-1">
            <RequiredLabel label="Full name" :required="false" />
            <input
              v-model="fullName"
              type="text"
              class="input-base dark:bg-secondary dark:text-white"
            />
          </div>

          <div class="sm:col-span-1">
            <RequiredLabel label="Staff Type" :required="false" />
            <VueSelect
              v-model="staffType"
              :options="staffTypeOptions"
              label="name"
              :reduce="(status: { value: string }) => status.value"
              data-testid="provider-status-select"
              class="vue-select-standard text-gray-400"
              :class="!isclickmodalAgent ? 'is-disabled' : 'is-enabled'"
              :disabled="!isclickmodalAgent"
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
          :existing-agents="props.existingAgents"
          @staff-selected="handleStaffSelected"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div
          v-if="selectedStaff && selectedStaff.length > 0"
          class="field-description"
        >
          Selected:
          <span class="font-medium">{{ selectedStaff.length }} agents</span>
        </div>
        <div class="flex gap-2">
          <button class="btn-cancel" @click="handleCancelled">Cancel</button>
          <button
            :disabled="!selectedStaff || selectedStaff.length === 0"
            class="btn-save"
            @click="handleSaved"
          >
            {{ isEditMode ? "Update" : "Add" }}
          </button>
        </div>
      </div>
    </template>
  </PraxisDialog>
</template>

<style scoped>
.agent-form-dialog :deep(.p-dialog-content) {
  padding: 0;
  max-height: calc(90vh - 120px); /* Altura máxima */
  height: auto; /* Altura automática basada en contenido */
  min-height: 300px; /* Altura mínima para evitar que sea demasiado pequeño */
  display: flex;
  flex-direction: column;
}

.agent-form-dialog :deep(.p-dialog-header) {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.agent-form-dialog :deep(.p-dialog-footer) {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.agent-form-dialog :deep(.p-dialog) {
  max-height: 90vh;
  height: auto; /* Altura automática */
  margin: 5vh auto;
}
</style>
