/**
 * Utility to trigger a browser download for a Blob
 * @param data The blob data or any content that can be converted to a Blob
 * @param fileName The name of the file to save
 * @param mimeType The MIME type of the content (defaults to text/csv)
 */
export const downloadBlob = (
  data: BlobPart,
  fileName: string,
  mimeType:
    "text/csv" | "application/pdf" | "application/json" | string = "text/csv"
) => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);

  link.click();

  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
