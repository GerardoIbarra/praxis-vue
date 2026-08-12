import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './style.css'
import 'praxis-vue-ui/dist/praxis-vue.css'
import 'praxis-vue-editor/dist/praxis-editor.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.mount('#app')
