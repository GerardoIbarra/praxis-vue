/**
 * Lightweight number formatting utilities for better readability
 * Optimized to avoid heavy Intl dependencies
 */

/** Input type for number formatting functions */
type NumberInput = number | string | null | undefined;

/**
 * Simple number formatting with thousands separators (US format)
 * @param number - The number to format
 * @returns Formatted number with commas as thousands separators
 *
 * @example
 * formatNumber(1234567) // "1,234,567"
 * formatNumber("1112458") // "1,112,458"
 */
export const formatNumber = (number: NumberInput): string => {
  if (number === null || number === undefined || number === "") {
    return "0";
  }

  const num = typeof number === "string" ? parseFloat(number) : number;

  if (isNaN(num)) {
    return "0";
  }

  // Simple regex-based comma insertion (much lighter than Intl)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Alias for formatNumber for backward compatibility
 * @param number - The number to format
 * @returns Formatted number with commas as thousands separators
 */
export const formatNumberWithCommas = (number: NumberInput): string => {
  return formatNumber(number);
};

/**
 * Format large numbers with compact notation (lightweight version)
 * @param number - The number to format
 * @returns Formatted number in compact notation
 *
 * @example
 * formatCompactNumber(1234567) // "1.2M"
 * formatCompactNumber(1234) // "1.2K"
 */
export const formatCompactNumber = (number: NumberInput): string => {
  if (number === null || number === undefined || number === "") {
    return "0";
  }

  const num = typeof number === "string" ? parseFloat(number) : number;

  if (isNaN(num)) {
    return "0";
  }

  // Simple compact notation without Intl dependency
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (abs >= 1000000000) {
    return sign + (abs / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (abs >= 1000000) {
    return sign + (abs / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (abs >= 1000) {
    return sign + (abs / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num.toString();
};

/**
 * Format number for pagination display
 * Automatically chooses between regular format and compact format based on size
 * @param number - The number to format
 * @returns Best formatted representation for pagination
 *
 * @example
 * formatPaginationNumber(1234) // "1,234"
 * formatPaginationNumber(1234567) // "1,234,567"
 */
export const formatPaginationNumber = (number: NumberInput): string => {
  const num = typeof number === "string" ? parseFloat(number) : number;

  if (isNaN(num as number) || num === null || num === undefined) {
    return "0";
  }

  // For pagination, we usually want to show exact numbers, not compact
  // But for very large numbers (over 10M), we can use compact notation
  if ((num as number) >= 10000000) {
    return formatCompactNumber(num);
  }

  return formatNumber(num);
};
