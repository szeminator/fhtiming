import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.use(createPinia()); // Install Pinia
app.mount('#app');

if (window.__TAURI__) {
    window.__TAURI__.event.listen('navigate', (event) => {
      router.push(event.payload);
      console.log('Navigated to', event.payload);
    });    
  }

