import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/view/Home.vue'
import Container from '@/components/container/src/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'container',
      component: Container,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        }
      ]
    },

  ],
})

export default router
