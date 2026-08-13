<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShowcaseSection from './components/ShowcaseSection.vue'

// Import components from libraries
import {
  PxAvatar,
  PxInitialsAvatar,
  PxThemeToggle,
  PxTimePicker,
  PxBadge,
  PxAccordion,
  PxLoader,
  PxRequiredLabel,
  PxGridSelect,
  PxStateChecklist,
  PxNavList,
  PxTabComponent,
  PxPhoneNumber,
  PxColorPickerField,
  PxPdfViewer,
  PxDataTable,
  PxStepNavigation,
  type NavListItem
} from 'praxis-vue-ui'
import { Home, Settings, Star } from '@lucide/vue'

import { PxEditor } from 'praxis-vue-editor'

// State variables for examples
const time = ref('14:30')
const editorContent = ref('<p>Hello from <strong>px-vue-editor</strong>!</p>')
const isDark = ref(false)
const isLoading = ref(false)

// Tabs
const activeTab = ref('overview')
const tabs = [
  { key: 'overview', label: 'Overview', icon: 'Info', tooltip: 'Component overview' },
  { key: 'api', label: 'API', icon: 'FileText', tooltip: 'API Documentation' },
  { key: 'changelog', label: 'Changelog', icon: 'History', tooltip: 'Release notes' }
]
const tabContent: Record<string, string> = {
  overview: 'Explore our components seamlessly.',
  api: 'Integration details and props.',
  changelog: 'Latest updates and bug fixes.'
}

// Phone & Color
const phone = ref('')
const color = ref('#6366f1')

// Step Navigation
const currentStep = ref(1)
const steps = [
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Configuration' },
  { id: 3, label: 'Review' }
]

