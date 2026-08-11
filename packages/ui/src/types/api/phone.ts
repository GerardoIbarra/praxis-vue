export interface PhoneValidationResponse {
  valid?: boolean;
  number?: string;
  country?: { name?: string; iso2?: string; dialCode?: string };
  [key: string]: unknown;
}
