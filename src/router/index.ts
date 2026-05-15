import { createRouter, createWebHistory } from 'vue-router'
import CuriosityView from '../views/CuriosityView.vue'
import SearchingView from '../views/SearchingView.vue'
import FoundView from '../views/FoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/entre-sin-pensar', component: CuriosityView },
    { path: '/no-mires-atras', component: SearchingView },
    { path: '/nunca-estuve-solo', component: FoundView },
    { path: '/:pathMatch(.*)*', redirect: '/sabes-que-te-veo' }
  ]
})

export default router