// Data Table
const tableColumns = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'role', header: 'Role', sortable: true },
  { field: 'status', header: 'Status' }
]
const tableData = [
  { id: 1, name: 'Alice Smith', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Jones', role: 'User', status: 'Pending' },
  { id: 3, name: 'Charlie Brown', role: 'User', status: 'Active' },
  { id: 4, name: 'Diana Prince', role: 'Manager', status: 'Inactive' }
]

// Selectable List
const listOptions = [
  { id: 1, name: 'Premium Plan', description: 'Full access to all features' },
  { id: 2, name: 'Basic Plan', description: 'Core features only' },
  { id: 3, name: 'Enterprise', description: 'Custom solutions for teams' }
]
const selectedListItems = ref([])

// PxNavList
const navListCollapsed = ref(false)
const navListActivePath = ref('/dashboard')
const navListMenu: NavListItem[] = [
  { key: 'workspace', label: 'Workspace', separator: true },
  { key: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: Home },
  {
    key: 'favorites',
    label: 'Favorites',
    icon: Star,
    items: [
      { key: 'starred-a', label: 'Project A', to: '/projects/a' },
      { key: 'starred-b', label: 'Project B', to: '/projects/b' }
    ]
  },
  { key: 'settings', label: 'Settings', to: '/settings', icon: Settings }
]

// Simulate full page loading
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
  <div :class="{ dark: isDark }" class="min-h-screen transition-colors duration-500 font-sans text-surface-900 dark:text-surface-50 relative selection:bg-primary-500/30">
    
    <!-- Immersive Background -->
    <div class="fixed inset-0 bg-gradient-to-br from-surface-50 via-white to-surface-100 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 -z-20 transition-colors duration-500"></div>
    
    <!-- Decorative Ambient Blobs -->
    <div class="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-400/10 dark:bg-primary-500/10 blur-[120px] pointer-events-none -z-10 transition-all duration-1000"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-[120px] pointer-events-none -z-10 transition-all duration-1000"></div>

    <div class="flex flex-col md:flex-row">
      <!-- Sidebar Navigation (Glassmorphic) -->
      <aside class="w-64 fixed inset-y-0 left-0 border-r border-surface-200/50 dark:border-surface-700/50 bg-white/60 dark:bg-surface-900/60 backdrop-blur-xl hidden md:flex flex-col p-6 z-40 transition-colors duration-500 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-indigo-500 tracking-tight">
            @praxis
          </h1>
          <PxThemeToggle v-model="isDark" />
        </div>
        
        <nav class="flex flex-col gap-1.5 flex-grow overflow-y-auto custom-scrollbar pr-2">
          
          <div class="text-[10px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest mb-1 mt-4">Base & Forms</div>
          <a href="#px-theme-toggle" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Theme Toggle</a>
          <a href="#avatars" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Avatars</a>
          <a href="#badges" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Badges & Labels</a>
          <a href="#loaders" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Loaders</a>
          <a href="#time-picker" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Time Picker</a>
          <a href="#phone" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Phone Number</a>
          <a href="#color-picker" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Color Picker</a>
          
          <div class="text-[10px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest mb-1 mt-6">Data & Advanced</div>
          <a href="#data-table" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Data Table</a>
          <a href="#px-grid-select" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Table Select</a>
          <a href="#px-pdf-viewer" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">PDF Viewer</a>
          
          <div class="text-[10px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest mb-1 mt-6">Navigation</div>
          <a href="#steps" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Step Navigation</a>
          <a href="#accordion" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Accordion</a>
          <a href="#tabs" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Tabs</a>
          <a href="#px-nav-list" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Nav List</a>
          
          <div class="text-[10px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest mb-1 mt-6">Editor</div>
          <a href="#rich-text" class="px-3 py-1.5 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-800/50 text-sm font-medium transition-colors">Praxis Editor</a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 md:ml-64 p-8 lg:p-16 max-w-7xl mx-auto relative z-10">
        
        <!-- Hero Section -->
        <header class="mb-24 mt-8 animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6 ring-1 ring-primary-500/20">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Wordgard UI V2
          </div>
          <h2 class="text-5xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            Design that <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-500">Inspires.</span>
          </h2>
          <p class="text-xl lg:text-2xl text-surface-500 dark:text-surface-400 max-w-3xl leading-relaxed font-light">
            A premium, meticulously crafted collection of Vue 3 components designed for modern web applications.
          </p>
        </header>

        <PxLoader v-if="isLoading" fullscreen message="Saving data..." subMessage="Please wait..." />

        <!-- Component Showcases -->
        <div class="flex flex-col gap-12">

          <ShowcaseSection 
            id="px-theme-toggle"
            title="Theme Toggle" 
            description="A beautiful animated toggle button for switching between light and dark modes."
          >
            <div class="flex items-center justify-center p-8">
              <PxThemeToggle v-model="isDark" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="avatars"
            title="Avatars" 
            description="Display user profiles with dynamically colored initials based on the user's name."
          >
            <div class="flex gap-8 items-center justify-center flex-wrap p-4">
              <PxAvatar name="Luis Kern" size="w-12 h-12" />
              <PxAvatar name="Gerardo Ibarra" size="w-16 h-16" />
              <PxInitialsAvatar name="Jane Doe" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="badges"
            title="Status Badges & Labels" 
            description="Visual indicators for states, categories, tags or required fields."
          >
            <div class="flex flex-col gap-8 items-center justify-center p-4">
              <div class="flex gap-4 flex-wrap justify-center">
                <PxBadge severity="success">Active</PxBadge>
                <PxBadge severity="warning">Pending</PxBadge>
                <PxBadge severity="danger">Failed</PxBadge>
                <PxBadge severity="info">Info</PxBadge>
              </div>
              <div class="flex gap-8 border-t border-surface-200/50 dark:border-surface-700/50 pt-8 w-full justify-center">
                <PxRequiredLabel label="Email Address" required />
                <PxRequiredLabel label="Optional Field" :required="false" />
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="loaders"
            title="Loaders & Spinners" 
            description="Block the screen during critical async operations or show inline loading states."
          >
            <div class="flex flex-col gap-12 items-center justify-center p-4 w-full">
              <button 
                @click="triggerLoader"
                class="px-8 py-3 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5"
              >
                Trigger Full Page Loader (2s)
              </button>

              <div class="w-full max-w-md border border-surface-200 dark:border-surface-700 rounded-xl p-8 bg-surface-50 dark:bg-surface-800/50">
                <PxLoader message="Fetching data..." />
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="time-picker"
            title="Time Picker"
            description="A beautiful popover-based input for selecting times with scrollable columns."
          >
            <div class="w-full max-w-xs mx-auto">
              <PxTimePicker v-model="time" label="Schedule Time" required />
              <p class="mt-6 text-sm text-surface-500 dark:text-surface-400 text-center font-mono">
                Selected: <strong class="text-primary-500">{{ time }}</strong>
              </p>
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="phone"
            title="Phone Number Input" 
            description="International phone number formatting and validation out of the box."
          >
            <div class="w-full max-w-xs mx-auto">
              <PxPhoneNumber v-model="phone" label="Contact Number" />
              <p class="mt-6 text-sm text-surface-500 dark:text-surface-400 text-center font-mono">
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
              <PxColorPickerField v-model="color" label="Brand Color" />
              <p class="mt-6 text-sm text-surface-500 dark:text-surface-400 text-center font-mono">
                Selected: <strong :style="{ color: color }">{{ color }}</strong>
              </p>
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="data-table"
            title="Data Table" 
            description="Robust table component for displaying and sorting datasets."
          >
            <div class="w-full">
              <PxDataTable 
                :columns="tableColumns" 
                :data="tableData" 
                :paginated="false"
              >
                <template #status="{ item }">
                  <PxBadge 
                    :severity="item.status === 'Active' ? 'success' : item.status === 'Pending' ? 'warning' : 'danger'"
                  >
                    {{ item.status }}
                  </PxBadge>
                </template>
              </PxDataTable>
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="px-grid-select"
            title="Table Select" 
            description="Advanced list selection with a data table."
          >
            <div class="w-full max-w-lg mx-auto">
              <div class="mb-4">
                <PxRequiredLabel label="Choose a Plan" required />
              </div>
              <PxGridSelect 
                v-model:selectedItems="selectedListItems" 
                :options="listOptions" 
                title="Available Plans"
                labelField="name"
              />
            </div>
          </ShowcaseSection>
          
          <ShowcaseSection 
            id="px-pdf-viewer"
            title="PDF Viewer" 
            description="Embed and render PDF documents directly in the UI."
          >
            <div class="w-full h-[400px] border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
              <PxPdfViewer url="/dummy.pdf" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="steps"
            title="Step Navigation" 
            description="Guide users through multi-step forms and processes."
          >
            <div class="w-full max-w-3xl mx-auto p-4">
              <PxStepNavigation :steps="steps" :currentStep="currentStep" />
              
              <div class="mt-12 flex justify-center gap-4">
                <button 
                  @click="currentStep > 1 ? currentStep-- : null"
                  :disabled="currentStep === 1"
                  class="px-4 py-2 rounded-lg bg-surface-200 dark:bg-surface-800 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <button 
                  @click="currentStep < steps.length ? currentStep++ : null"
                  :disabled="currentStep === steps.length"
                  class="px-4 py-2 rounded-lg bg-primary-600 text-white disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="accordion"
            title="Accordion" 
            description="Collapsible sections to organize complex information."
          >
            <div class="w-full">
              <PxAccordion :items="[{value: '1', header: 'Section 1', content: 'Content for section 1'}, {value: '2', header: 'Section 2', content: 'Content for section 2'}]" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="tabs"
            title="Tab Component" 
            description="Navigate between multiple views or data sets within the same context."
          >
            <div class="w-full">
              <PxTabComponent :tabs="tabs" v-model="activeTab" />
              <div class="p-8 bg-surface-50 dark:bg-surface-800/50 rounded-b-xl border border-t-0 border-surface-200/50 dark:border-surface-700/50 text-surface-600 dark:text-surface-300">
                {{ tabContent[activeTab] }}
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="px-nav-list"
            title="Nav List"
            description="Collapsible sidebar navigation with grouped links, section separators, and active-route highlighting."
          >
            <div class="flex gap-4">
              <div class="w-60 border border-surface-200/50 dark:border-surface-700/50 rounded-xl p-2 bg-surface-50 dark:bg-surface-800/50">
                <PxNavList
                  :model="navListMenu"
                  :collapsed="navListCollapsed"
                  :active-path="navListActivePath"
                  @select="(item: any) => (navListActivePath = item.to || navListActivePath)"
                >
                  <template #footer>
                    <button
                      class="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                      @click="navListCollapsed = !navListCollapsed"
                    >
                      {{ navListCollapsed ? 'Expand' : 'Collapse' }}
                    </button>
                  </template>
                </PxNavList>
              </div>
              <p class="text-sm text-surface-500 dark:text-surface-400 self-start pt-2">
                Active path: <strong class="font-mono">{{ navListActivePath }}</strong>
              </p>
            </div>
          </ShowcaseSection>

          <ShowcaseSection 
            id="rich-text"
            title="Praxis Editor" 
            description="Our premium rich-text editing experience, ready for any complex content creation task."
          >
            <div class="w-full">
              <PxEditor
                v-model="editorContent"
                placeholder="Write something amazing..."
              />
              <div class="mt-6">
                <div class="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-2">HTML Output</div>
                <pre class="text-xs bg-surface-100/50 dark:bg-surface-800/50 p-4 rounded-xl overflow-x-auto text-surface-700 dark:text-surface-300 border border-surface-200/50 dark:border-surface-700/50 font-mono">{{ editorContent }}</pre>
              </div>
            </div>
          </ShowcaseSection>
          
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom scrollbar for sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.6);
}
</style>
