---
title: Accessibility
description: What accessibility support is actually implemented in Praxis Vue, component by component.
---

# Accessibility

This page lists what's actually implemented, rather than a blanket "accessible" claim — coverage varies by component. As of this writing, **16 of the library's 55 components** have explicit ARIA attributes, roles, or custom keyboard handling. The rest rely on whatever semantics their native HTML elements (`<button>`, `<input>`, `<label>`) already provide, which covers basic keyboard operability but not screen-reader-specific behavior like live regions or roving tabindex.

If accessibility is a hard requirement for your use case, treat this list as a starting point for your own audit rather than a guarantee.

## Keyboard navigation

| Component | Keys handled |
|---|---|
| [`PxCommandPalette`](/components/overlays/px-command-palette) | `↑` / `↓` to move through results, `Enter` to select, `Esc` to close |
| [`PxDialog`](/components/primitives/px-dialog) | `Esc` to close (when `closable`) |
| [`PxDrawer`](/components/primitives/px-drawer) | `Esc` to close (when `closable`) |

Other interactive components (buttons, links, native inputs, checkboxes/radios built on real `<input>` elements) get Tab/Space/Enter behavior for free from the browser rather than custom key handlers.

## ARIA roles and attributes

| Component | What's marked up |
|---|---|
| [`PxCheckbox`](/components/primitives/px-checkbox) | `role="checkbox"`, `aria-checked`, `aria-disabled`, `tabindex` |
| [`PxRadioButton`](/components/primitives/px-radio-button) | `role="radio"`, `aria-checked`, `aria-disabled`, `tabindex` |
| [`PxToast`](/components/primitives/px-toast) | `role="alert"` on the toast, `aria-label` on the close button |
| [`PxDialog`](/components/primitives/px-dialog) | `role="dialog"`, `aria-modal`, `aria-label` on the close button |
| [`PxDrawer`](/components/primitives/px-drawer) | `role="dialog"`, `aria-modal`, `aria-label` on the close button |
| [`PxCommandPalette`](/components/overlays/px-command-palette) | `role="dialog"`, `aria-modal` |
| [`PxAccordion`](/components/primitives/px-accordion) | `aria-expanded` on each panel trigger |
| [`PxTabs`](/components/navigation/px-tabs) | `aria-selected` on the active tab |
| [`PxDropdownMenu`](/components/navigation/px-dropdown-menu) | `aria-label`, `aria-haspopup` on the trigger, `aria-hidden` on its icon |
| [`PxLabel`](/components/base/px-label) | Native `<label for>` association with the field's `id` |
| [`PxFormWizard`](/components/forms/px-form-wizard) | `aria-label` on the step progress `<nav>` |
| [`PxPhoneInput`](/components/base/px-phone-input), [`PxSchemaForm`](/components/forms/px-schema-form), [`PxSelectableListWithTable`](/components/forms/px-selectable-list-with-table) | `aria-live="polite"` on the validation error message, so screen readers announce it as it appears |
| [`PxDialogInput`](/components/forms/px-dialog-input), [`PxGridSelect`](/components/forms/px-grid-select), [`PxSelectableListWithTable`](/components/forms/px-selectable-list-with-table) | `aria-label` on per-item remove/delete buttons, `aria-hidden` on their icons |

## Known gaps

- Components built on `vue-select` (async/categorized/schema selects) inherit that library's own accessibility behavior rather than custom ARIA from Praxis Vue.
- No component currently manages roving `tabindex` for arrow-key navigation within lists (e.g. `PxTree`, `PxNavList`, `PxStepper`) — navigation is via Tab, not arrow keys, except in `PxCommandPalette`.
- Color contrast has not been audited against WCAG AA as a whole; the default palette (see [Theming](/guide/theming)) is a reasonable starting point but wasn't chosen against a contrast checker.

If you find a specific gap that matters for your project, it's worth filing an issue on [GitHub](https://github.com/GerardoIbarra/praxis-vue/issues) rather than assuming it's covered.
