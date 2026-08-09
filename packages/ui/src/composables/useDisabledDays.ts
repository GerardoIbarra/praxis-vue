import { computed, type Ref } from "vue";

/**
 * Composable that converts a list of day names into an array of numbers (0-6)
 * suitable for PrimeVue DatePicker's disabled-days prop.
 *
 * @param preferenceDays - A ref containing an array of day names (e.g., ["sun", "monday"]).
 * @returns A computed ref containing an array of numbers (0 for Sunday, 6 for Saturday).
 */
export function useDisabledDays(preferenceDays: Ref<string[]>) {
  const dayNameToNumber: Record<string, number> = {
    sun: 0,
    sunday: 0,
    mon: 1,
    monday: 1,
    tue: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
  };

  return computed<number[]>(() => {
    return (preferenceDays.value || [])
      .map((day) => dayNameToNumber[day.toLowerCase()])
      .filter((d) => d !== undefined);
  });
}
