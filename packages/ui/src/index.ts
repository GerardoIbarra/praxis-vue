// ============================================================
// @praxis/vue — Public API
// ============================================================

// --- Base ---
export { default as BaseAvatar } from './components/base/BaseAvatar.vue'
export { default as AvatarSelect } from './components/base/AvatarSelect.vue'
export { default as ColorPickerField } from './components/base/ColorPickerField.vue'
export { default as ColorSelect } from './components/base/ColorSelect.vue'
export { default as GroupedMultiSelect } from './components/base/GroupedMultiSelect.vue'
export { default as GroupSelect } from './components/base/GroupSelect.vue'
export { default as PhoneNumber } from './components/base/PhoneNumber.vue'
export { default as RequiredLabel } from './components/base/RequiredLabel.vue'
export { default as ThemeToggle } from './components/base/ThemeToggle.vue'
export { default as FullPageLoader } from './components/base/FullPageLoader.vue'
export { default as LazyLoadingSpinner } from './components/base/LazyLoadingSpinner.vue'

// --- Forms ---
export { default as DynamicForm } from './components/forms/DynamicForm.vue'
export { default as CheckListField } from './components/forms/CheckListField.vue'
export { default as CheckListInputField } from './components/forms/CheckListInputField.vue'
export { default as InfiniteScrollSelect } from './components/forms/InfiniteScrollSelect.vue'
export { default as SelectListField } from './components/forms/SelectListField.vue'
export { default as SelectableList } from './components/forms/SelectableList.vue'
export { default as SelectableListWithTable } from './components/forms/SelectableListWithTable.vue'
export { default as WeekDaysSelector } from './components/forms/WeekDaysSelector.vue'
export { default as ModalInput } from './components/forms/ModalInput.vue'
export { default as FormFieldRow } from './components/forms/FormFieldRow.vue'
export { default as FormMultiSelectList } from './components/forms/FormMultiSelectList.vue'

// --- Data Display ---
export { default as BaseDataTable } from './components/data-display/BaseDataTable.vue'
export { default as BaseTree } from './components/data-display/BaseTree.vue'
export { default as PdfViewer } from './components/data-display/PdfViewer.vue'
export { default as SignatureDocument } from './components/data-display/SignatureDocument.vue'
export { default as InitialsAvatar } from './components/data-display/InitialsAvatar.vue'
export { default as ProfileInfoField } from './components/data-display/ProfileInfoField.vue'
export { default as AuditLogButton } from './components/data-display/AuditLogButton.vue'
export { default as DisplayOptions } from './components/data-display/DisplayOptions.vue'
export { default as EligibilityBenefits } from './components/data-display/EligibilityBenefits.vue'
export { default as EligibilitySection } from './components/data-display/EligibilitySection.vue'
export { default as ExistingDataTable } from './components/data-display/ExistingDataTable.vue'
export { default as TreeList } from './components/data-display/TreeList.vue'

// --- Layout ---
export { default as ColumnLayout } from './components/layout/ColumnLayout.vue'
export { default as DashboardCard } from './components/layout/DashboardCard.vue'
export { default as FormHeader } from './components/layout/FormHeader.vue'
export { default as PageHeader } from './components/layout/PageHeader.vue'
export { default as ListViewWrapper } from './components/layout/ListViewWrapper.vue'
export { default as ListHeader } from './components/layout/ListHeader.vue'
export { default as CardFilterContainer } from './components/layout/CardFilterContainer.vue'
export { default as FormViewWrapper } from './components/layout/FormViewWrapper.vue'
export { default as FormDividerWithComponents } from './components/layout/FormDividerWithComponents.vue'

// --- Navigation ---
export { default as TabComponent } from './components/navigation/TabComponent.vue'
export { default as StepNavigation } from './components/navigation/StepNavigation.vue'
export { default as StepHeader } from './components/navigation/StepHeader.vue'
export { default as ActionMenu } from './components/navigation/ActionMenu.vue'

// --- Overlays ---
export { default as AuditLogSidebar } from './components/overlays/AuditLogSidebar.vue'
export { default as AuditLogContent } from './components/overlays/AuditLogContent.vue'
export { default as FeedbackModal } from './components/overlays/FeedbackModal.vue'
export { default as TimeSlotModal } from './components/overlays/TimeSlotModal.vue'
export { default as NodeTreeModal } from './components/overlays/NodeTreeModal.vue'
export { default as AlternateDurationModal } from './components/overlays/AlternateDurationModal.vue'
export { default as AlternateDurationsList } from './components/overlays/AlternateDurationsList.vue'
export { default as StaffFormDialog } from './components/overlays/StaffFormDialog.vue'

// --- Composables ---
export { useActionConfirmation } from './composables/useActionConfirmation'
export { useConfirmationModal } from './composables/useConfirmationModal'
export { useDateRangeValidation } from './composables/useDateRangeValidation'
export { useDeleteConfirmation } from './composables/useDeleteConfirmation'
export { useDisabledDays } from './composables/useDisabledDays'
export { useFieldAutofill } from './composables/useFieldAutofill'
export { useFieldValidation } from './composables/useFieldValidation'
export { useInfiniteScrollSelect } from './composables/useInfiniteScrollSelect'
export { useNotifications } from './composables/useNotifications'
export { usePolicyFields } from './composables/usePolicyFields'
export { useSearchFieldDependency } from './composables/useSearchFieldDependency'
export { useSelectOptions } from './composables/useSelectOptions'
export { useZipCode } from './composables/useZipCode'
export { useApiMap } from './composables/useApiMap'

// --- Directives ---
export { default as vMedicalDocumentEditor } from './directives/medicalDocumentEditor'

// --- Utils ---
export * from './utils/numberFormat'
export * from './utils/fileValidation'
export * from './utils/downloadHelper'
export * from './utils/usePopperPosition'
export * from './utils/medicalDocumentUtils'
