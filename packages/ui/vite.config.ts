import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PraxisVue',
      fileName: 'praxis-vue',
    },
    rollupOptions: {
      // Externalize ALL peer deps — don't bundle them
      external: [
        'vue',
        'primevue',
        '@primevue/core',
        '@primeuix/themes',
        'vee-validate',
        '@vee-validate/rules',
        '@vee-validate/i18n',
        'pinia',
        '@vueuse/core',
        '@lucide/vue',
        'dayjs',
        'lodash',
        'libphonenumber-js',
        'pdfjs-dist',
        '@popperjs/core',
        'vue-draggable-plus',
      ],
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue',
        },
        // Keep CSS separate for tree-shaking
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name ?? 'asset'
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
