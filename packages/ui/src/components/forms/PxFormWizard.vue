<script setup lang="ts">
import { ref, computed, watch, toRaw } from "vue";
import { Check, ChevronRight, ChevronLeft, AlertCircle, Loader2 } from "@lucide/vue";
import PxSchemaForm from "@/components/forms/PxSchemaForm.vue";
import type { WizardStep } from "@/types/ui/formWizard";

export type { WizardStep };

interface Props {
  steps: WizardStep[];
  modelValue?: Record<string, unknown>;
  loading?: boolean;
  linear?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  completeLabel?: string;
  loadingLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  steps: () => [],
  modelValue: () => ({}),
  loading: false,
  linear: true,
  nextLabel: "Siguiente",
  previousLabel: "Anterior",
  completeLabel: "Completar",
  loadingLabel: "Guardando...",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, unknown>): void;
  (e: "step-change", stepIndex: number, step: WizardStep): void;
  (e: "complete", value: Record<string, unknown>): void;
  (e: "error", error: { stepIndex: number; message: string }): void;
}>();

const currentStepIndex = ref(0);
const formData = ref<Record<string, unknown>>({ ...props.modelValue });
const stepError = ref<string | null>(null);
const isValidating = ref(false);
const completedStepIndices = ref<Set<number>>(new Set());

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    }
  },
  { deep: true }
);

watch(
  formData,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);

const currentStep = computed(() => props.steps[currentStepIndex.value]);
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === props.steps.length - 1);

// Step Validation Handler
const validateCurrentStep = async (): Promise<boolean> => {
  stepError.value = null;
  const step = currentStep.value;
  if (!step) return true;

  // 1. Zod schema validation
  if (step.zodSchema) {
    const rawZod = toRaw(step.zodSchema);
    const result = rawZod.safeParse(formData.value);
    if (!result.success) {
      const issue = result.error.issues[0];
      const errorMsg = issue?.message || "Por favor verifica los campos obligatorios del paso.";
      stepError.value = errorMsg;
      emit("error", { stepIndex: currentStepIndex.value, message: errorMsg });
      return false;
    }
  }

  // 2. Custom validate function
  if (typeof step.validate === "function") {
    isValidating.value = true;
    try {
      const res = await step.validate(formData.value, formData.value);
      if (typeof res === "string") {
        stepError.value = res;
        emit("error", { stepIndex: currentStepIndex.value, message: res });
        return false;
      }
      if (!res) {
        stepError.value = "La validación del paso actual falló.";
        emit("error", { stepIndex: currentStepIndex.value, message: stepError.value });
        return false;
      }
    } catch (err: any) {
      const msg = err?.message || "Error al validar el paso actual.";
      stepError.value = msg;
      emit("error", { stepIndex: currentStepIndex.value, message: msg });
      return false;
    } finally {
      isValidating.value = false;
    }
  }

  return true;
};

// Next / Complete Action
const handleNext = async () => {
  if (props.loading || isValidating.value) return;

  const isValid = await validateCurrentStep();
  if (!isValid) return;

  completedStepIndices.value.add(currentStepIndex.value);

  if (isLastStep.value) {
    emit("complete", formData.value);
  } else {
    currentStepIndex.value++;
    emit("step-change", currentStepIndex.value, props.steps[currentStepIndex.value]);
  }
};

// Previous Action
const handlePrevious = () => {
  if (props.loading || isFirstStep.value) return;
  stepError.value = null;
  currentStepIndex.value--;
  emit("step-change", currentStepIndex.value, props.steps[currentStepIndex.value]);
};

// Jump to step (if allowed)
const goToStep = async (targetIndex: number) => {
  if (targetIndex === currentStepIndex.value || targetIndex < 0 || targetIndex >= props.steps.length) {
    return;
  }

  if (props.linear) {
    // Can only jump to previously completed steps or current
    if (targetIndex < currentStepIndex.value) {
      stepError.value = null;
      currentStepIndex.value = targetIndex;
      emit("step-change", currentStepIndex.value, props.steps[currentStepIndex.value]);
    } else {
      // Must validate current before moving forward
      const isValid = await validateCurrentStep();
      if (isValid) {
        completedStepIndices.value.add(currentStepIndex.value);
        currentStepIndex.value = targetIndex;
        emit("step-change", currentStepIndex.value, props.steps[currentStepIndex.value]);
      }
    }
  } else {
    stepError.value = null;
    currentStepIndex.value = targetIndex;
    emit("step-change", currentStepIndex.value, props.steps[currentStepIndex.value]);
  }
};

defineExpose({
  currentStepIndex,
  formData,
  goToStep,
  next: handleNext,
  previous: handlePrevious,
  validate: validateCurrentStep,
});
</script>

