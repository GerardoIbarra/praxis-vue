<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShowcaseSection from './components/ShowcaseSection.vue'

// Import components from libraries
import {
  BaseAvatar,
  InitialsAvatar,
  ThemeToggle,
  PraxisTimePicker,
  PraxisBadge,
  PraxisAccordion,
  TabComponent,
  FullPageLoader,
  PhoneNumber,
  ColorPickerField
} from '@praxis/vue'

import { WordgardEditor } from '@praxis/editor'

// State variables for examples
const time = ref('14:30')
const editorContent = ref('<p>Hello from <strong>@praxis/editor</strong>!</p>')
const isDark = ref(false)
const isLoading = ref(false)
const activeTab = ref('overview')
const tabs = [
  { key: 'overview', label: 'Overview', icon: 'Info', tooltip: 'Component overview' },
  { key: 'api', label: 'API', icon: 'FileText', tooltip: 'API Documentation' },
  { key: 'changelog', label: 'Changelog', icon: 'History', tooltip: 'Release notes' }
]

const tabContent: Record<string, string> = {
  overview: 'Explore our components.',
  api: 'Integration details.',
  changelog: 'Latest updates.'
}

const phone = ref('')
const color = ref('#3b82f6')

// Simulate loading
const triggerLoader = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

onMounted(() => {
  // Sync dark mode class on initial load if needed
})
</script>

<template>
  <div :class="{ dark: isDark }" class="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-50 transition-colors duration-300 flex">
    
    <!-- Sidebar Navigation -->
    <aside class="w-64 fixed inset-y-0 left-0 border-r border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 hidden md:flex flex-col p-6">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-500">
          @praxis
        </h1>
        <ThemeToggle v-model="isDark" />
      </div>
      
      <nav class="flex flex-col gap-2 flex-grow overflow-y-auto">
        <div class="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2 mt-4">Base</div>
        <a href="#theme-toggle" class="hover:text-primary-500 transition-colors">Theme Toggle</a>
        <a href="#avatars" class="hover:text-primary-500 transition-colors">Avatars</a>
        <a href="#badges" class="hover:text-primary-500 transition-colors">Badges</a>
        <a href="#loader" class="hover:text-primary-500 transition-colors">Loaders</a>
        
        <div class="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2 mt-6">Forms</div>
        <a href="#time-picker" class="hover:text-primary-500 transition-colors">Time Picker</a>
        <a href="#phone" class="hover:text-primary-500 transition-colors">Phone Number</a>
        <a href="#color-picker" class="hover:text-primary-500 transition-colors">Color Picker</a>
        
        <div class="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2 mt-6">Data Display</div>
        <a href="#accordion" class="hover:text-primary-500 transition-colors">Accordion</a>
        <a href="#tabs" class="hover:text-primary-500 transition-colors">Tabs</a>
        
        <div class="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2 mt-6">Editor</div>
        <a href="#rich-text" class="hover:text-primary-500 transition-colors">Wordgard Editor</a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 md:ml-64 p-8 lg:p-16 max-w-6xl">
      <header class="mb-16">
        <h2 class="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Component Showcase
        </h2>
        <p class="text-xl text-surface-500 dark:text-surface-400 max-w-2xl">
          A premium collection of reusable Vue 3 components powered by Wordgard and TailwindCSS.
        </p>
      </header>

      <FullPageLoader v-if="isLoading" />

      <!-- Showcases -->
      <ShowcaseSection 
        id="theme-toggle"
        title="Theme Toggle" 
        description="A beautiful animated toggle button for switching between light and dark modes."
      >
        <div class="flex items-center justify-center p-8">
          <ThemeToggle v-model="isDark" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="avatars"
        title="Avatars" 
        description="Display user profiles with dynamically colored initials based on the user's name."
      >
        <div class="flex gap-8 items-center justify-center flex-wrap">
          <BaseAvatar name="Luis Kern" size="w-10 h-10" />
          <BaseAvatar name="Gerardo Ibarra" size="w-10 h-10" />
          <InitialsAvatar name="Jane Doe" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="badges"
        title="Status Badges" 
        description="Visual indicators for states, categories, or tags."
      >
        <div class="flex gap-4 items-center justify-center flex-wrap">
          <PraxisBadge severity="success">Active</PraxisBadge>
          <PraxisBadge severity="warning">Pending</PraxisBadge>
          <PraxisBadge severity="danger">Failed</PraxisBadge>
          <PraxisBadge severity="info">Info</PraxisBadge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="time-picker"
        title="Praxis Time Picker" 
        description="A clean, robust input for selecting times, decoupled from business logic."
      >
        <div class="w-full max-w-xs mx-auto">
          <PraxisTimePicker v-model="time" label="Schedule Time" required />
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400 text-center">
            Selected Time: <strong class="text-primary-500">{{ time }}</strong>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="phone"
        title="Phone Number Input" 
        description="International phone number formatting and validation out of the box."
      >
        <div class="w-full max-w-xs mx-auto">
          <PhoneNumber v-model="phone" label="Contact Number" />
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400 text-center">
            Value: <strong class="text-primary-500">{{ phone || 'Empty' }}</strong>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="color-picker"
        title="Color Picker" 
        description="Interactive color selection field."
      >
        <div class="w-full max-w-xs mx-auto">
          <ColorPickerField v-model="color" label="Brand Color" />
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400 text-center">
            Selected: <strong :style="{ color: color }">{{ color }}</strong>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="accordion"
        title="Accordion" 
        description="Collapsible sections to organize complex information."
      >
        <div class="w-full">
          <PraxisAccordion :items="[{value: '1', header: 'Section 1', content: 'Content for section 1'}, {value: '2', header: 'Section 2', content: 'Content for section 2'}]" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="tabs"
        title="Tab Component" 
        description="Navigate between multiple views or data sets within the same context."
      >
        <div class="w-full">
          <TabComponent :tabs="tabs" v-model="activeTab" />
          <div class="p-6 bg-surface-100 dark:bg-surface-800 rounded-b-xl mt-[-1px]">
            {{ tabContent[activeTab] }}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="rich-text"
        title="Wordgard Editor" 
        description="Our premium rich-text editing experience, ready for any complex content creation task."
      >
        <div class="w-full shadow-lg rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
          <WordgardEditor
            v-model="editorContent"
            placeholder="Write something amazing..."
          />
        </div>
        <div class="mt-4">
          <pre class="text-xs bg-surface-100 dark:bg-surface-800 p-4 rounded-lg overflow-x-auto text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700">{{ editorContent }}</pre>
        </div>
      </ShowcaseSection>

      <ShowcaseSection 
        id="loader"
        title="Full Page Loader" 
        description="Block the screen during critical asynchronous operations."
      >
        <div class="flex justify-center">
          <button 
            @click="triggerLoader"
            class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            Trigger Loader (2s)
          </button>
        </div>
      </ShowcaseSection>

    </main>
  </div>
</template>
