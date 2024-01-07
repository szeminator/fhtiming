import { createRouter, createWebHistory } from 'vue-router';
import StartDialog from './components/StartDialog.vue';
import Dashboard from './components/Dashboard.vue';

const routes = [
  { 
    path: '/',
    component: StartDialog 
  },
  { 
    path: '/dashboard', 
    component: Dashboard 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;