import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProjectenPage from '@/pages/ProjectenPage.vue'
import WerkervaringPage from '@/pages/WerkervaringPage.vue'
import ChartsPage from '@/pages/ChartsPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/projecten', name: 'Projecten', component: ProjectenPage },
  { path: '/werkervaring', name: 'Werkervaring', component: WerkervaringPage },
  { path: '/charts', name: 'Charts', component: ChartsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
