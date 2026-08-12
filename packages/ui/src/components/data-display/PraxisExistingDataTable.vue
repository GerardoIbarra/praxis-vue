<script setup lang="ts">
import { computed } from "vue";
import { Heading, Minus, Slash, SquarePlus } from "@lucide/vue";

type TableValue =
  | boolean
  | string
  | { plus?: boolean; minus?: boolean; history?: boolean }
  | null
  | undefined;

interface TableData {
  headers: string[];
  rows: (string | TableValue)[][];
}

const props = defineProps<{
  tableData: TableData;
}>();

// Process rows to identify section headers vs data rows
interface ProcessedRow {
  type: "header" | "data";
  label: string;
  values?: TableValue[];
}

const processedRows = computed<ProcessedRow[]>(() => {
  if (!props.tableData?.rows) return [];

  return props.tableData.rows.map((row) => {
    // If row has only one element or second element is undefined, it's a section header
    if (row.length === 1 || row[1] === undefined) {
      return {
        type: "header",
        label: row[0] as string,
      };
    }
    // Otherwise it's a data row
    return {
      type: "data",
      label: row[0] as string,
      values: row.slice(1) as TableValue[],
    };
  });
});

const isPlus = (v: TableValue) =>
  v === true ||
  (typeof v === "object" && v !== null && "plus" in v && v.plus === true);
const isMinus = (v: TableValue) =>
  v === true ||
  (typeof v === "object" && v !== null && "minus" in v && v.minus === true);
const isHistory = (v: TableValue) =>
  v === "history" ||
  (typeof v === "object" && v !== null && "history" in v && v.history === true);
</script>

<template>
  <div class="h-full flex flex-col">
    <h4 class="text-sm font-semibold mb-3 text-gray-900">Historical Data</h4>
    <div
      class="flex-1 overflow-auto border border-gray-200 rounded-md bg-white"
    >
      <table class="w-full min-w-100 border-collapse text-sm table-auto">
        <thead>
          <tr>
            <th
              v-for="(header, index) in tableData.headers"
              :key="index"
              class="sticky top-0 bg-gray-50 px-2 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200 z-20 whitespace-nowrap min-w-25 first:sticky first:left-0 first:z-30 first:min-w-45 first:bg-gray-50"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in processedRows"
            :key="rowIndex"
            class="group"
            :class="{
              'bg-gray-100': row.type === 'header',
              'border-b border-gray-100 hover:bg-gray-50': row.type === 'data',
            }"
          >
            <!-- Section Header Row -->
            <template v-if="row.type === 'header'">
              <td
                :colspan="tableData.headers.length"
                class="sticky left-0 z-10 bg-gray-100 px-3 py-2.5 font-semibold text-gray-800 border-b border-gray-200"
              >
                {{ row.label }}
              </td>
            </template>

            <!-- Data Row -->
            <template v-else>
              <td
                class="px-3 py-2 text-gray-600 capitalize sticky left-0 bg-white min-w-45 z-5 group-hover:bg-gray-50"
              >
                {{ row.label }}
              </td>
              <td
                v-for="(value, valueIndex) in row.values"
                :key="valueIndex"
                class="p-2 text-center text-gray-500 min-w-25 whitespace-nowrap"
              >
                <div class="flex items-center justify-center gap-2">
                  <SquarePlus
                    v-if="isPlus(value)"
                    class="w-4 h-4 text-red-600"
                  />

                  <Minus v-if="isMinus(value)" class="w-4 h-4 text-green-600" />
                  <Heading
                    v-if="isHistory(value)"
                    class="w-4 h-4 text-blue-600"
                  />

                  <Slash
                    v-if="
                      !isPlus(value) && !isMinus(value) && !isHistory(value)
                    "
                    class="w-2 h-2 text-gray-800"
                  />
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
