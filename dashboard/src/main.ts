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
    });
  }

  function setupThemeListeners() {
    window.__TAURI__.event.listen('change-theme', (event) => {
      const themeStore = useThemeStore(); // Assuming you have a store or a direct method
      themeStore.setTheme(event.payload); // Set 'dark' or 'light'
    });
  }
  
  setupThemeListeners();