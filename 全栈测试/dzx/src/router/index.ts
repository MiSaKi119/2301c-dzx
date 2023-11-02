import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/yi',
        name: 'yi',

        component: () => import('../components/yi.vue')
      },
      {
        path: '/er',
        name: 'er',

        component: () => import('../components/er.vue')
      },
      {
        path: '/san',
        name: 'san',

        component: () => import('../components/san.vue')
      },
      {
        path: '/si',
        name: 'si',

        component: () => import('../components/si.vue')
      },
      {
        path: '/dl',
        name: 'dl',

        component: () => import('../components/dl.vue')
      },
      {
        path: '/yzm',
        name: 'yzm',

        component: () => import('../components/yzm.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
