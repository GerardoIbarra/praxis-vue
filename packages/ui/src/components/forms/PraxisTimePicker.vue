<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Clock, ChevronDown } from "@lucide/vue";
import RequiredLabel from "@/components/base/RequiredLabel.vue";

const props = defineProps<{
  /** Valor del tiempo en formato HH:mm */
  modelValue?: string | null;
  /** Etiqueta superior del input */
  label?: string;
  /** Si el campo es obligatorio (muestra asterisco rojo) */
  required?: boolean;
  /** Deshabilita el input */
  disabled?: boolean;
  /** Placeholder opcional */
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
  (e: "change", value: string | null): void;
}>();

const isOpen = ref(false);
const timePickerRef = ref<HTMLElement | null>(null);

const selectedHour = ref<string>("00");
const selectedMinute = ref<string>("00");

const hoursContainerRef = ref<HTMLElement | null>(null);
const minutesContainerRef = ref<HTMLElement | null>(null);

// Generar horas y minutos
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder || "00:00";
  return props.modelValue;
});

const parseModelValue = (val: string | null | undefined) => {
  if (!val) {
    selectedHour.value = "00";
    selectedMinute.value = "00";
    return;
  }
  const [h, m] = val.split(":");
  if (h && m) {
    selectedHour.value = h.padStart(2, "0");
    selectedMinute.value = m.padStart(2, "0");
  }
};

watch(
  () => props.modelValue,
  (newVal) => {
    parseModelValue(newVal);
  },
  { immediate: true }
);

onClickOutside(timePickerRef, () => {
  if (isOpen.value) {
    isOpen.value = false;
  }
});

const togglePicker = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    scrollToSelected();
  }
};

const selectHour = (h: string) => {
  selectedHour.value = h;
  updateValue();
};

const selectMinute = (m: string) => {
  selectedMinute.value = m;
  updateValue();
};

const updateValue = () => {
  const newVal = `${selectedHour.value}:${selectedMinute.value}`;
  emit("update:modelValue", newVal);
  emit("change", newVal);
};

const scrollToSelected = async () => {
  await nextTick();
  if (hoursContainerRef.value) {
    const activeHour = hoursContainerRef.value.querySelector(".is-active") as HTMLElement;
    if (activeHour) {
      hoursContainerRef.value.scrollTop = activeHour.offsetTop - hoursContainerRef.value.clientHeight / 2 + activeHour.clientHeight / 2;
    }
  }
  if (minutesContainerRef.value) {
    const activeMinute = minutesContainerRef.value.querySelector(".is-active") as HTMLElement;
    if (activeMinute) {
      minutesContainerRef.value.scrollTop = activeMinute.offsetTop - minutesContainerRef.value.clientHeight / 2 + activeMinute.clientHeight / 2;
    }
  }
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full relative" ref="timePickerRef">
    <RequiredLabel
      v-if="label"
      :label="label"
      :required="required"
    />
    
    <!-- Trigger -->
    <div 
      class="relative w-full cursor-pointer group"
      @click="togglePicker"
    >
      <div 
        class="input-base w-full flex items-center justify-between transition-all duration-300"
        :class="[
          disabled ? 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 'is-enabled bg-white dark:bg-surface-900',
          isOpen ? 'ring-2 ring-primary-500/20 border-primary-500' : ''
        ]"
      >
        <div class="flex items-center gap-2">
          <Clock class="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
          <span :class="!modelValue ? 'text-gray-400' : 'text-gray-700 dark:text-gray-200'">
            {{ displayValue }}
          </span>
        </div>
        <ChevronDown 
          class="w-4 h-4 text-gray-400 transition-transform duration-300"
          :class="isOpen ? 'rotate-180 text-primary-500' : ''"
        />
      </div>
    </div>

    <!-- Popover -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div 
        v-if="isOpen"
        class="absolute z-50 top-full left-0 mt-2 p-3 bg-white dark:bg-surface-900 rounded-xl shadow-xl border border-gray-100 dark:border-surface-700 flex gap-2 backdrop-blur-md"
        style="width: 200px;"
      >
        <!-- Columnas: Horas -->
        <div class="flex-1 flex flex-col items-center">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hrs</div>
          <div 
            ref="hoursContainerRef"
            class="h-48 w-full overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col gap-1 pr-1 custom-scrollbar"
          >
            <div 
              v-for="h in hours" 
              :key="`h-${h}`"
              class="w-full text-center py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm"
              :class="selectedHour === h ? 'is-active bg-primary-500 text-white font-bold shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-800'"
              @click="selectHour(h)"
            >
              {{ h }}
            </div>
          </div>
        </div>

        <div class="flex items-center text-gray-300 font-bold">:</div>

        <!-- Columnas: Minutos -->
        <div class="flex-1 flex flex-col items-center">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Min</div>
          <div 
            ref="minutesContainerRef"
            class="h-48 w-full overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col gap-1 pr-1 custom-scrollbar"
          >
            <div 
              v-for="m in minutes" 
              :key="`m-${m}`"
              class="w-full text-center py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm"
              :class="selectedMinute === m ? 'is-active bg-primary-500 text-white font-bold shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-800'"
              @click="selectMinute(m)"
            >
              {{ m }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Scrollbar oculta visualmente pero funcional o estilizada muy sutil */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.6);
}
</style>
