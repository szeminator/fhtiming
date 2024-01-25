import { createRouter, createWebHistory } from 'vue-router';
import StartDialog from './components/StartDialog.vue';
import Table from './components/Table.vue';
import Graph from './components/Graph.vue';
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