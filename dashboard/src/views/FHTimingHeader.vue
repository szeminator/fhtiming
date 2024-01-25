<template>
  <nav class="navbar">
    <div class="navbar-grid">
      <router-link to="/" class="logo-link">
        <img src="/logo.png" alt="FH-Timing Icon" class="navbar-icon" />
      </router-link>
      <div class="nav-links">
        <router-link to="/graph" class="nav-link">Graph</router-link> | 
        <router-link to="/table" class="nav-link">Tabelle</router-link> | 
        <router-link to="/impressum" class="nav-link">Impressum</router-link> |
        <ModeSwitch @toggle-mode="handleModeToggle" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import ModeSwitch from '../components/ModeSwitch.vue';

const emit = defineEmits(['toggle-mode']);

const handleModeToggle = (isDarkMode) => {
  emit('toggle-mode', isDarkMode);
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #d3d3d3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 1010;
  background-image: linear-gradient(to right, #ffffff, #76C657);
}


.navbar-grid {
  display: grid;
  grid-template-columns: 256px 1fr;
  align-items: center;
  height: 100%;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: start; 
  padding-left: 15px;
}
.nav-links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 35px;
  color: #000;
}

.navbar-icon {
  height: 75%;
  width: 75%;
} 

.nav-link {
  color: #000;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  padding: 0 10px;
  text-decoration: none;
}

.nav-link:hover {
  color: #76C657; /* Change the color on hover */
}

.router-link-active {
  font-weight: bold;
  color: #76C657;
}
</style>