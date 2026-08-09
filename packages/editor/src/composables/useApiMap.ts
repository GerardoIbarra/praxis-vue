import {
  backResponseCrud,
  billingResponse,
  medicalChartsResponse,
  patientsResponse,
} from "@/api/medicalApi";
import type { ApiMap } from "@/types/api/medical-charts/document";
import type { AxiosInstance } from "axios";

/**
 * Composable for mapping logical API keys to their corresponding Axios instances.
 * Centralizes duplicate mappings across stores, composables, and components.
 */
export function useApiMap() {
  const apiMap: ApiMap = {
    medical_charts: medicalChartsResponse,
    users: backResponseCrud,
    patients: patientsResponse,
    billing: billingResponse,
  };

  /**
   * Safe getter for an API service instance by its key.
   * @param service The key of the apiMap
   * @returns AxiosInstance
   */
  const getApiService = (service: keyof ApiMap): AxiosInstance => {
    const instance = apiMap[service];
    if (!instance) {
      throw new Error(`[useApiMap] API service "${service}" is not defined.`);
    }
    return instance;
  };

  return {
    apiMap,
    getApiService,
  };
}
