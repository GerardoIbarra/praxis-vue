export type FormValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | unknown[]
  | null
  | undefined;

export type FieldType =
  | "text"
  | "number"
  | "integer"
  | "double"
  | "textarea"
  | "select"
  | "select_list"
  | "multiselect_list"
  | "date"
  | "time"
  | "checkbox"
  | "row"
  | "check_list"
  | "check_list_input"
  | "calculated_number"
  | "divider_with_components"
  | "hidden";

export interface AutofillRule {
  target: string;
  source_field: string;
}

export interface FormSchemaField {
  key?: string;
  label?: string;
  type: FieldType;
  required?: boolean;
  value?: unknown;
  placeholder?: string;
  readonly?: boolean;
  multiple?: boolean;
  options?: unknown[];
  selected_options?: unknown[];
  option_source?: {
    label_field?: string;
    value_field?: string;
    type?: string;
    search_field?: string;
    service?: string;
    endpoint?: string;
    search_param?: string;
    options?: Array<{ value: unknown }>;
  };
  components?: FormSchemaField[];
  autofill?: AutofillRule[] | Record<string, string>;
  rules?: Record<string, unknown>;
  pagination?: { page?: number; hasMore?: boolean };
  directories?: boolean;
  search?: boolean;
  searchActive?: boolean;
  open_text?: boolean;
  inputFree?: boolean;
  [key: string]: unknown;
}

export interface GeneralTabsProfile {
  key: string;
  label: string;
  icon: string;
  show?: boolean;
  enabled?: boolean;
  tooltip?: string;
  removeTab?: boolean;
  command?: () => void;
}

export interface DaysChoosen {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}
