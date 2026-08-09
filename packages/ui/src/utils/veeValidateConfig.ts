import { defineRule, configure } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  confirmed,
  max_value,
  min_value,
  regex,
} from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";

// Types
type ValidationResult = boolean | string;
type ItemWithEmail = { email?: string };
type ItemWithNumber = { number?: string };
type ItemWithType = { number?: string; type?: string };

/**
 * Helper function to format field names for display in error messages
 * Replaces underscores with spaces (e.g., "position_top" becomes "position top")
 */
const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/.*\[\d+\]\./, "") // delete array indices like [0].
    .replace(/_/g, " ");
};

/**
 * Custom validation rule to check if a masked input field is complete
 * (i.e., doesn't contain underscore placeholders)
 */
const complete = (value: string): boolean => {
  if (value && value.includes("_")) {
    return false;
  }
  return true;
};

/**
 * Custom validation rule for required arrays
 * Ensures the value is an array with at least one element
 */
const arrayRequired = (value: unknown[]): boolean => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return false;
  }
  return true;
};

const is_adult = (value: string): boolean => {
  if (!value) {
    return true;
  }

  const birthDate = new Date(value);
  const today = new Date();

  const maxAllowedDate = new Date();
  maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - 18);
  maxAllowedDate.setHours(0, 0, 0, 0);

  const minAllowedDate = new Date(today);
  minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 100);
  minAllowedDate.setHours(0, 0, 0, 0);

  return birthDate <= maxAllowedDate && birthDate >= minAllowedDate;
};

const more100years = (value: string): boolean => {
  if (!value) {
    return true;
  }

  const birthDate = new Date(value);
  const today = new Date();

  const minAllowedDate = new Date(today);
  minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 120);
  minAllowedDate.setHours(0, 0, 0, 0);

  return birthDate >= minAllowedDate;
};

/**
 * Custom validation rule for Social Security Number
 */
const valid_ssn = (value: string): boolean => {
  if (!value) {
    return true;
  }

  const cleanSSN = value.replace(/[-\s_]/g, "");

  if (cleanSSN.length !== 9) {
    return true;
  }

  const firstPart = cleanSSN.substring(0, 3);
  const middlePart = cleanSSN.substring(3, 5);
  const lastPart = cleanSSN.substring(5, 9);

  if (firstPart === "000") return false;
  if (firstPart === "666") return false;

  const areaNumber = parseInt(firstPart, 10);
  if (areaNumber >= 900 && areaNumber <= 999) return false;
  if (middlePart === "00") return false;
  if (lastPart === "0000") return false;

  return true;
};

/**
 * Custom validation rule for Taxonomy Code
 */
const valid_taxonomy_code = (value: string): boolean => {
  if (!value) {
    return true;
  }

  const lastChar = value.charAt(9);
  const letterRegex = /^[A-Za-z]$/;
  if (!letterRegex.test(lastChar)) {
    return false;
  }

  return true;
};

/**
 * Custom validation rule for Password Complexity
 */
const password_complexity = (value: string): boolean => {
  if (!value) {
    return true;
  }

  if (value.length < 8) return false;
  if (!/[A-Z]/.test(value)) return false;
  if (!/[a-z]/.test(value)) return false;
  if (!/[0-9]/.test(value)) return false;

  return true;
};

/**
 * Custom validation rule to check for unique emails in an array
 */
const unique_email = (value: string, [items]: [ItemWithEmail[]]): boolean => {
  if (!value || !items || !Array.isArray(items)) return true;
  const emailLower = value.toLowerCase().trim();
  const count = items.filter(
    (item) => item.email?.toLowerCase().trim() === emailLower
  ).length;
  return count <= 1;
};

/**
 * Custom validation rule to check for unique contact numbers in an array
 */
const unique_contact_number = (
  value: string,
  [items]: [ItemWithNumber[]]
): boolean => {
  if (!value || !items || !Array.isArray(items)) return true;
  const count = items.filter((item) => item.number === value).length;
  return count <= 1;
};

