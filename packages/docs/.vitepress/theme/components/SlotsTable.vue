<script setup lang="ts">
interface SlotRow {
  name: string
  props?: string
  description: string
}

defineProps<{
  rows: SlotRow[]
}>()
</script>

<template>
  <table class="praxis-api-table">
    <thead>
      <tr>
        <th>Slot</th>
        <th>Props</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <td><span class="prop-name">{{ row.name }}</span></td>
        <td><code v-if="row.props" class="prop-type">{{ row.props }}</code><span v-else class="prop-default">—</span></td>
        <td>{{ row.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
