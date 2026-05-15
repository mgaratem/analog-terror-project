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
    { path: '/1', redirect: '/entre-sin-pensar' },
    { path: '/2', redirect: '/no-mires-atras' },
    { path: '/3', redirect: '/nunca-estuve-solo' },
    { path: '/:pathMatch(.*)*', redirect: '/entre-sin-pensar' }
  ]
})

export default router
