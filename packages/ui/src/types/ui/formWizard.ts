import type { Component } from "vue";
import type { ZodSchema } from "zod";
import type { FormSchemaField } from "@/types/api/common";

export interface WizardStep {
  id: string | number;
  title: string;
  description?: string;
  icon?: Component | unknown;
  schema: FormSchemaField[];
  zodSchema?: ZodSchema<any>;
  validate?: (
    stepData: Record<string, unknown>,
    allData: Record<string, unknown>
  ) => boolean | Promise<boolean> | string | Promise<string>;
}
