import { ref } from 'vue';

export interface PxToastMessage {
  id: string;
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail?: string;
  life: number;
}

// Global state
const toasts = ref<PxToastMessage[]>([]);

export function usePxToast() {
  const add = (message: Omit<PxToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts.value.push({ ...message, id });
    if (message.life > 0) {
      setTimeout(() => {
        remove(id);
      }, message.life);
    }
  };

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  const showSuccess = (summary: string, detail?: string, life: number = 3000) => {
    add({ severity: 'success', summary, detail, life });
  };

  const showError = (summary: string, detail?: string, life: number = 4000) => {
    add({ severity: 'error', summary, detail, life });
  };

  const showInfo = (summary: string, detail?: string, life: number = 3000) => {
    add({ severity: 'info', summary, detail, life });
  };

  const showWarning = (summary: string, detail?: string, life: number = 4000) => {
    add({ severity: 'warn', summary, detail, life });
  };

  return {
    toasts,
    remove,
    add,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
