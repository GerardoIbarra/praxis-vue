/**
 * Supported MIME types that can be detected
 */
type DetectableMimeType =
  "image/png" | "image/jpeg" | "image/gif" | "application/pdf" | "unknown";

/**
 * Detects the MIME type of a file based on its matching magic numbers (binary signature).
 * This is more secure than relying on the file extension.
 *
 * @param file - The file to check.
 * @returns Resolves with the detected MIME type or 'unknown'.
 */
export const detectMimeType = (
  file: File | Blob
): Promise<DetectableMimeType> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = (e: ProgressEvent<FileReader>): void => {
      if (!e.target?.result || e.target.error) {
        reject(e.target?.error ?? new Error("Failed to read file"));
        return;
      }

      const arr = new Uint8Array(e.target.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16).toUpperCase();
      }

      let mimeType: DetectableMimeType;

      switch (header) {
        case "89504E47":
          mimeType = "image/png";
          break;
        case "FFD8FFE0":
        case "FFD8FFE1":
        case "FFD8FFE2":
        case "FFD8FFE3":
        case "FFD8FFE8":
          mimeType = "image/jpeg";
          break;
        case "47494638": // GIF87a or GIF89a
          mimeType = "image/gif";
          break;
        case "25504446":
          mimeType = "application/pdf";
          break;
        default:
          mimeType = "unknown";
          break;
      }

      resolve(mimeType);
    };

    reader.onerror = (): void => {
      reject(reader.error ?? new Error("FileReader error"));
    };

    // Read only the first 4 bytes
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};
