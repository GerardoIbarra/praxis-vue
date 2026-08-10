<script setup lang="ts">
interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

defineProps<{
  rows: PropRow[]
}>()
</script>

<template>
  <table class="praxis-api-table">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <td>
          <span class="prop-name">{{ row.name }}</span>
          <span v-if="row.required" class="prop-required">required</span>
        </td>
        <td><code class="prop-type">{{ row.type }}</code></td>
        <td><span class="prop-default">{{ row.default ?? '—' }}</span></td>
        <td>{{ row.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
