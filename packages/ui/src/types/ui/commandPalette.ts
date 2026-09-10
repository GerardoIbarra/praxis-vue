import type { Component } from "vue";

export interface CommandItem {
  id: string | number;
  title: string;
  subtitle?: string;
  group?: string;
  icon?: Component | unknown;
  badge?: string;
  shortcut?: string[];
  keywords?: string[];
  disabled?: boolean;
  perform?: (item: CommandItem) => void;
  [key: string]: unknown;
}
