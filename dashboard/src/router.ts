import { createRouter, createWebHistory } from 'vue-router';
import StartDialog from './components/StartDialog.vue';
import Dashboard from './components/Dashboard.vue';
import Graph from './components/Graph.vue';
import Impressum from './views/Impressum.vue';

const routes = [
  { 
    path: '/',
    component: StartDialog 
  },
  { 
    path: '/dashboard', 
    name: 'dashboard',
    component: Dashboard 
  },
  { 
    path: '/impressum', 
    component: Impressum 
  },
  { 
    path: '/graph', 
    name: 'graph',
    component: Graph 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;