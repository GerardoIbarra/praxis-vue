<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { Plus } from "@lucide/vue";
import ActionMenu from "@/components/ui/navigation/ActionMenu.vue";

// modal form
import { useMedicalChartModalFormSection } from "@/stores/medicalChart/modalForm";
const ModalSection = useMedicalChartModalFormSection();
const { getFormClickAddRoot } = ModalSection;
const { HeaderModal, editingNode } = storeToRefs(ModalSection);

//family history
import { useMedicalChartFamilyHistory } from "@/stores/medicalChart/familyHistory";
import type { FamilyHistoryDiagnosis } from "@/types/api/medical-charts/document";
const familyHistoy = useMedicalChartFamilyHistory();
const { getDataForm, getToggleActions } = familyHistoy;
const { memberInfo, subModalFamilyHistory } = storeToRefs(familyHistoy);

defineProps({
  field: {
    type: Object,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openModal = (component: Record<string, any>) => {
  const data = getDataForm();
  if (editingNode.value && "diagnoses" in editingNode.value) {
    data.diagnoses = editingNode.value.diagnoses;
  }

  editingNode.value = null;
  memberInfo.value = data;
  HeaderModal.value = component.label;
  if (component && component.schema) {
    getFormClickAddRoot(component.schema, true);
  }
  editingNode.value = data;
};

const mapDiagnoses = computed(() => {
  if (
    editingNode.value &&
    "diagnoses" in editingNode.value &&
    (editingNode.value.diagnoses as FamilyHistoryDiagnosis[]).length > 0
  ) {
    return editingNode.value.diagnoses;
  } else {
    return subModalFamilyHistory.value;
  }
});

//  MENU TOGGLE DIAGNOSES
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatDiagnosisName = (item: Record<string, any>, key: string) => {
  const value = item?.[key];
  if (!value) return "N/A";

  const name = String(value);
  const hasDenies = name.toLowerCase().startsWith("denies ");
  const cleanName = hasDenies ? name.slice(7) : name;

  const result = item?.denies ? `Denies ${cleanName}` : cleanName;
  return result.charAt(0).toUpperCase() + result.slice(1).replace(/_/g, " ");
};
</script>

<template>
  <div>
    <div v-for="(comp, cIdx) in field.components" :key="cIdx" class="p-4">
      <button
        v-if="comp.type === 'multiselect_form'"
        class="mb-2 flex items-center gap-1 cursor-pointer"
        @click.stop="openModal(comp)"
      >
        <span class="field-description font-semibold">Problems/Diagnoses</span>
        <Plus class="w-4 h-4" />
      </button>

      <div
        v-if="
          subModalFamilyHistory?.length > 0 ||
          (editingNode && 'diagnoses' in editingNode)
        "
        class="border border-gray-600 h-40 overflow-y-auto w-full"
      >
        <div class="flex flex-col">
          <div
            :style="{
              'grid-template-columns': '1fr 120px 80px',
            }"
            class="py-2 grid font-semibold"
          >
            <div
              v-for="key in comp.schema.column_names"
              :key="key"
              class="text-xs text-center px-2 py-1"
            >
              {{ key.label }}
            </div>
            <div class="flex items-center justify-center text-xs">Actions</div>
          </div>

          <div>
            <div
              v-for="(item, index) in mapDiagnoses"
              :key="(item as FamilyHistoryDiagnosis).id || index"
              :style="{
                'grid-template-columns': '1fr 120px 80px',
              }"
              class="py-2 border-b border-gray-100 last:border-b-0 grid"
            >
              <div
                v-for="value in comp.schema.column_names"
                :key="value"
                class="flex items-center justify-center text-xs text-center p-2 wrap-break-word whitespace-pre-line border-r border-gray-200"
              >
                {{
                  value.key === "diagnosis_name"
                    ? formatDiagnosisName(item, value.key)
                    : item?.[value.key]
                      ? String(item?.[value.key]).charAt(0).toUpperCase() +
                        String(item?.[value.key]).slice(1).replace(/_/g, " ")
                      : "N/A"
                }}
              </div>
              <div class="flex items-center justify-center">
                <ActionMenu :items="getToggleActions(item, comp.schema)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
