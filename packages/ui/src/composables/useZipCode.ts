import { backResponseCrud } from "@/api/medicalApi";
import type { CodePostal } from "@/types/api/catalog-endpoints/list";
import type { OnlyValue } from "@/types/api/common";

type ZipResult = {
  city: string;
  state: string;
  zip: string;
  clearZip: boolean;
};

// Global caches to deduplicate across the entire app
const zipCache = new Map<string, ZipResult>();
const inFlightRequests = new Map<string, Promise<ZipResult>>();

export function useZipCode() {
  // Local debounce timer per composable instance
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let previousResolve: ((value: ZipResult) => void) | null = null;

  // Track the last failed zip to prevent VeeValidate "ghost" reactivity events
  let lastFailedZip = "";
  let lastFailedTime = 0;

  /**
   * Fetches city and state for a given zip code.
   * Includes debounce, in-flight deduplication, and caching.
   *
   * @param zipValue String or object containing the zip code value
   * @returns An object with { city, state, zip, clearZip }
   */
  const fetchZipCode = (
    zipValue: string | number | OnlyValue | { value: string | number }
  ): Promise<ZipResult> => {
    return new Promise((resolve) => {
      const raw =
        typeof zipValue === "object" && zipValue !== null && "value" in zipValue
          ? String(zipValue.value)
          : String(zipValue);

      const zip = raw.replace(/[_\s]/g, "").slice(0, 5);

      if (zip.length < 5 || !zip) {
        // Incomplete zip, just clear city and state, but DO NOT clear the zip input
        return resolve({ city: "", state: "", zip, clearZip: false });
      }

      // Check cache first (handles previous successes)
      if (zipCache.has(zip)) {
        return resolve({ ...zipCache.get(zip)!, zip });
      }

      // If there's already a request pending in this instance, cancel its timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        if (previousResolve) {
          previousResolve({ city: "", state: "", zip, clearZip: false });
        }
      }

      // Prevent ghost events from VeeValidate/PrimeVue re-triggering the same failed zip within 1.5 seconds
      // Resolving with clearZip: true FORCES the Vue model to stay empty
      if (zip === lastFailedZip && Date.now() - lastFailedTime < 1500) {
        return resolve({ city: "", state: "", zip: "", clearZip: true });
      }

      previousResolve = resolve;

      // Wait 500ms for the user to finish typing before sending the request
      debounceTimer = setTimeout(async () => {
        try {
          // Check if another component already started fetching this exact zip
          if (inFlightRequests.has(zip)) {
            const result = await inFlightRequests.get(zip)!;
            return resolve({ ...result, zip });
          }

          // Create a new request promise
          const requestPromise = (async (): Promise<ZipResult> => {
            try {
              const response = await backResponseCrud.get<CodePostal>(
                `/zipcode/${zip}/`
              );
              const result = {
                city: response.data.city || "",
                state: response.data.state || "",
                zip,
                clearZip: false,
              };
              zipCache.set(zip, result);
              return result;
            } catch {
              lastFailedZip = zip;
              lastFailedTime = Date.now();
              const result = { city: "", state: "", zip: "", clearZip: true };
              return result;
            } finally {
              inFlightRequests.delete(zip);
            }
          })();

          inFlightRequests.set(zip, requestPromise);
          const result = await requestPromise;
          resolve(result);
        } catch {
          resolve({ city: "", state: "", zip: "", clearZip: true });
        } finally {
          previousResolve = null;
        }
      }, 500);
    });
  };

  return {
    fetchZipCode,
  };
}
