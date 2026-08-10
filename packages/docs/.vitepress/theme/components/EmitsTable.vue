<script setup lang="ts">
interface EmitRow {
  name: string
  payload: string
  description: string
}

defineProps<{
  rows: EmitRow[]
}>()
</script>

<template>
  <table class="praxis-api-table">
    <thead>
      <tr>
        <th>Event</th>
        <th>Payload</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <td><span class="prop-name">{{ row.name }}</span></td>
        <td><code class="prop-type">{{ row.payload }}</code></td>
        <td>{{ row.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
