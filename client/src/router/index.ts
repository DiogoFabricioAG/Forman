import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingView',
      component: () => import("@/views/LandingView.vue"),
    },
    {
      path: "/auth",
      name: "AuthView",
      component: () => import("@/views/AuthView.vue")
    },
    {
      path: "/dashboard",
      name: "DashboardView",
      component: () => import("@/views/DashboardView.vue")
    },
    {
      path: '/about',
      name: 'AboutView',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
