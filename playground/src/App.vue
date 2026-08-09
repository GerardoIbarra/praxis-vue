<script setup lang="ts">
import { ref } from 'vue'
import { BaseAvatar, InitialsAvatar, ThemeToggle, FullPageLoader, TabComponent } from '@praxis/vue'
import { WordgardEditor } from '@praxis/editor'

const editorContent = ref('<p>Hello from <strong>@praxis/editor</strong>!</p>')
const isDark = ref(false)
</script>

<template>
  <div :class="{ dark: isDark }" style="min-height: 100vh; padding: 2rem; font-family: sans-serif;">
    <header style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
      <h1 style="font-size: 1.5rem; font-weight: 700;">@praxis/vue — Playground</h1>
      <ThemeToggle v-model="isDark" />
    </header>

    <section style="margin-bottom: 2rem;">
      <h2>Base Components</h2>
      <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem;">
        <BaseAvatar src="https://i.pravatar.cc/150?img=3" alt="User" />
        <InitialsAvatar name="Luis Kern" />
      </div>
    </section>

    <section style="margin-bottom: 2rem;">
      <h2>WordgardEditor</h2>
      <WordgardEditor
        v-model="editorContent"
        placeholder="Write something amazing..."
        style="margin-top: 1rem;"
      />
      <pre style="margin-top: 1rem; font-size: 0.75rem; background: #f4f4f4; padding: 0.5rem; border-radius: 6px;">{{ editorContent }}</pre>
    </section>
  </div>
</template>