/**
 * Custom validation rule to check if there is at least one contact number of type mobile in an array
 */
const at_least_one_mobile = (
  value: string,
  [items]: [ItemWithType[]]
): boolean => {
  if (!items || !Array.isArray(items)) return true;
  return items.some((item) => item.type === "mobile");
};

/**
 * Custom validation rule to check if there is at least one address of type home in an array
 */
const at_least_one_home = (
  value: string,
  [items]: [ItemWithType[]]
): boolean => {
  if (!items || !Array.isArray(items)) return true;
  return items.some((item) => item.type === "home");
};

/**
 * Custom validation rule to check if there is at least one email of type personal in an array
 */
const at_least_one_personal = (
  value: string,
  [items]: [ItemWithType[]]
): boolean => {
  if (!items || !Array.isArray(items)) return true;
  return items.some((item) => item.type === "personal");
};

const expiration_date_rule = (value: string, params: [string]): boolean => {
  const issueDateValue = params[0];
  if (!value || !issueDateValue) return true;
  const exp = new Date(value);
  const issuedte = new Date(issueDateValue);
  exp.setHours(0, 0, 0, 0);
  return exp >= issuedte;
};

const required_if_support_person = (value: string): ValidationResult => {
  if (!value) {
    return "This field is required when support person is added";
  }
  return true;
};

const licence_status = (
  value: string,
  params: [string, string]
): ValidationResult => {
  const issueDateValue = params[0];
  const expiration_date = params[1];

  if (!issueDateValue || !expiration_date) {
    return "Issue date and Expiration date are required";
  }

  const exp = new Date(expiration_date);
  const tdy = new Date();

  exp.setHours(0, 0, 0, 0);
  tdy.setHours(0, 0, 0, 0);

  if (exp < tdy && value === "active") {
    return "Licence has expired, can't be active";
  }

  if (exp >= tdy && value === "expired") {
    return "Licence can't be expired if expiration date is today or in the future";
  }
  return true;
};

const street_address = (streetAddress: string): boolean => {
  if (!streetAddress || streetAddress.trim() === "") {
    return true;
  }
  const regex = /^(?=.*[a-z])(?=.*\d|.*(?:\bs\/?n\b)).+$/i;
  return regex.test(streetAddress);
};

const validateLuhnStandard = (value: string): boolean => {
  let valStr = value;
  if (typeof value !== "string") {
    valStr = String(value);
  }

  const fullNumber = "80840" + valStr;

  let sum = 0;
  let shouldDouble = false;
  for (let i = fullNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(fullNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const npi_regex = (value: string): boolean => {
  if (!value) return true;

  const npiPattern = /^\d{10}$/;
  if (!npiPattern.test(value)) return false;
  return validateLuhnStandard(value);
};

const unique_identification_number = (
  value: string,
  [items, currentType]: [ItemWithType[], string]
): boolean => {
  if (!value || !items || !Array.isArray(items)) return true;
  const count = items.filter((item) => {
    return (
      item.number === value &&
      item.type?.toLowerCase() === currentType?.toLowerCase()
    );
  }).length;
  return count <= 1;
};

const dea_regex = (value: string): boolean => {
  if (!value) return true;
  const deaPattern = /^[a-zA-Z][a-zA-Z9]\d{7}$/;
  return deaPattern.test(value);
};

const nadean_regex = (value: string, [items]: [ItemWithType[]]): boolean => {
  if (!value) return true;
  const deaPattern = /^[xX][a-zA-Z]\d{7}$/;
  const count = items.filter((item) => {
    return item.type?.toLowerCase() === "dea";
  }).length;
  return deaPattern.test(value) && count >= 1;
};

const moneyCopay = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined || value === "") return true;

  const num = typeof value === "number" ? value : Number(value);

  if (isNaN(num)) return false;

  const cents = Math.round(num * 100);

  if (cents < 0) return false;
  if (cents > 999999) return false;

  return true;
};

const coinsurance = (
  value: string | number | null | undefined,
  [isRequired]: [string]
): ValidationResult => {
  if (
    isRequired === "true" &&
    (value === null || value === undefined || value === "")
  ) {
    return "Coinsurance percentage is required";
  }

  if (value === null || value === undefined || value === "") {
    return true;
  }

  const num = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(num)) return false;
  if (num < 0) return false;
  if (num > 100) return false;

  const decimalPart = num.toString().split(".")[1];
  if (decimalPart && decimalPart.length > 1) {
    return false;
  }

  return true;
};

