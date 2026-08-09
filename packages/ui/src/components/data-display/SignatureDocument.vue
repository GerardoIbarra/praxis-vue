<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import { VueSignaturePad } from "@selemondev/vue3-signature-pad";
import { BrushCleaning, Save, Undo2 } from "@lucide/vue";
import { useMedicalChartSectionOptions } from "@/stores/medicalChart/sectionOptions";
import { useMedicalChartDocumentStore } from "@/stores/medicalChart/document";
import { storeToRefs } from "pinia";
import RequiredLabel from "@/components/ui/base/RequiredLabel.vue";
import { InputText } from "primevue";

const sectionOptions = useMedicalChartSectionOptions();
const { signatureSaved } = sectionOptions;
const { nameWitnessSignature } = storeToRefs(sectionOptions);

const documentStore = useMedicalChartDocumentStore();
const { SelectedDocumentId } = storeToRefs(documentStore);

const options = {
  penColor: "#335791", // Blue for diagnostics
  backgroundColor: "rgb(255, 255, 255)",
  maxWidth: 0.5,
  minWidth: 0.5,
  velocityFilterWeight: 1.0,
};

const isReady = ref<boolean>(false);

// Using any for the signature pad ref as the library might not export the type easily
const signature = ref<InstanceType<typeof VueSignaturePad> | null>(null);
const signatureWrapper = ref<HTMLDivElement | null>(null);
const isPadEmpty = ref<boolean>(true);

const updatePadState = (forceCheck = false) => {
  if (signature.value) {
    if (forceCheck) {
      setTimeout(() => {
        if (signature.value) {
          isPadEmpty.value = signature.value.isCanvasEmpty();
        }
      }, 50);
    } else {
      isPadEmpty.value = false;
    }
  }
};

const isSaveDisabled = computed(() => {
  // 1. Signature pad must not be empty
  if (isPadEmpty.value) return true;

  // 2. For witness signature, name is also required
  if (SelectedDocumentId.value === "text_witness_signature") {
    return !nameWitnessSignature.value?.trim();
  }

  return false;
});

const handleClearCanvas = () => {
  if (signature.value) {
    signature.value.clearCanvas();
    isPadEmpty.value = true;
  }
};

onMounted(() => {
  const onResize = () => {
    if (signature.value && isPadEmpty.value) {
      signature.value.resizeCanvas();
    }
  };

  // Wait for sidebar animation (300ms) + buffer (300ms) to ensure stable layout
  setTimeout(() => {
    isReady.value = true;

    // Once ready, we wait a bit for the DOM to settle then resize
    setTimeout(() => {
      if (signature.value) {
        signature.value.resizeCanvas();
      }
    }, 100);
  }, 600);

  window.addEventListener("resize", onResize);

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
    nameWitnessSignature.value = "";
  });
});

const handleUndo = () => {
  if (signature.value) {
    signature.value.undo();
    updatePadState(true); // Check if it's empty after undo
  }
};

const handleSaveSignature = () => {
  try {
    if (signature.value && !isSaveDisabled.value) {
      const result = signature.value.saveSignature();
      signatureSaved(result);
    }
  } catch (err) {
    throw new Error("Failed to save signature: ", { cause: err });
  }
};
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div
      class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative"
    >
      <!-- Hint Label -->
      <div class="absolute top-4 left-4 pointer-events-none select-none z-10">
        <span
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
          >Signature Area</span
        >
      </div>

      <div
        ref="signatureWrapper"
        class="bg-white h-100 w-full"
        @pointerdown="updatePadState(false)"
      >
        <VueSignaturePad
          v-if="isReady"
          ref="signature"
          height="100%"
          width="100%"
          :options="options"
          @signature-started="updatePadState(false)"
          @signature-ended="updatePadState(true)"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gray-50 animate-pulse"
        >
          <span class="text-xs text-gray-400 font-medium"
            >Preparing Signature Area...</span
          >
        </div>
      </div>

      <!-- Control Panel (similar to documentation) -->
      <div class="absolute bottom-6 right-6 flex flex-col items-end gap-3 z-20">
        <!-- Clear Button -->
        <div class="flex items-center gap-3">
          <span
            class="text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded shadow-sm"
            >Clear</span
          >
          <button
            type="button"
            aria-label="Clear signature"
            class="flex items-center justify-center w-10 h-10 bg-white text-gray-600 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all outline-none"
            @click="handleClearCanvas"
          >
            <BrushCleaning class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <!-- Undo Button -->
        <div class="flex items-center gap-3">
          <span
            class="text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded shadow-sm"
            >Undo</span
          >
          <button
            type="button"
            aria-label="Undo last stroke"
            class="flex items-center justify-center w-10 h-10 bg-white text-gray-600 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all outline-none"
            @click="handleUndo"
          >
            <Undo2 class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <!-- Save Button -->
        <div class="flex items-center gap-3">
          <span
            class="text-xs font-medium px-2 py-1 rounded shadow-sm transition-colors duration-200"
            :class="
              isSaveDisabled
                ? 'text-gray-400 bg-gray-50'
                : 'text-blue-600 bg-white/80'
            "
            >Save</span
          >
          <button
            type="button"
            aria-label="Save signature"
            class="flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200 outline-none"
            :class="
              isSaveDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border border-gray-100'
                : 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700 hover:scale-105 active:scale-95'
            "
            :disabled="isSaveDisabled"
            @click="handleSaveSignature"
          >
            <Save class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="SelectedDocumentId === 'text_witness_signature'">
      <div>
        <RequiredLabel label="Witness Name" :required="true" />
        <InputText
          v-model="nameWitnessSignature"
          fluid
          class="input-base! bg-white! text-black!"
        />
      </div>
    </div>
  </div>
</template>
