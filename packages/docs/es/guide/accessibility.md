---
title: Accesibilidad
description: Qué soporte de accesibilidad está realmente implementado en Praxis Vue, componente por componente.
---

# Accesibilidad

Esta página lista lo que está realmente implementado, en vez de una afirmación genérica de "es accesible" — la cobertura varía según el componente. Al momento de escribir esto, **16 de los 55 componentes** de la librería tienen atributos ARIA, roles o manejo de teclado explícitos. El resto depende de la semántica nativa de sus elementos HTML (`<button>`, `<input>`, `<label>`), lo cual cubre la operabilidad básica por teclado pero no comportamientos específicos para lectores de pantalla como regiones live o roving tabindex.

Si la accesibilidad es un requisito estricto para tu caso de uso, trata esta lista como punto de partida para tu propia auditoría, no como una garantía.

## Navegación por teclado

| Componente | Teclas soportadas |
|---|---|
| [`PxCommandPalette`](/es/components/overlays/px-command-palette) | `↑` / `↓` para moverse entre resultados, `Enter` para seleccionar, `Esc` para cerrar |
| [`PxDialog`](/es/components/primitives/px-dialog) | `Esc` para cerrar (cuando `closable`) |
| [`PxDrawer`](/es/components/primitives/px-drawer) | `Esc` para cerrar (cuando `closable`) |

Otros componentes interactivos (botones, links, inputs nativos, checkboxes/radios construidos sobre `<input>` reales) obtienen el comportamiento de Tab/Espacio/Enter gratis del navegador, sin manejadores de teclas personalizados.

## Roles y atributos ARIA

| Componente | Qué está marcado |
|---|---|
| [`PxCheckbox`](/es/components/primitives/px-checkbox) | `role="checkbox"`, `aria-checked`, `aria-disabled`, `tabindex` |
| [`PxRadioButton`](/es/components/primitives/px-radio-button) | `role="radio"`, `aria-checked`, `aria-disabled`, `tabindex` |
| [`PxToast`](/es/components/primitives/px-toast) | `role="alert"` en el toast, `aria-label` en el botón de cerrar |
| [`PxDialog`](/es/components/primitives/px-dialog) | `role="dialog"`, `aria-modal`, `aria-label` en el botón de cerrar |
| [`PxDrawer`](/es/components/primitives/px-drawer) | `role="dialog"`, `aria-modal`, `aria-label` en el botón de cerrar |
| [`PxCommandPalette`](/es/components/overlays/px-command-palette) | `role="dialog"`, `aria-modal` |
| [`PxAccordion`](/es/components/primitives/px-accordion) | `aria-expanded` en cada trigger de panel |
| [`PxTabs`](/es/components/navigation/px-tabs) | `aria-selected` en la tab activa |
| [`PxDropdownMenu`](/es/components/navigation/px-dropdown-menu) | `aria-label`, `aria-haspopup` en el trigger, `aria-hidden` en su ícono |
| [`PxLabel`](/es/components/base/px-label) | Asociación nativa `<label for>` con el `id` del campo |
| [`PxFormWizard`](/es/components/forms/px-form-wizard) | `aria-label` en el `<nav>` de progreso de pasos |
| [`PxPhoneInput`](/es/components/base/px-phone-input), [`PxSchemaForm`](/es/components/forms/px-schema-form), [`PxSelectableListWithTable`](/es/components/forms/px-selectable-list-with-table) | `aria-live="polite"` en el mensaje de error de validación, para que los lectores de pantalla lo anuncien al aparecer |
| [`PxDialogInput`](/es/components/forms/px-dialog-input), [`PxGridSelect`](/es/components/forms/px-grid-select), [`PxSelectableListWithTable`](/es/components/forms/px-selectable-list-with-table) | `aria-label` en los botones de eliminar por ítem, `aria-hidden` en sus íconos |

## Vacíos conocidos

- Los componentes construidos sobre `vue-select` (selects async/categorizados/de esquema) heredan el comportamiento de accesibilidad propio de esa librería, no ARIA personalizado de Praxis Vue.
- Ningún componente administra actualmente un `tabindex` rotativo para navegación con flechas dentro de listas (ej. `PxTree`, `PxNavList`, `PxStepper`) — la navegación es vía Tab, no con flechas, excepto en `PxCommandPalette`.
- El contraste de color no ha sido auditado contra WCAG AA como conjunto; la paleta por defecto (ver [Theming](/es/guide/theming)) es un punto de partida razonable pero no fue elegida contra un verificador de contraste.

Si encuentras un vacío específico que sea importante para tu proyecto, vale la pena reportarlo en [GitHub](https://github.com/GerardoIbarra/praxis-vue/issues) en vez de asumir que ya está cubierto.
