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
        },
        {
          path: '/chooseIcon',
          name: 'chooseIcon',
          component: () => import('@/view/chooseIcon/index.vue'),
        },
        {
          path: '/chooseArea',
          name: 'chooseArea',
          component: () => import('@/view/chooseArea/index.vue'),
        },
        {
          path: '/notification',
          name: 'notification',
          component: () => import('@/view/notification/index.vue'),
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('@/view/menu/index.vue'),
        }
      ]
    },

  ],
})

export default router
