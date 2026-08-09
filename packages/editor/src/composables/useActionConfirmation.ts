import Swal, {
  type SweetAlertOptions,
  type SweetAlertResult,
} from "sweetalert2";

/**
 * Composable for displaying SweetAlert2 dialogs with automatic z-index overlay fix.
 * Replaces duplicate inline Swal calls across the codebase.
 */
export const useActionConfirmation = () => {
  /**
   * Shows a highly customizable SweetAlert2 dialog.
   * Automatically handles standard options like zIndex for modal overlays.
   *
   * @param options - Custom SweetAlert2 options
   * @returns Promise<SweetAlertResult>
   */
  const showActionConfirmation = async (
    options: SweetAlertOptions
  ): Promise<SweetAlertResult> => {
    // Standard default configuration
    const mergedOptions: SweetAlertOptions = {
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--p-primary-color)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      ...options,
      didOpen: (popup) => {
        // Run user-provided didOpen if exists
        options.didOpen?.(popup);

        // Apply zIndex overlay fix
        const container = Swal.getContainer();
        if (container) {
          container.style.zIndex = "99999";
        }
      },
    };

    return await Swal.fire(mergedOptions);
  };

  /**
   * Shows a standard confirmation dialog and executes a callback if confirmed.
   *
   * @param onConfirm - Callback to execute on confirmation
   * @param options - Prompt parameters
   */
  const confirmAction = async (
    onConfirm?: () => void | Promise<void>,
    options?: {
      title?: string;
      text?: string;
      confirmButtonText?: string;
      cancelButtonText?: string;
      confirmButtonColor?: string;
      cancelButtonColor?: string;
      icon?: "warning" | "error" | "success" | "info" | "question";
    }
  ): Promise<boolean> => {
    const result = await showActionConfirmation({
      title: options?.title || "Are you sure?",
      text: options?.text || "Do you want to proceed?",
      icon: options?.icon || "warning",
      confirmButtonText: options?.confirmButtonText || "Yes",
      cancelButtonText: options?.cancelButtonText || "No, cancel",
      confirmButtonColor:
        options?.confirmButtonColor || "var(--p-primary-color)",
      cancelButtonColor: options?.cancelButtonColor,
    });

    if (result.isConfirmed) {
      await onConfirm?.();
      return true;
    }
    return false;
  };

  return {
    showActionConfirmation,
    confirmAction,
  };
};
