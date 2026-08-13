import { useToast as usePrimeToast } from "primevue/usetoast";

export function usePxToast() {
  const toast = usePrimeToast();

  const showSuccess = (summary: string, detail?: string, life: number = 3000) => {
    toast.add({ severity: 'success', summary, detail, life });
  };

  const showError = (summary: string, detail?: string, life: number = 4000) => {
    toast.add({ severity: 'error', summary, detail, life });
  };

  const showInfo = (summary: string, detail?: string, life: number = 3000) => {
    toast.add({ severity: 'info', summary, detail, life });
  };

  const showWarning = (summary: string, detail?: string, life: number = 4000) => {
    toast.add({ severity: 'warn', summary, detail, life });
  };

  return {
    toast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
