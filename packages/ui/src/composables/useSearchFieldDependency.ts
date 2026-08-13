import { watch, type Ref } from "vue";
import type { FormSchemaField } from "@/types/api/common";
import { useApiMap } from "@/composables/useApiMap";

/**
 * Composable for handling select fields whose options depend on the value
 * of another field via `option_source.search_field`.
 *
 * This composable:
 *  1. Provides `reloadDependentFieldOptions(field, resolvedValue)` to
 *     manually trigger an options reload for a given field.
 *  2. Watches formData via a getter (snapshot) so Vue can properly diff
 *     old vs new primitive values.
 *  3. Debounces the reload so rapid keystrokes don't fire a request on every character.
 */
export function useSearchFieldDependency(
  formData: Ref<Record<string, unknown>>,
  schema: Ref<FormSchemaField[]>,
  delay = 600
) {
  const { getApiService } = useApiMap();

  // Per-field debounce timers keyed by field.key
  const timers: Record<string, ReturnType<typeof setTimeout>> = {};

  /**
   * Re-fetches the options for a field that uses `search_field`,
   * using the already-resolved value of the sibling field.
   */
  const reloadDependentFieldOptions = async (
    field: FormSchemaField,
    resolvedValue: string
  ) => {
    const { service, endpoint, search_param } = field.option_source || {};
    if (!service || !endpoint || !search_param || !resolvedValue) return;

    const api = getApiService(service);
    if (!api) return;

    try {
      const url = `${endpoint}${search_param}=${resolvedValue}`;
      const res = await api.get(url);
      const data = res.data?.results || res.data?.data || res.data || [];

      field.options = Array.isArray(data) ? data : [];

      // Reset pagination for the new dataset
      if (field.pagination) {
        field.pagination.page = 1;
        field.pagination.hasMore = !!res.data?.next;
      }
    } catch (error) {
      field.options = [];
      throw new Error(
        `[useSearchFieldDependency] Failed to reload options for "${field.key}": ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  /**
   * Debounced wrapper around reloadDependentFieldOptions.
   */
  const debouncedReload = (field: FormSchemaField, resolvedValue: string) => {
    const key = field.key || field.label || ""; // Fallback to label if key missing
    if (timers[key]) clearTimeout(timers[key]);
    timers[key] = setTimeout(() => {
      reloadDependentFieldOptions(field, resolvedValue);
    }, delay);
  };

  /**
   * Watch using a getter that returns a plain snapshot object of all
   * search_field key→value pairs from formData.
   */
  watch(
    () => {
      const snapshot: Record<string, unknown> = {};
      (schema.value || []).forEach((field) => {
        const key = field.option_source?.search_field;
        if (key) {
          snapshot[key] = (formData.value as Record<string, unknown>)[key];
        }
      });
      return snapshot;
    },
    (newSnapshot, oldSnapshot) => {
      (schema.value || []).forEach((field) => {
        const searchFieldKey = field.option_source?.search_field;
        if (!searchFieldKey) return;

        const newValue = newSnapshot[searchFieldKey];
        const oldValue = oldSnapshot?.[searchFieldKey];

        if (newValue && newValue !== oldValue) {
          const isInitialLoad = !oldValue;

          if (!isInitialLoad) {
            field.value = "";
          }
          debouncedReload(field, newValue as string);
        }
      });
    },
    { deep: true }
  );

  return {
    reloadDependentFieldOptions,
  };
}
