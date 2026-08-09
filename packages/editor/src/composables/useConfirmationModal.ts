import Swal from "sweetalert2";

interface ErrorMessage {
  confirmation_message: string;
}

/**
 * Composable for showing confirmation modals using SweetAlert2
 * Provides a consistent confirmation dialog across the application
 */
export const useConfirmationModal = () => {
  /**
   * Formats the message from backend response
   * Handles both string and array formats
   * @param messageOrArray - Can be a string or an array of error messages
   */
  const formatMessage = (messageOrArray: string | ErrorMessage[]): string => {
    if (typeof messageOrArray === "string") {
      return messageOrArray;
    }

    if (Array.isArray(messageOrArray)) {
      return messageOrArray
        .map((error) => `• ${error.confirmation_message}`)
        .join("<br><br>");
    }

    return "";
  };

  /**
   * Shows a confirmation modal and executes a callback if confirmed
   * @param message - The message to display (can be string or array of error messages)
   * @param onConfirm - Callback function to execute when user confirms
   */
  const showConfirmation = async (
    message: string | ErrorMessage[],
    onConfirm: () => void | Promise<void>
  ): Promise<void> => {
    const formattedMessage = formatMessage(message);

    const result = await Swal.fire({
      title: "Are you sure?",
      html: formattedMessage,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--p-primary-color)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      didOpen: () => {
        const container = Swal.getContainer();
        if (container) {
          container.style.zIndex = "99999";
        }
      },
    });

    if (result.isConfirmed) {
      await onConfirm();
    }
  };

  /**
   * Shows a simple alert/warning modal with an "OK" button
   * @param title - The title for the modal
   * @param text - The content message
   * @param icon - SweetAlert icon type ("warning", "error", "info", "success")
   */
  const showAlert = async (
    title: string,
    text: string,
    icon: "warning" | "error" | "info" | "success" = "info"
  ): Promise<void> => {
    await Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "var(--p-primary-color)",
      didOpen: () => {
        const container = Swal.getContainer();
        if (container) {
          container.style.zIndex = "99999";
        }
      },
    });
  };

  return {
    showConfirmation,
    showAlert,
  };
};
