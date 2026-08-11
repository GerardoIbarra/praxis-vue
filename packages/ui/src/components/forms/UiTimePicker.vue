<script setup lang="ts">
import { ref, watch, computed, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Clock, ChevronDown } from "@lucide/vue";
import UiLabel from "@/components/base/UiLabel.vue";

const props = defineProps<{
  /** Valor del tiempo en formato HH:mm (24h) — siempre en 24h internamente */
  modelValue?: string | null;
  /** Etiqueta superior del input */
  label?: string;
  /** Si el campo es obligatorio (muestra asterisco rojo) */
  required?: boolean;
  /** Deshabilita el input */
  disabled?: boolean;
  /** Placeholder opcional */
  placeholder?: string;
  /** Formato de visualización: '24h' (default) o '12h' (AM/PM) */
  format?: "24h" | "12h";
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
  (e: "change", value: string | null): void;
}>();

const isOpen = ref(false);
const timePickerRef = ref<HTMLElement | null>(null);

const selectedHour = ref<string>("00");
const selectedMinute = ref<string>("00");
const selectedPeriod = ref<"AM" | "PM">("AM");

const hoursContainerRef = ref<HTMLElement | null>(null);
const minutesContainerRef = ref<HTMLElement | null>(null);

// Horas según formato
const hours = computed(() =>
  props.format === "12h"
    ? Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
    : Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
);
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

// Conversión interna: HH:mm (24h) → 12h display
const to12h = (h24: string): { hour: string; period: "AM" | "PM" } => {
  const n = parseInt(h24, 10);
  if (n === 0) return { hour: "12", period: "AM" };
  if (n < 12) return { hour: n.toString().padStart(2, "0"), period: "AM" };
  if (n === 12) return { hour: "12", period: "PM" };
  return { hour: (n - 12).toString().padStart(2, "0"), period: "PM" };
};

// Conversión: 12h → HH:mm (24h)
const to24h = (h12: string, period: "AM" | "PM"): string => {
  let n = parseInt(h12, 10);
  if (period === "AM") {
    if (n === 12) n = 0;
  } else {
    if (n !== 12) n += 12;
  }
  return n.toString().padStart(2, "0");
};

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder || "00:00";
  if (props.format === "12h") {
    const [h] = props.modelValue.split(":");
    const { hour, period } = to12h(h);
    return `${hour}:${props.modelValue.split(":")[1]} ${period}`;
  }
  return props.modelValue;
});

const parseModelValue = (val: string | null | undefined) => {
  if (!val) {
    selectedHour.value = props.format === "12h" ? "12" : "00";
    selectedMinute.value = "00";
    selectedPeriod.value = "AM";
    return;
  }
  const [h, m] = val.split(":");
  if (h && m) {
    selectedMinute.value = m.padStart(2, "0");
    if (props.format === "12h") {
      const { hour, period } = to12h(h);
      selectedHour.value = hour;
      selectedPeriod.value = period;
    } else {
      selectedHour.value = h.padStart(2, "0");
    }
  }
};

watch(
  () => props.modelValue,
  (newVal) => parseModelValue(newVal),
  { immediate: true }
);

watch(
  () => props.format,
  () => parseModelValue(props.modelValue)
);

onClickOutside(timePickerRef, () => {
  if (isOpen.value) isOpen.value = false;
});

const togglePicker = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) scrollToSelected();
};

const selectHour = (h: string) => {
  selectedHour.value = h;
  updateValue();
};

const selectMinute = (m: string) => {
  selectedMinute.value = m;
  updateValue();
};

const selectPeriod = (p: "AM" | "PM") => {
  selectedPeriod.value = p;
  updateValue();
};

const updateValue = () => {
  let h24: string;
  if (props.format === "12h") {
    h24 = to24h(selectedHour.value, selectedPeriod.value);
  } else {
    h24 = selectedHour.value;
  }
  const newVal = `${h24}:${selectedMinute.value}`;
  emit("update:modelValue", newVal);
  emit("change", newVal);
};

const scrollToSelected = async () => {
  await nextTick();
  if (hoursContainerRef.value) {
    const activeHour = hoursContainerRef.value.querySelector(".is-active") as HTMLElement;
    if (activeHour) {
      hoursContainerRef.value.scrollTop =
        activeHour.offsetTop - hoursContainerRef.value.clientHeight / 2 + activeHour.clientHeight / 2;
    }
  }
  if (minutesContainerRef.value) {
    const activeMinute = minutesContainerRef.value.querySelector(".is-active") as HTMLElement;
    if (activeMinute) {
      minutesContainerRef.value.scrollTop =
        activeMinute.offsetTop - minutesContainerRef.value.clientHeight / 2 + activeMinute.clientHeight / 2;
    }
  }
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full relative" ref="timePickerRef">
    <UiLabel
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
        :style="format === '12h' ? 'width: 260px;' : 'width: 200px;'"
      >
        <!-- Columna: Horas -->
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

        <!-- Columna: Minutos -->
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

        <!-- Columna AM/PM — solo en formato 12h -->
        <div v-if="format === '12h'" class="flex flex-col items-center gap-1">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">　</div>
          <div class="flex flex-col gap-2 pt-4">
            <button
              v-for="p in (['AM', 'PM'] as const)"
              :key="p"
              class="px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 border"
              :class="selectedPeriod === p
                ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                : 'text-gray-600 dark:text-gray-300 border-gray-200 dark:border-surface-700 hover:bg-gray-100 dark:hover:bg-surface-800'"
              @click="selectPeriod(p)"
            >
              {{ p }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
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