<template>
  <div class="flex flex-col bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700/80 rounded-2xl shadow-sm overflow-hidden">
    <!-- Stepper Navigation Header -->
    <div class="px-6 py-5 border-b border-surface-200 dark:border-surface-700/80 bg-surface-50/50 dark:bg-surface-800/30">
      <nav aria-label="Progreso del asistente">
        <ol class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <li
            v-for="(step, index) in steps"
            :key="step.id || index"
            class="flex-1 relative flex items-center"
          >
            <!-- Step Item Button -->
            <button
              type="button"
              @click="goToStep(index)"
              :disabled="linear && index > currentStepIndex && !completedStepIndices.has(index)"
              class="group flex items-center gap-3.5 text-left focus:outline-none transition-all"
              :class="[
                linear && index > currentStepIndex && !completedStepIndices.has(index)
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              ]"
            >
              <!-- Circle / Indicator -->
              <span
                class="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold shrink-0 transition-all shadow-2xs"
                :class="[
                  index === currentStepIndex
                    ? 'bg-p-primary text-white ring-4 ring-p-primary/20 shadow-sm'
                    : completedStepIndices.has(index) || index < currentStepIndex
                    ? 'bg-emerald-500 text-white'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 border border-surface-300 dark:border-surface-600'
                ]"
              >
                <component
                  v-if="step.icon && (index === currentStepIndex || (!completedStepIndices.has(index) && index > currentStepIndex))"
                  :is="step.icon"
                  class="w-4 h-4"
                />
                <Check
                  v-else-if="completedStepIndices.has(index) || index < currentStepIndex"
                  class="w-4 h-4 stroke-2"
                />
                <span v-else>{{ index + 1 }}</span>
              </span>

              <!-- Text Info -->
              <div class="flex flex-col min-w-0">
                <span
                  class="text-xs font-semibold transition-colors truncate"
                  :class="[
                    index === currentStepIndex
                      ? 'text-p-primary'
                      : completedStepIndices.has(index) || index < currentStepIndex
                      ? 'text-surface-900 dark:text-surface-100'
                      : 'text-surface-500 dark:text-surface-400'
                  ]"
                >
                  {{ step.title }}
                </span>
                <span
                  v-if="step.description"
                  class="text-[11px] text-surface-400 dark:text-surface-500 truncate"
                >
                  {{ step.description }}
                </span>
              </div>
            </button>

            <!-- Connector Line (for md+ screens) -->
            <div
              v-if="index < steps.length - 1"
              class="hidden md:block flex-1 mx-4 h-0.5 bg-surface-200 dark:bg-surface-700/80 transition-colors"
              :class="{
                'bg-emerald-500 dark:bg-emerald-500': completedStepIndices.has(index) || index < currentStepIndex
              }"
            />
          </li>
        </ol>
      </nav>
    </div>

    <!-- Error Banner -->
    <div
      v-if="stepError"
      class="flex items-center gap-2.5 mx-6 mt-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300"
    >
      <AlertCircle class="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
      <span>{{ stepError }}</span>
    </div>

    <!-- Step Body -->
    <div class="p-6">
      <slot name="before-form" :step="currentStep" :stepIndex="currentStepIndex" />

      <template v-if="currentStep">
        <PxSchemaForm
          :key="currentStep.id || currentStepIndex"
          v-model="formData"
          :existing-data="formData"
          :schema="currentStep.schema"
          :zod-schema="currentStep.zodSchema ? toRaw(currentStep.zodSchema) : undefined"
        />
      </template>

      <slot name="after-form" :step="currentStep" :stepIndex="currentStepIndex" />
    </div>

    <!-- Action Footer -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-surface-200 dark:border-surface-700/80 bg-surface-50/50 dark:bg-surface-800/30">
      <div>
        <button
          v-if="!isFirstStep"
          type="button"
          @click="handlePrevious"
          :disabled="loading || isValidating"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
        >
          <ChevronLeft class="w-3.5 h-3.5" />
          <span>{{ previousLabel }}</span>
        </button>
      </div>

      <div class="flex items-center gap-3">
        <slot name="actions" :step="currentStep" :stepIndex="currentStepIndex" :isLastStep="isLastStep">
          <button
            type="button"
            @click="handleNext"
            :disabled="loading || isValidating"
            class="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-p-primary text-white hover:bg-p-primary/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Loader2 v-if="loading || isValidating" class="w-3.5 h-3.5 animate-spin" />
            <span>{{ loading ? loadingLabel : isLastStep ? completeLabel : nextLabel }}</span>
            <ChevronRight v-if="!isLastStep && !loading && !isValidating" class="w-3.5 h-3.5" />
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
