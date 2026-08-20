<script setup lang="ts">
/**
 * PxTableSkeleton
 *
 * Renderiza un estado de carga (skeleton) premium para tablas.
 * Utiliza anchos aleatorios predefinidos para simular texto real en cada celda.
 */
import { computed } from "vue";

interface Props {
  /** Número de columnas a renderizar en el skeleton */
  columns: number;
  /** Número de filas a renderizar en el skeleton */
  rows?: number;
  /** Si la tabla tiene una columna de selección/checkbox a la izquierda */
  hasSelection?: boolean;
  /** Si la tabla tiene una columna de expansión/chevron a la izquierda */
  hasExpansion?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 5,
  hasSelection: false,
  hasExpansion: false,
});

// Generamos clases de ancho (width) seudo-aleatorias consistentes para simular texto real.
// En lugar de Math.random() directo que causa re-renders caóticos, generamos 
// un array fijo basado en el índice para que sea determinista en el cliente.
const getRandomWidthClass = (rowIndex: number, colIndex: number) => {
  const widths = ["w-1/2", "w-2/3", "w-3/4", "w-4/5", "w-full"];
  // Fórmula determinista simple basada en índices
  const index = (rowIndex * 3 + colIndex * 7) % widths.length;
  return widths[index];
};

const totalColumns = computed(() => {
  let count = props.columns;
  if (props.hasSelection) count++;
  if (props.hasExpansion) count++;
  return count;
});
</script>

<template>
  <tr 
    v-for="r in rows" 
    :key="`skeleton-row-${r}`" 
    class="border-b border-surface-200 dark:border-surface-700/50 hover:bg-surface-50/50 dark:hover:bg-surface-800/50 transition-colors"
  >
    <!-- Columna de Selección Simulada -->
    <td v-if="hasSelection" class="p-4 w-4">
      <div class="w-4 h-4 rounded bg-surface-200 dark:bg-surface-700 animate-pulse"></div>
    </td>
    
    <!-- Columna de Expansión Simulada -->
    <td v-if="hasExpansion" class="p-4 w-4">
      <div class="w-4 h-4 rounded bg-surface-200 dark:bg-surface-700 animate-pulse"></div>
    </td>

    <!-- Celdas de Datos Simuladas -->
    <td 
      v-for="c in columns" 
      :key="`skeleton-col-${r}-${c}`" 
      class="px-6 py-4"
    >
      <div class="flex items-center space-x-2">
        <div 
          class="h-3 rounded-full bg-surface-200 dark:bg-surface-700 animate-pulse"
          :class="getRandomWidthClass(r, c)"
        ></div>
      </div>
    </td>
  </tr>
</template>
