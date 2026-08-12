import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PraxisEditor',
      fileName: 'praxis-editor',
    },
    rollupOptions: {
      external: ['vue', 'wordgard', 'wordgard/editor', 'wordgard/schema', 'wordgard/history', 'wordgard/doc', 'wordgard/state', 'wordgard/command', 'lucide-vue-next'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo: any) => {
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
