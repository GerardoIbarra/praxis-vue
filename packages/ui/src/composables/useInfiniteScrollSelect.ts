import { ref } from "vue";
import type { Ref } from "vue";

/**
 * Parámetros que el composable pasa al `fetcher` en cada llamada.
 */
export interface InfiniteScrollFetchParams {
  /** Texto de búsqueda actual (vacío string si no hay búsqueda). */
  search: string;
  /** Página a cargar (inicia en 1). */
  page: number;
  /** `true` cuando la lista debe reiniciarse (nueva búsqueda o primer load). */
  reset: boolean;
}

/**
 * Resultado que el `fetcher` debe retornar.
 */
export interface InfiniteScrollFetchResult<T> {
  /** Ítems de la página cargada. */
  data: T[];
  /** `true` si aún hay más páginas disponibles. */
  hasMore: boolean;
}

/**
 * `useInfiniteScrollSelect`
 *
 * Composable que encapsula el estado de paginación + búsqueda para cualquier
 * `InfiniteScrollSelect`. Cada instancia del composable maneja de forma
 * independiente sus propios refs, por lo que se puede usar varias veces en
 * el mismo componente (ej. un select para pacientes y otro para staff).
 *
 * @param fetcher - Función asíncrona que recibe `{ search, page, reset }` y
 *   retorna `{ data, hasMore }`. Generalmente llama a la API o al store.
 * @param debounceMs - Milisegundos de debounce para la búsqueda (default 300).
 *
 * @example
 * ```ts
 * const {
 *   options: patientOptions,
 *   hasMore: patientHasMore,
 *   loading: patientLoading,
 *   handleSearch: searchPatients,
 *   loadMore: loadMorePatients,
 *   fetch: fetchPatients,
 * } = useInfiniteScrollSelect(({ search, page }) =>
 *   patientApi.list({ search, page })
 * );
 *
 * onMounted(() => fetchPatients(true));
 * ```
 */
export function useInfiniteScrollSelect<T = Record<string, unknown>>(
  fetcher: (
    params: InfiniteScrollFetchParams
  ) => Promise<InfiniteScrollFetchResult<T>>,
  debounceMs = 300
) {
  const options: Ref<T[]> = ref([]);
  const hasMore: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);
  const searchTerm: Ref<string> = ref("");

  let currentPage = 1;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Llama al fetcher y actualiza los refs de estado.
   * @param reset - Si `true`, reemplaza la lista; si `false`, hace append.
   */
  const fetch = async (reset = false): Promise<void> => {
    if (loading.value) return;
    loading.value = true;

    try {
      const result = await fetcher({
        search: searchTerm.value,
        page: currentPage,
        reset,
      });

      if (reset) {
        options.value = result.data as typeof options.value;
      } else {
        options.value = [
          ...options.value,
          ...result.data,
        ] as typeof options.value;
      }

      hasMore.value = result.hasMore;
    } catch (error) {
      throw new Error("[useInfiniteScrollSelect] fetcher error: ", {
        cause: error,
      });
    } finally {
      loading.value = false;
    }
  };

  /**
   * Manejador para el evento `@search` de `InfiniteScrollSelect`.
   * Aplica debounce y reinicia la paginación.
   */
  /**
   * Manejador para el evento `@search` de `InfiniteScrollSelect`.
   * Aplica debounce y reinicia la paginación.
   */
  const handleSearch = (query: string): void => {
    searchTerm.value = query;
    options.value = [];
    hasMore.value = false;
    currentPage = 1;

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      await fetch(true);
    }, debounceMs);
  };

  /**
   * Manejador para el evento `@scrolling` de `InfiniteScrollSelect`.
   * Carga la siguiente página y hace append al listado.
   */
  const loadMore = async (): Promise<void> => {
    if (!hasMore.value || loading.value) return;
    currentPage += 1;
    await fetch(false);
  };

  /**
   * Resetea todo el estado al valor inicial.
   * Útil al cerrar un modal o desmontar el componente.
   */
  const reset = (): void => {
    if (debounceTimer) clearTimeout(debounceTimer);
    options.value = [];
    hasMore.value = false;
    loading.value = false;
    searchTerm.value = "";
    currentPage = 1;
  };

  return {
    /** Lista de opciones actuales (bindear a `:options`). */
    options,
    /** Si hay más páginas disponibles (bindear a `:has-more`). */
    hasMore,
    /** Estado de carga (bindear a `:loading`). */
    loading,
    /** Texto de búsqueda activo (read-only, útil para depurar). */
    searchTerm,
    /** Bindear a `@search`. Aplica debounce y reinicia la paginación. */
    handleSearch,
    /** Bindear a `@scrolling`. Carga la siguiente página. */
    loadMore,
    /** Carga inicial o recarga completa. Llamar en `onMounted`. */
    fetch,
    /** Limpia todo el estado (llamar en `onUnmounted` o al cerrar modal). */
    reset,
  };
}
