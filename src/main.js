import './assets/main.scss'
import 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia(App)

app.use(router)
app.use(pinia)

app.mount('#app')
