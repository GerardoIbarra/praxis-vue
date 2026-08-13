// ============================================================
// px-vue-ui — Public API
// ============================================================

import './styles/base.css'

// --- Base ---
export { default as PxAvatar } from './components/base/PxAvatar.vue'
export { default as PxAvatarSelect } from './components/base/PxAvatarSelect.vue'
export { default as PxColorInput } from './components/base/PxColorInput.vue'
export { default as PxVisualSelect } from './components/base/PxVisualSelect.vue'
export { default as PxCategorizedSelect } from './components/base/PxCategorizedSelect.vue'
export { default as PxPhoneInput } from './components/base/PxPhoneInput.vue'
export { default as PxLabel } from './components/base/PxLabel.vue'
export { default as PxRequiredLabel } from './components/base/PxRequiredLabel.vue'
export { default as PxThemeSwitch } from './components/base/PxThemeSwitch.vue'
export { default as PxLoader } from './components/base/PxLoader.vue'

// --- Forms ---
export { default as PxSchemaForm } from './components/forms/PxSchemaForm.vue'
export { default as PxGridSelect } from './components/forms/PxGridSelect.vue'
export { default as PxSelectableListWithTable } from './components/forms/PxSelectableListWithTable.vue'
export { default as PxDayPicker } from './components/forms/PxDayPicker.vue'
export { default as PxDialogInput } from './components/forms/PxDialogInput.vue'
export { default as PxFormRow } from './components/forms/PxFormRow.vue'
export { default as PxSchemaMultiSelect } from './components/forms/PxSchemaMultiSelect.vue'
export { default as PxTimePicker } from './components/forms/PxTimePicker.vue'
export { default as PxStateChecklist } from './components/forms/PxStateChecklist.vue'
export { default as PxAsyncSelect } from './components/forms/PxAsyncSelect.vue'

// --- Data Display ---
export { default as PxDataTable } from './components/data-display/PxDataTable.vue'
export { default as PxTree } from './components/data-display/PxTree.vue'
export { default as PxDocumentViewer } from './components/data-display/PxDocumentViewer.vue'
export { default as PxInitialsAvatar } from './components/data-display/PxInitialsAvatar.vue'
export { default as PxInfoField } from './components/data-display/PxInfoField.vue'
export { default as PxDisplayOptions } from './components/data-display/PxDisplayOptions.vue'
export { default as PxBadgedValueGrid } from './components/data-display/PxBadgedValueGrid.vue'
export { default as PxLabeledValueSection } from './components/data-display/PxLabeledValueSection.vue'
export { default as PxStatusDataTable } from './components/data-display/PxStatusDataTable.vue'

// --- Layout ---
export { default as PxColumnLayout } from './components/layout/PxColumnLayout.vue'
export { default as PxCard } from './components/layout/PxCard.vue'
export { default as PxHeader } from './components/layout/PxHeader.vue'
export { default as PxListLayout } from './components/layout/PxListLayout.vue'
export { default as PxFilterBar } from './components/layout/PxFilterBar.vue'
export { default as PxFormLayout } from './components/layout/PxFormLayout.vue'

// --- Navigation ---
export { default as PxTabs } from './components/navigation/PxTabs.vue'
export { default as PxStepper } from './components/navigation/PxStepper.vue'
export { default as PxStepperHeader } from './components/navigation/PxStepperHeader.vue'
export { default as PxDropdownMenu } from './components/navigation/PxDropdownMenu.vue'
export { default as PxNavList } from './components/navigation/PxNavList.vue'
export type { NavListItem, ActionMenuItem } from './types/ui/navigation'

// --- Primitives ---
export { default as PxAccordion } from './components/_primitives/PxAccordion.vue'
export { default as PxBadge } from './components/_primitives/PxBadge.vue'
export { default as PxCheckbox } from './components/_primitives/PxCheckbox.vue'
export { default as PxDialog } from './components/_primitives/PxDialog.vue'
export { default as PxDrawer } from './components/_primitives/PxDrawer.vue'
export { default as PxRadioButton } from './components/_primitives/PxRadioButton.vue'
export { default as PxTimeline } from './components/_primitives/PxTimeline.vue'

// ---

export { useFieldValidation } from './composables/useFieldValidation'
export { useFieldAutofill } from './composables/useFieldAutofill'
export { useAsyncSelect } from './composables/useAsyncSelect'
export { useDisabledDays } from './composables/useDisabledDays'
// --- Utils ---
export * from './utils/numberFormat'
export * from './utils/fileValidation'
export * from './utils/downloadHelper'
export * from './utils/usePopperPosition'
export * from './utils/documentUtils'
