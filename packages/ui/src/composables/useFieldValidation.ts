import { type Ref } from "vue";
import type { FormSchemaField } from "@/types/api/common";

/**
 * Composable for field validation logic in dynamic forms
 * Handles field dependencies, validation rules, and date constraints
 */

/**
 * Hook for managing field validation logic
 */
export function useFieldValidation(
  formData: Ref<Record<string, unknown>>,
  schema: Ref<FormSchemaField[]>
) {
  /**
   * Check if a field should be disabled based on visible_when dependency
   */
  const isFieldDisabled = (field: FormSchemaField): boolean => {
    // Check if field is explicitly disabled
    if (field.disabled) return true;

    // Check if field has a readonly rule
    if (field.rules && field.rules.readonly) {
      const readonlyRules = Array.isArray(field.rules.readonly)
        ? field.rules.readonly
        : [field.rules.readonly];

      for (const rule of readonlyRules) {
        const dependentFieldKey = rule.field;

        // Try to get value from formData first, then from schema
        let dependentValue = formData.value[dependentFieldKey];

        // If not in formData, check in schema
        if (
          dependentValue === undefined ||
          dependentValue === null ||
          dependentValue === ""
        ) {
          const dependentField = schema.value.find(
            (f) => f.key === dependentFieldKey
          );
          if (dependentField) {
            dependentValue = dependentField.value;
          }
        }

        if (dependentValue === rule.value) {
          return true;
        }
      }
    }

    // Check if field has a visible_when dependency
    if (field.visible_when && field.visible_when.field) {
      const dependentFieldKey = field.visible_when.field;

      // Try to get value from formData first, then from schema
      let dependentValue = formData.value[dependentFieldKey];

      // If not in formData, check in schema
      if (
        dependentValue === undefined ||
        dependentValue === null ||
        dependentValue === ""
      ) {
        const dependentField = schema.value.find(
          (f) => f.key === dependentFieldKey
        );
        if (dependentField) {
          dependentValue = dependentField.value;
        }
      }

      // Field is disabled if dependent field has no value
      if (
        dependentValue === null ||
        dependentValue === undefined ||
        dependentValue === ""
      ) {
        field.value = null;
        return true;
      }

      // For arrays, check if they have at least one item
      if (Array.isArray(dependentValue) && dependentValue.length === 0) {
        return true;
      }

      // If we got here, the dependent field has a value
      return false;
    }

    return false;
  };

  /**
   * Convert backend validation rules to vee-validate format
   */
  const getFieldRules = (field: FormSchemaField): string => {
    const rules: string[] = [];

    // Add required rule if needed
    if (field.required) {
      rules.push("required");
    }

    // If field has custom rules from backend
    if (field.rules) {
      // Handle min_date rule
      if (field.rules.min_date) {
        const { field: dependentField, message } = field.rules.min_date;

        // Get the dependent field value
        let dependentValue = formData.value[dependentField];
        if (!dependentValue) {
          const depField = schema.value.find((f) => f.key === dependentField);
          if (depField) {
            dependentValue = depField.value;
          }
        }

        if (dependentValue) {
          const ruleStr = message
            ? `min_date:${dependentValue},${message}`
            : `min_date:${dependentValue}`;
          rules.push(ruleStr);
        }
      }

      // Handle max_date rule
      if (field.rules.max_date) {
        const { field: dependentField, message } = field.rules.max_date;

        // Get the dependent field value
        let dependentValue = formData.value[dependentField];
        if (!dependentValue) {
          const depField = schema.value.find((f) => f.key === dependentField);
          if (depField) {
            dependentValue = depField.value;
          }
        }

        if (dependentValue) {
          const ruleStr = message
            ? `max_date:${dependentValue},${message}`
            : `max_date:${dependentValue}`;
          rules.push(ruleStr);
        }
      }

      // Handle required_if rule
      if (field.rules.required_if) {
        const { field: dependentField, message } = field.rules.required_if;

        // Get the dependent field value
        let dependentValue = formData.value[dependentField];
        if (!dependentValue) {
          const depField = schema.value.find((f) => f.key === dependentField);
          if (depField) {
            dependentValue = depField.value;
          }
        }

        if (dependentValue !== undefined && dependentValue !== null) {
          const ruleStr = message
            ? `required_if:${dependentValue},${message}`
            : `required_if:${dependentValue}`;
          rules.push(ruleStr);
        }
      }

      // Handle min_value rule
      if (field.rules.min_value) {
        const minVal = getMinNumberValue(field);
        if (minVal !== null) {
          const ruleSet = Array.isArray(field.rules.min_value)
            ? field.rules.min_value
            : [field.rules.min_value];
          const matchingRule = ruleSet.find((r: unknown) => {
            const rule = r as { when?: { field: string; value: unknown } };
            if (!rule || !rule.when) return true;
            return (
              (formData.value as Record<string, unknown>)[rule.when.field] ===
              rule.when.value
            );
          });

          const message = (matchingRule as { message?: string })?.message;
          const ruleStr = message
            ? `min_value:${minVal},${message}`
            : `min_value:${minVal}`;
          rules.push(ruleStr);
        }
      }

      // Handle max_value rule
      if (field.rules.max_value) {
        const maxVal = getMaxNumberValue(field);
        if (maxVal !== null) {
          const ruleSet = Array.isArray(field.rules.max_value)
            ? field.rules.max_value
            : [field.rules.max_value];
          const matchingRule = ruleSet.find((r: unknown) => {
            const rule = r as { when?: { field: string; value: unknown } };
            if (!rule || !rule.when) return true;
            return (
              (formData.value as Record<string, unknown>)[rule.when.field] ===
              rule.when.value
            );
          });

          const message = (matchingRule as { message?: string })?.message;
          const ruleStr = message
            ? `max_value:${maxVal},${message}`
            : `max_value:${maxVal}`;
          rules.push(ruleStr);
        }
      }
    }

    return rules.length > 0 ? rules.join("|") : "";
  };

  /**
   * Get minimum date for DatePicker from validation rules
   */
  const getMinDate = (field: FormSchemaField): Date | null => {
    if (field.rules && field.rules.min_date) {
      const dependentFieldKey = field.rules.min_date.field;

      let dependentValue = formData.value[dependentFieldKey];
      if (!dependentValue) {
        const depField = schema.value.find((f) => f.key === dependentFieldKey);
        if (depField) {
          dependentValue = depField.value;
        }
      }

      if (dependentValue) {
        const minDate = new Date(dependentValue as string | number | Date);
        minDate.setDate(minDate.getDate() + 1);
        return minDate;
      }
    }

    return null;
  };

  /**
   * Get maximum date for DatePicker from validation rules
   */
  const getMaxDate = (field: FormSchemaField): Date | null => {
    if (field.rules && field.rules.max_date) {
      const valueFiel = field.rules.max_date.value;
      if (valueFiel === "today") {
        return new Date();
      } else if (valueFiel) {
        return new Date(valueFiel as string | number | Date);
      }
    }

    return null;
  };

  /**
   * Get minimum value for Number inputs from validation rules
   */
  const getMinNumberValue = (field: FormSchemaField): number | null => {
    if (!field.rules || !field.rules.min_value) return null;

    const rules = Array.isArray(field.rules.min_value)
      ? field.rules.min_value
      : [field.rules.min_value];

    for (const rule of rules) {
      if (!rule) continue;

      if (rule.when) {
        const { field: depField, value: depValue } = rule.when;
        if (formData.value[depField] !== depValue) continue;
      }

      return rule.value as number;
    }
    return null;
  };

  /**
   * Get maximum value for Number inputs from validation rules
   */
  const getMaxNumberValue = (field: FormSchemaField): number | null => {
    if (!field.rules || !field.rules.max_value) return null;

    const rules = Array.isArray(field.rules.max_value)
      ? field.rules.max_value
      : [field.rules.max_value];

    for (const rule of rules) {
      if (!rule) continue;

      if (rule.when) {
        const { field: depField, value: depValue } = rule.when;
        if (formData.value[depField] !== depValue) continue;
      }

      return rule.value as number;
    }
    return null;
  };

  /**
   * Strictly enforces minimum value range by clamping the input value
   */
  const validateMinRange = (field: FormSchemaField) => {
    if (!field || field.value === "" || field.value === undefined) return;

    const minVal = getMinNumberValue(field);
    if (minVal !== null && Number(field.value) < minVal) {
      field.value = minVal as number;
    }
  };

  /**
   * Strictly enforces maximum value range by clamping the input value
   */
  const validateMaxRange = (field: FormSchemaField) => {
    if (!field || field.value === "" || field.value === undefined) return;

    const maxVal = getMaxNumberValue(field);
    if (maxVal !== null && Number(field.value) > maxVal) {
      field.value = maxVal as number;
    }
  };

  return {
    isFieldDisabled,
    getFieldRules,
    getMinDate,
    getMaxDate,
    getMinNumberValue,
    getMaxNumberValue,
    validateMinRange,
    validateMaxRange,
  };
}
