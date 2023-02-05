/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'


const app = createApp(App)

registerPlugins(app)

import Chatprev from "@/components/Chatprev"
import Chatmain from "@/components/Chatmain"
app.component("chat-prev", Chatprev)
app.component("chat-main", Chatmain)

app.mount('#app')
