import { ref, type Ref } from "vue";
import type { FormSchemaField } from "@/types/api/common";

/**
 * Composable for field autofill logic
 * Handles automatic population of fields based on selected values
 */

/**
 * Hook for managing field autofill
 */
export function useFieldAutofill(
  formData: Ref<Record<string, unknown>>,
  schema: Ref<FormSchemaField[]>
) {
  // Track selected row for Weight/Height unit conversion
  const selectedRow = ref<number | null>(null);

  /**
   * Resolve nested object paths (e.g., "strengths[0].amount_formatted")
   * Supports dot notation and array indices
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedValue = (obj: any, path: string): unknown => {
    if (!path || !obj) return undefined;
    return (
      path
        .split(/[.[\]]+/)
        .filter(Boolean)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((acc: any, part: string) => acc && acc[part], obj)
    );
  };

  /**
   * Handle field selection and autofill logic
   * Updates related fields based on autofill configuration
   */
  const handleSelected = (value: unknown, field: FormSchemaField) => {
    // Special handling for Weight and Height fields (unit conversion)
    if (field.label === "Weight" || field.label === "Height") {
      if (
        (value as { value: string }).value === "pound" ||
        (value as { value: string }).value === "foot"
      ) {
        selectedRow.value = 1;
      } else {
        selectedRow.value = 0;
      }
    }

    // If no autofill configured, nothing to do
    if (!field.autofill) return;

    // Resolve selectedOption if value is primitive (when using :reduce)
    let selectedOption: unknown = value;
    if (value !== null && typeof value !== "object") {
      const valField = field.option_source?.value_field || "id";

      selectedOption =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (field.options || []).find((opt: any) => {
          const candidate = opt?.[valField] ?? opt?.value ?? opt?.id;
          return candidate === value;
        }) || null;

      // CRITICAL: If value is truthy (e.g. an ID) but we couldn't find the option object
      // (maybe because it's not in the current loaded list), we MUST NOT clear the fields.
      // We assume @option:selected handled the fill with the full object.

      // Allow free text if configured
      if (!selectedOption && !field.open_text && !field.inputFree) return;
      if (!selectedOption) {
        // Assume it is a free text value
        selectedOption = { value, [valField]: value };
      }
    }

    /**
     * Helper to write values to both formData and schema
     */
    const setValueForKey = (key: string, val: unknown) => {
      // Update formData (reactive)
      formData.value[key] = val ?? "";

      // Also update the field in the schema so the input reflects the change
      const targetField = schema.value.find((f) => f.key === key);
      if (targetField) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        targetField.value = (val ?? "") as any;
      }
    };

    // If no selectedOption (e.g. deselected), clear target fields
    if (!selectedOption) {
      if (Array.isArray(field.autofill)) {
        field.autofill.forEach((rule) => setValueForKey(rule.target, ""));
      } else if (typeof field.autofill === "object") {
        Object.keys(field.autofill).forEach((k) => setValueForKey(k, ""));
      }
      return;
    }

    // If autofill comes as array (backend format)
    if (Array.isArray(field.autofill)) {
      field.autofill.forEach((rule) => {
        const target = rule.target;
        const source = rule.source_field;
        // Use getNestedValue to support dot notation and array indices
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const val = getNestedValue(selectedOption as any, source) ?? "";
        setValueForKey(target, val);
      });
      return;
    }
  };

  return {
    selectedRow,
    getNestedValue,
    handleSelected,
  };
}
