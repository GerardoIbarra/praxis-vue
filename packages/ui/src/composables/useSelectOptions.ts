import { ref } from "vue";
import type { FormSchemaField } from "@/types/api/common";
import { useApiMap } from "@/composables/useApiMap";

/**
 * Composable for select field options management
 * Handles search, pagination, loading states, and grouped options
 */

/**
 * Debounce helper function
 */
const debounce = <Args extends unknown[], R>(
  func: (...args: Args) => R,
  delay = 500
): ((...args: Args) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Hook for managing select field options
 * @returns {Object} Select options utilities and state
 */
export function useSelectOptions() {
  const loadingSelect = ref(false);
  const selectedItems = ref<Record<string, unknown[]>>({});
  const { getApiService } = useApiMap();

  /**
   * Handle select search with debouncing
   * Fetches options from API based on search term
   */
  const setSelected = debounce(
    async (field: FormSchemaField, searchTerm: string | null) => {
      if (!field.option_source) return;

      const { service, endpoint, type, search_param } =
        field.option_source || {};

      if (!endpoint || !service) {
        if (type !== "internal") {
          field.options = [];
        }
        return;
      }

      // If no search parameter configured, don't make API call
      if (!search_param) return;

      // Detect if we're clearing an active search
      const wasSearching = !!field.searchTerm;

      // Store search term for pagination to use
      field.searchTerm = searchTerm || undefined;

      // If no search term (reset), decide whether to reload
      if (!searchTerm) {
        if (wasSearching) {
          // Coming from a search, force reload of default list
          // (continue below to fetch)
        } else if (field.options && field.options.length > 0) {
          // Already have options and never searched, don't reload
          return;
        }
      }

      loadingSelect.value = true;

      // Reset pagination state immediately when search starts
      // so we don't accidentally fetch a nonexistent page with a new search term
      if (field.pagination) {
        field.pagination.page = 1;
        field.pagination.hasMore = false;
      }

      try {
        // Determine correct URL query separator to avoid '?page=1?X' or '??search'
        const separator = endpoint.includes("?") ? "&" : "?";

        let url = `${endpoint}${separator}page=1`;

        if (searchTerm) {
          // Safely strip any leading '?' or '&' from search_param if present in the schema
          const safeSearchParam = search_param.replace(/^[?&]/, "");
          url = `${endpoint}${separator}${safeSearchParam}=${searchTerm}`;
        }

        const api = getApiService(service);
        if (!api) return;
        const optResponse = await api.get(url);
        const data = optResponse.data.results || optResponse.data || [];

        // Update pagination state
        if (field.pagination) {
          field.pagination.hasMore = !!optResponse.data.next;
          // The page is correctly at 1 here
        }

        // Always replace options when searching or resetting
        field.options = data;
      } catch (err) {
        throw new Error("Error in select search: ", { cause: err });
      } finally {
        loadingSelect.value = false;
      }
    },
    500
  );

  /**
   * Flatten grouped options with visual indentation for VueSelect
   */
  const flattenWithIndentation = (options: unknown[]) => {
    if (!options || !Array.isArray(options)) return [];

    const flattened: unknown[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options.forEach((opt: any) => {
      // If it has nested 'options', it's a group
      if (opt.options && Array.isArray(opt.options)) {
        // Add group header (not selectable)
        flattened.push({
          label: `📁 ${opt.label}`,
          value: null,
          disabled: true, // Not selectable
        });

        // Add group options with indentation
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        opt.options.forEach((child: any) => {
          flattened.push({
            label: `   ${child.label}`, // Visual indentation
            value: child.value,
            ...child,
          });
        });
      } else {
        // Regular flat option
        flattened.push(opt);
      }
    });

    return flattened;
  };

  return {
    loadingSelect,
    selectedItems,
    setSelected,
    flattenWithIndentation,
  };
}
