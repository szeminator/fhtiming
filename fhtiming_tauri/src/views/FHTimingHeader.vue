<template>
  <nav class="navbar">
    <div class="navbar-grid">
      <router-link to="/" class="logo-link">
        <img src="/logo.png" alt="FH-Timing Icon" class="navbar-icon" />
      </router-link>
      <div class="nav-links">
        <router-link to="/chart" class="nav-link">Chart</router-link> | 
        <router-link to="/table" class="nav-link">Table</router-link> | 
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

const handleModeToggle = (isDarkMode: any) => {
  emit('toggle-mode', isDarkMode);
};

</script>