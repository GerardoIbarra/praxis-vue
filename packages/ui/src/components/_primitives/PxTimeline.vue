<script setup lang="ts" generic="T extends Record<string, unknown>">
interface Props {
  value: T[];
}

defineProps<Props>();

defineSlots<{
  marker(props: { item: T; index: number }): unknown;
  content(props: { item: T; index: number }): unknown;
  opposite(props: { item: T; index: number }): unknown;
}>();
</script>

<template>
  <div class="px-timeline">
    <div
      v-for="(item, index) in value"
      :key="index"
      class="px-timeline-event"
    >
      <!-- Connector line above (not on first item) -->
      <div class="px-timeline-column">
        <div v-if="index > 0" class="px-timeline-connector" />

        <!-- Marker -->
        <div class="px-timeline-marker">
          <slot name="marker" :item="item" :index="index">
            <div class="px-timeline-marker-default" />
          </slot>
        </div>

        <!-- Connector line below (not on last item) -->
        <div
          v-if="index < value.length - 1"
          class="px-timeline-connector px-timeline-connector--below"
        />
      </div>

      <!-- Content -->
      <div class="px-timeline-content">
        <slot name="content" :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.px-timeline {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.px-timeline-event {
  display: flex;
  gap: 1rem;
  min-height: 2rem;
}

.px-timeline-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 1.5rem;
}

.px-timeline-connector {
  width: 2px;
  min-height: 1rem;
  flex: 1;
  background-color: var(--color-border, #9ca3af);
}

.px-timeline-connector--below {
  flex: 1 1 auto;
}

.px-timeline-marker {
  flex-shrink: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.px-timeline-marker-default {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-primary, #3b82f6);
  border: 2px solid white;
}

.px-timeline-content {
  flex: 1;
  padding-bottom: 0.5rem;
  padding-left: 0.25rem;
}
</style>
