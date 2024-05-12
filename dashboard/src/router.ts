import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/chart', component: () => import('./components/Chart.vue') },
    { path: '/impressum', component: () => import('./views/Impressum.vue') },
    { path: '/table', component: () => import('./components/Table.vue') },
    { path: '/', component: () => import('./components/StartDialog.vue') },
  ]
});

export default router;