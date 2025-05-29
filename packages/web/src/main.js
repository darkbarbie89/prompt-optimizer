import { createApp } from 'vue'
import { installI18n } from '@prompt-optimizer/ui'
import App from './App.vue'
import router from './router' // 👈 NEW: import router

import '@prompt-optimizer/ui/dist/style.css'
import "./assets/tailwind.css";

const app = createApp(App)

installI18n(app)
app.use(router) // 👈 NEW: use router
app.mount('#app')

// Only load analytics on Vercel
if (import.meta.env.VITE_VERCEL_DEPLOYMENT === 'true') {
  const loadAnalytics = () => {
    const script = document.createElement('script')
    script.src = '/_vercel/insights/script.js'
    script.defer = true
    script.onload = () => console.log('Vercel Analytics loaded')
    script.onerror = () => console.log('Vercel Analytics failed to load')
    document.head.appendChild(script)
  }
  window.addEventListener('DOMContentLoaded', loadAnalytics)
} else {
  console.log('Vercel Analytics not loaded')
}
