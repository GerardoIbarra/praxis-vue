import type { Component } from "vue";

export interface ActionMenuItem {
  label: string;
  command?: () => void;
  lucideIcon?: Component;
  class?: string;
}

export interface NavListItem {
  /** Unique id, required on groups so their expanded state can be tracked */
  key?: string;
  label: string;
  /** Path/href for a leaf item. Omit on groups and separators. */
  to?: string;
  icon?: Component;
  /** Defaults to true; set false to hide without removing from the array */
  visible?: boolean;
  /** Renders as a non-interactive section label instead of a link */
  separator?: boolean;
  /** One level of nested links, rendered as a collapsible group */
  items?: NavListItem[];
}
