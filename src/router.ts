import { createRouter, createWebHistory } from 'vue-router';
import StartDialog from './components/StartDialog.vue';
import Table from './components/Table.vue';
import Chart from './components/Chart.vue';
import Impressum from './views/Impressum.vue';

const routes = [
  { 
    path: '/',
    component: StartDialog 
  },
  { 
    path: '/table', 
    name: 'table',
    component: Table 
  },
  { 
    path: '/impressum', 
    component: Impressum 
  },
  { 
    path: '/chart', 
    name: 'chart',
    component: Chart 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;