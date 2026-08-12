// ============================================================
// praxis-vue-ui — Public API
// ============================================================

import './styles/base.css'

// --- Base ---
export { default as BaseAvatar } from './components/base/BaseAvatar.vue'
export { default as UiAvatar } from './components/base/UiAvatar.vue'
export { default as PraxisAvatarSelect } from './components/base/PraxisAvatarSelect.vue'
export { default as PraxisColorPickerField } from './components/base/PraxisColorPickerField.vue'
export { default as PraxisVisualSelect } from './components/base/PraxisVisualSelect.vue'
export { default as PraxisGroupedMultiSelect } from './components/base/PraxisGroupedMultiSelect.vue'
export { default as PraxisPhoneNumber } from './components/base/PraxisPhoneNumber.vue'
export { default as UiLabel } from './components/base/UiLabel.vue'
export { default as PraxisRequiredLabel } from './components/base/PraxisRequiredLabel.vue'
export { default as PraxisThemeToggle } from './components/base/PraxisThemeToggle.vue'
export { default as PraxisFullPageLoader } from './components/base/PraxisFullPageLoader.vue'
export { default as PraxisLazyLoadingSpinner } from './components/base/PraxisLazyLoadingSpinner.vue'

// --- Forms ---
export { default as PraxisDynamicForm } from './components/forms/PraxisDynamicForm.vue'
export { default as PraxisSelectableList } from './components/forms/PraxisSelectableList.vue'
export { default as PraxisSelectableListWithTable } from './components/forms/PraxisSelectableListWithTable.vue'
export { default as PraxisWeekDaysSelector } from './components/forms/PraxisWeekDaysSelector.vue'
export { default as PraxisModalInput } from './components/forms/PraxisModalInput.vue'
export { default as PraxisFormFieldRow } from './components/forms/PraxisFormFieldRow.vue'
export { default as PraxisFormMultiSelectList } from './components/forms/PraxisFormMultiSelectList.vue'
export { default as UiTimePicker } from './components/forms/UiTimePicker.vue'
export { default as PraxisCheckListField } from './components/forms/PraxisCheckListField.vue'
export { default as PraxisCheckListInputField } from './components/forms/PraxisCheckListInputField.vue'
export { default as PraxisSelectListField } from './components/forms/PraxisSelectListField.vue'
export { default as PraxisInfiniteScrollSelect } from './components/forms/PraxisInfiniteScrollSelect.vue'

// --- Data Display ---
export { default as BaseDataTable } from './components/data-display/BaseDataTable.vue'
export { default as BaseTree } from './components/data-display/BaseTree.vue'
export { default as PraxisPdfViewer } from './components/data-display/PraxisPdfViewer.vue'
export { default as PraxisInitialsAvatar } from './components/data-display/PraxisInitialsAvatar.vue'
export { default as PraxisProfileInfoField } from './components/data-display/PraxisProfileInfoField.vue'
export { default as PraxisDisplayOptions } from './components/data-display/PraxisDisplayOptions.vue'
export { default as PraxisBadgedValueGrid } from './components/data-display/PraxisBadgedValueGrid.vue'
export { default as PraxisLabeledValueSection } from './components/data-display/PraxisLabeledValueSection.vue'
export { default as PraxisExistingDataTable } from './components/data-display/PraxisExistingDataTable.vue'

// --- Layout ---
export { default as PraxisColumnLayout } from './components/layout/PraxisColumnLayout.vue'
export { default as PraxisDashboardCard } from './components/layout/PraxisDashboardCard.vue'
export { default as PraxisFormHeader } from './components/layout/PraxisFormHeader.vue'
export { default as PraxisPageHeader } from './components/layout/PraxisPageHeader.vue'
export { default as PraxisListViewWrapper } from './components/layout/PraxisListViewWrapper.vue'
export { default as PraxisListHeader } from './components/layout/PraxisListHeader.vue'
export { default as PraxisCardFilterContainer } from './components/layout/PraxisCardFilterContainer.vue'
export { default as PraxisFormViewWrapper } from './components/layout/PraxisFormViewWrapper.vue'

// --- Navigation ---
export { default as PraxisTabComponent } from './components/navigation/PraxisTabComponent.vue'
export { default as PraxisStepNavigation } from './components/navigation/PraxisStepNavigation.vue'
export { default as PraxisStepHeader } from './components/navigation/PraxisStepHeader.vue'
export { default as PraxisActionMenu } from './components/navigation/PraxisActionMenu.vue'
export { default as PraxisNavList } from './components/navigation/PraxisNavList.vue'
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
