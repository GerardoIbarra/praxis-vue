/**
 * Generic API Map composable for UI library.
 * The actual instances should be provided by the host application via window.__PRAXIS_API_MAP__
 * or another injection mechanism.
 */
export function useApiMap() {
  const getApiService = (service: string) => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.__PRAXIS_API_MAP__) {
      // @ts-ignore
      return window.__PRAXIS_API_MAP__[service];
    }
    
    // Fallback dummy instance to prevent crashes if not provided
    return {
      get: () => Promise.resolve({ data: [] }),
      post: () => Promise.resolve({ data: [] }),
    };
  };

  return {
    getApiService,
  };
}
