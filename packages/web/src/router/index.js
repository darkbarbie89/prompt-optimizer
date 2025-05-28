import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Optimize from '../views/Optimize.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/optimize', component: Optimize }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router