import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: () => import('../views/DashboardHome.vue') },
    {
      path: '/clients',
      name: 'clientList',
      component: () => import('../views/ClientList.vue'),
    },
    {
      path: '/collaborateurs',
      name: 'collaborateurList',
      component: () => import('../views/CollaborateurList.vue'),
    },
    {
      path: '/transactions',
      name: 'transactionList',
      component: () => import('../views/TransactionList.vue'),
    },
  ],
})

export default router
