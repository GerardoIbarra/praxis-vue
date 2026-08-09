import { useActionConfirmation } from "./useActionConfirmation";

/**
 * Backward-compatible wrapper for delete confirmation modals.
 * Delegates to useActionConfirmation.
 */
export const useDeleteConfirmation = () => {
  const { confirmAction } = useActionConfirmation();

  const showDeleteConfirmation = async (
    onConfirm?: () => void | Promise<void>,
    options?: {
      title?: string;
      text?: string;
      confirmButtonText?: string;
      cancelButtonText?: string;
      confirmButtonColor?: string;
      cancelButtonColor?: string;
    }
  ): Promise<boolean> => {
    return confirmAction(onConfirm, {
      title: options?.title || "Are you sure?",
      text: options?.text || "You won't be able to revert this!",
      confirmButtonText: options?.confirmButtonText || "Yes, delete it!",
      cancelButtonText: options?.cancelButtonText || "No, cancel",
      confirmButtonColor: options?.confirmButtonColor,
      cancelButtonColor: options?.cancelButtonColor,
      icon: "warning",
    });
  };

  return {
    showDeleteConfirmation,
  };
};
