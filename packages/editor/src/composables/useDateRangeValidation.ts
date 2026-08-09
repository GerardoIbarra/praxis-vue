import { computed, watch, type Ref } from "vue";
import { toast } from "vue3-toastify";

interface WeekDays {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

/**
 * Calcula la diferencia en minutos entre dos Date
 * Forzamos que ocurran el mismo día para ignorar diferencias de años/meses.
 */
export const checkStartEndTime = (
  start: Date,
  end: Date,
  range: number
): boolean => {
  if (!start || !end) return false;

  const tempStart = new Date(start);
  const tempEnd = new Date(end);

  // Normalizamos Fecha (Año, Mes, Día)
  tempEnd.setFullYear(
    tempStart.getFullYear(),
    tempStart.getMonth(),
    tempStart.getDate()
  );

  // Limpiamos segundos y milisegundos
  tempStart.setSeconds(0, 0);
  tempEnd.setSeconds(0, 0);

  const diffInMs: number = tempEnd.getTime() - tempStart.getTime();
  const diffInMinutes: number = diffInMs / (1000 * 60);

  if (diffInMinutes < 0 || diffInMinutes === 0) {
    toast.error(`Start time must be before end time`);
    return false;
  }

  if (diffInMinutes < range) {
    toast.error(`The time range must be at least ${range} minutes`);
    return false;
  }
  return true;
};

export function useDateRangeValidation(
  fromDate: Ref<Date | null | undefined>,
  toDate: Ref<Date | null | undefined>,
  weekDays?: Ref<WeekDays>
) {
  // Computed property to check if the date range is short (5 days or less)
  const isShortDateRange = computed((): boolean => {
    if (!fromDate.value || !toDate.value) {
      return false;
    }

    // Calculate the difference in days
    const diffTime = Math.abs(
      toDate.value.getTime() - fromDate.value.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Return true if the range is 5 days or less (including same day, which is 0)
    return diffDays <= 5;
  });

  // Watch to ensure from_date <= to_date
  watch(fromDate, (newVal) => {
    if (newVal && toDate.value && newVal > toDate.value) {
      toDate.value = null;
    }
  });

  // Watch to automatically reset week days when the date range is short
  if (weekDays) {
    watch(isShortDateRange, (isShort: boolean) => {
      if (isShort) {
        // Set all days to false when the range is 5 days or less
        weekDays.value = {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
        };
      } else {
        // Restore default weekday values when the range is longer
        weekDays.value = {
          sunday: false,
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
        };
      }
    });
  }

  return {
    isShortDateRange,
    checkStartEndTime,
  };
}
