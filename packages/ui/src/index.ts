// ============================================================
// praxis-vue-ui — Public API
// ============================================================

import './styles/base.css'

// --- Base ---
export { default as BaseAvatar } from './components/base/BaseAvatar.vue'
export { default as UiAvatar } from './components/base/UiAvatar.vue'
export { default as AvatarSelect } from './components/base/AvatarSelect.vue'
export { default as ColorPickerField } from './components/base/ColorPickerField.vue'
export { default as ColorSelect } from './components/base/ColorSelect.vue'
export { default as GroupedMultiSelect } from './components/base/GroupedMultiSelect.vue'
export { default as GroupSelect } from './components/base/GroupSelect.vue'
export { default as PhoneNumber } from './components/base/PhoneNumber.vue'
export { default as UiLabel } from './components/base/UiLabel.vue'
export { default as RequiredLabel } from './components/base/RequiredLabel.vue'
export { default as ThemeToggle } from './components/base/ThemeToggle.vue'
export { default as FullPageLoader } from './components/base/FullPageLoader.vue'
export { default as LazyLoadingSpinner } from './components/base/LazyLoadingSpinner.vue'

// --- Forms ---
export { default as DynamicForm } from './components/forms/DynamicForm.vue'
export { default as SelectableList } from './components/forms/SelectableList.vue'
export { default as SelectableListWithTable } from './components/forms/SelectableListWithTable.vue'
export { default as WeekDaysSelector } from './components/forms/WeekDaysSelector.vue'
export { default as ModalInput } from './components/forms/ModalInput.vue'
export { default as FormFieldRow } from './components/forms/FormFieldRow.vue'
export { default as FormMultiSelectList } from './components/forms/FormMultiSelectList.vue'
export { default as UiTimePicker } from './components/forms/UiTimePicker.vue'

// --- Data Display ---
export { default as BaseDataTable } from './components/data-display/BaseDataTable.vue'
export { default as BaseTree } from './components/data-display/BaseTree.vue'
export { default as PdfViewer } from './components/data-display/PdfViewer.vue'
export { default as InitialsAvatar } from './components/data-display/InitialsAvatar.vue'
export { default as ProfileInfoField } from './components/data-display/ProfileInfoField.vue'
export { default as DisplayOptions } from './components/data-display/DisplayOptions.vue'
export { default as BadgedValueGrid } from './components/data-display/BadgedValueGrid.vue'
export { default as LabeledValueSection } from './components/data-display/LabeledValueSection.vue'
export { default as ExistingDataTable } from './components/data-display/ExistingDataTable.vue'

// --- Layout ---
export { default as ColumnLayout } from './components/layout/ColumnLayout.vue'
export { default as DashboardCard } from './components/layout/DashboardCard.vue'
export { default as FormHeader } from './components/layout/FormHeader.vue'
export { default as PageHeader } from './components/layout/PageHeader.vue'
export { default as ListViewWrapper } from './components/layout/ListViewWrapper.vue'
export { default as ListHeader } from './components/layout/ListHeader.vue'
export { default as CardFilterContainer } from './components/layout/CardFilterContainer.vue'
export { default as FormViewWrapper } from './components/layout/FormViewWrapper.vue'

// --- Navigation ---
export { default as TabComponent } from './components/navigation/TabComponent.vue'
export { default as StepNavigation } from './components/navigation/StepNavigation.vue'
export { default as StepHeader } from './components/navigation/StepHeader.vue'
export { default as ActionMenu } from './components/navigation/ActionMenu.vue'
export { default as NavList } from './components/navigation/NavList.vue'
export type { NavListItem, ActionMenuItem } from './types/ui/navigation'

// --- Primitives ---
export { default as UiAccordion } from './components/_primitives/UiAccordion.vue'
export { default as UiBadge } from './components/_primitives/UiBadge.vue'
export { default as UiCheckbox } from './components/_primitives/UiCheckbox.vue'
export { default as UiDialog } from './components/_primitives/UiDialog.vue'
export { default as UiDrawer } from './components/_primitives/UiDrawer.vue'
export { default as UiRadioButton } from './components/_primitives/UiRadioButton.vue'
export { default as UiTimeline } from './components/_primitives/UiTimeline.vue'

// ---

export { useFieldValidation } from './composables/useFieldValidation'
export { useFieldAutofill } from './composables/useFieldAutofill'
export { useInfiniteScrollSelect } from './composables/useInfiniteScrollSelect'
export { useDisabledDays } from './composables/useDisabledDays'
// --- Utils ---
export * from './utils/numberFormat'
export * from './utils/fileValidation'
export * from './utils/downloadHelper'
export * from './utils/usePopperPosition'
export * from './utils/documentUtils'