const employer_regex = (value: string): boolean => {
  if (!value) return true;
  const pattern = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s&.\-',]*$/;
  return pattern.test(value);
};

/**
 * Custom validation rule to check if a date is after another date field
 * Used for validating date ranges (e.g., end_date must be after start_date)
 */
const min_date = (
  value: string,
  [dependentFieldValue, message]: [string, string?]
): ValidationResult => {
  // If no value and field is not required, it's valid
  if (!value) return true;

  // If dependent field has no value, this rule doesn't apply
  if (!dependentFieldValue) return true;

  // Compare dates
  const currentDate = new Date(value);
  const minDate = new Date(dependentFieldValue);

  // Reset time to compare only dates
  currentDate.setHours(0, 0, 0, 0);
  minDate.setHours(0, 0, 0, 0);

  if (currentDate <= minDate) {
    return message || "This date must be after the specified date";
  }

  return true;
};

/**
 * Custom validation rule to check if a date is before another date field
 * Used for validating date ranges (e.g., last_dose_date must be before expiration_date)
 */
const max_date = (
  value: string,
  [dependentFieldValue, message]: [string, string?]
): ValidationResult => {
  if (!value) return true;
  if (!dependentFieldValue) return true;

  const currentDate = new Date(value);
  const maxDateLimit = new Date(dependentFieldValue);

  currentDate.setHours(0, 0, 0, 0);
  maxDateLimit.setHours(0, 0, 0, 0);

  if (currentDate >= maxDateLimit) {
    return message || "This date must be before the specified date";
  }

  return true;
};

/**
 * Custom validation rule that makes a field required if another field has a value
 */
const required_if = (
  value: unknown,
  [dependentFieldValue, message]: [unknown, string?]
): ValidationResult => {
  // If dependent field has no value, this field is not required
  if (
    dependentFieldValue === null ||
    dependentFieldValue === undefined ||
    dependentFieldValue === ""
  ) {
    return true;
  }

  // If dependent field HAS a value, this field IS required
  if (value === null || value === undefined || value === "") {
    return message || "This field is required";
  }

  return true;
};

/**
 * Sets up vee-validate with all common validation rules and configuration
 */
