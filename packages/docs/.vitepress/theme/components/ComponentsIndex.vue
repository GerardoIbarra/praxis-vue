<script setup lang="ts">
defineProps<{
  categories: { title: string; items: { name: string; link: string }[] }[]
}>()
</script>

<template>
  <div class="praxis-index">
    <section v-for="cat in categories" :key="cat.title" class="praxis-index-category">
      <h2 class="praxis-index-title">{{ cat.title }}</h2>
      <div class="praxis-index-cards">
        <a v-for="item in cat.items" :key="item.link" :href="item.link" class="praxis-index-card">
          {{ item.name }}
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.praxis-index {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 1.5rem;
}

.praxis-index-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.9rem;
  padding: 0;
  border: none;
}

.praxis-index-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 0.75rem;
}

.praxis-index-card {
  display: flex;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
}

.praxis-index-card:hover {
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.18);
  background-image: linear-gradient(var(--vp-c-bg-soft), var(--vp-c-bg-soft)),
    linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>
