<script setup lang="ts">
import type { DaysChoosen } from "@/types/api/common";
import PxCheckbox from "@/components/_primitives/PxCheckbox.vue";
import PxRadioButton from "@/components/_primitives/PxRadioButton.vue";
import PxRequiredLabel from "../base/PxRequiredLabel.vue";

type ModeType = "radio" | "checkbox";

// Props del componente
interface Props {
  modelValue: DaysChoosen | string;
  mode?: ModeType;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  showRequired?: boolean;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "radio",
  disabled: false,
  required: false,
  label: "Days of the week",
  showRequired: false,
  vertical: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: DaysChoosen | string];
}>();

const weekDays = {
  sunday: "Sun",
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
};

const handleDayChange = (day: string, value: boolean): void => {
  if (props.mode === "checkbox") {
    // Para checkbox, actualizar directamente la propiedad del objeto
    if (props.modelValue && typeof props.modelValue === "object") {
      const newValue = { ...props.modelValue };
      newValue[day as keyof DaysChoosen] = value;
      emit("update:modelValue", newValue);
    }
  } else {
    // Para radio, emitir el día seleccionado
    emit("update:modelValue", day);
  }
};

const isDaySelected = (day: string): boolean => {
  if (props.mode === "checkbox") {
    // Para checkbox, verificar si el día está seleccionado
    return Boolean(
      props.modelValue &&
      typeof props.modelValue === "object" &&
      props.modelValue[day as keyof DaysChoosen] === true
    );
  } else {
    // Para radio, verificar si el día es el seleccionado
    return props.modelValue === day;
  }
};
</script>

<template>
  <div>
    <PxRequiredLabel
      :label="label"
      :required="required"
      :show-required="showRequired"
      class="block text-sm font-medium mb-2"
    />

    <div
      class="flex gap-3"
      :class="vertical ? 'flex-col' : 'flex-row flex-wrap'"
    >
      <div
        v-for="(dayLabel, day) in weekDays"
        :key="day"
        class="flex items-center"
      >
        <PxRadioButton
          v-if="mode === 'radio'"
          :model-value="modelValue"
          :value="day"
          :input-id="'day_' + day"
          :disabled="disabled"
          class="mr-1"
          @update:model-value="() => handleDayChange(day, true)"
        />

        <!-- Checkbox Mode -->
        <PxCheckbox
          v-else
          :model-value="isDaySelected(day)"
          :binary="true"
          :input-id="'day_' + day"
          :disabled="disabled"
          class="mr-1"
          @update:model-value="(value) => handleDayChange(day, value as boolean)"
        />

        <label
          :for="'day_' + day"
          class="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer ml-1 capitalize"
        >
          {{ dayLabel }}
        </label>
      </div>
    </div>
  </div>
</template>