export function setupVeeValidate(): void {
  // Define standard validation rules
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("confirmed", confirmed);
  defineRule("max_value", max_value);
  defineRule("min_value", min_value);
  defineRule("regex", regex);

  // Define custom validation rules
  defineRule("complete", complete);
  defineRule("arrayRequired", arrayRequired);
  defineRule("valid_ssn", valid_ssn);
  defineRule("valid_taxonomy_code", valid_taxonomy_code);
  defineRule("password_complexity", password_complexity);
  defineRule("unique_email", unique_email);
  defineRule("unique_contact_number", unique_contact_number);
  defineRule("at_least_one_mobile", at_least_one_mobile);
  defineRule("at_least_one_home", at_least_one_home);
  defineRule("at_least_one_personal", at_least_one_personal);

  // Dates rules
  defineRule("is_adult", is_adult);
  defineRule("more100years", more100years);
  defineRule("expiration_date_rule", expiration_date_rule);
  defineRule("licence_status", licence_status);
  defineRule("min_date", min_date);
  defineRule("max_date", max_date);
  defineRule("required_if", required_if);

  // Money Rules
  defineRule("moneyCopay", moneyCopay);
  // Percentage Rules
  defineRule("coinsurance", coinsurance);

  // Logic address rule
  defineRule("street_address", street_address);
  defineRule("required_if_support_person", required_if_support_person);

  // Identifications rules
  defineRule("npi_regex", npi_regex);
  defineRule("unique_identification_number", unique_identification_number);
  defineRule("dea_regex", dea_regex);
  defineRule("nadean_regex", nadean_regex);

  defineRule("employer_regex", employer_regex);

  // Configure validation behavior and messages
  configure({
    validateOnInput: true,
    generateMessage: localize("en", {
      messages: {
        required: (ctx) => `Please enter your ${formatFieldName(ctx.field)}`,
        email: (ctx) =>
          `Please enter a valid email address for ${formatFieldName(ctx.field)}`,
        min: (ctx) =>
          `This ${formatFieldName(ctx.field)} must have at least ${(ctx.rule?.params as unknown[])?.[0]} characters`,
        max: (ctx) =>
          `This ${formatFieldName(ctx.field)} must have at most ${(ctx.rule?.params as unknown[])?.[0]} characters`,
        confirmed: (ctx) =>
          `Passwords must match in ${formatFieldName(ctx.field)}`,
        max_value: (ctx) =>
          `This ${formatFieldName(ctx.field)} must not exceed ${(ctx.rule?.params as unknown[])?.[0]}`,
        min_value: (ctx) =>
          `This ${formatFieldName(ctx.field)} must be at least ${(ctx.rule?.params as unknown[])?.[0]}`,
        regex: (ctx) =>
          `Please enter a valid format for ${formatFieldName(ctx.field)}`,
        complete: (ctx) => `This ${formatFieldName(ctx.field)} is incomplete`,
        arrayRequired: (ctx) =>
          `At least one item is required for ${formatFieldName(ctx.field)}`,
        is_adult: (ctx) =>
          `The ${formatFieldName(ctx.field)} must be for a person between 18 and 100 years old`,
        more100years: (ctx) =>
          `The ${formatFieldName(ctx.field)} must be for a person older than 120 years old`,
        valid_ssn: () =>
          `Invalid SSN. Area cannot be 000, 666, or 900-999. Middle cannot be 00. Last cannot be 0000`,
        valid_taxonomy_code: () =>
          `Invalid Taxonomy Code. Must be exactly ending with a letter (A-Z)`,
        password_complexity: () =>
          `Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.`,
        unique_email: (ctx) =>
          `This ${formatFieldName(ctx.field)} is already in the list`,
        unique_contact_number: () =>
          `This contact number is already in the list`,
        at_least_one_mobile: () =>
          `At least one contact number must be of type mobile`,
        at_least_one_home: () => `At least one address must be of type home`,
        at_least_one_personal: () =>
          `At least one email must be of type personal`,
        expiration_date_rule: () => `The expiration date must be later.`,
        min_date: () => `This date must be after the specified date.`,
        max_date: () => `This date must be before the specified date.`,
        required_if: (ctx) =>
          `The ${formatFieldName(ctx.field)} is required when the related field has a value`,
        street_address: () =>
          `Street address must contain letters and numbers.`,
        npi_regex: () => `NPI not valid.`,
        unique_identification_number: () =>
          `This identification number is already in the list`,
        dea_regex: () => `DEA number not valid.`,
        nadean_regex: () => `Nadean number not valid.`,
        moneyCopay: () =>
          `Enter a valid copay amount (0 to 9,999.99 with up to 2 decimals).`,
        coinsurance: () =>
          `Enter a valid coinsurance percentage (0–100, max 1 decimal).`,
        employer_regex: () =>
          `Employer can only contain letters, numbers, spaces, and characters & . - '`,
      },
    }),
  });
}

// Export custom rules for direct use if needed
export {
  complete,
  arrayRequired,
  valid_ssn,
  valid_taxonomy_code,
  password_complexity,
  unique_email,
  unique_contact_number,
  at_least_one_mobile,
  at_least_one_home,
  at_least_one_personal,
  required_if_support_person,
  moneyCopay,
  coinsurance,
  min_date,
  max_date,
  required_if,
};
