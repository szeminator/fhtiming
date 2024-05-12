<template>
    <div class="mode-switch">
        <button @click="toggleMode">
            <img v-if="isDarkMode" src="/light.svg" alt="Light Mode"/>
            <img v-else src="/dark.svg" alt="Dark Mode"/>
        </button>
    </div>

</template>
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isDarkMode = ref(false);

const setTheme = (mode) => {
  isDarkMode.value = mode === 'dark';
  document.documentElement.classList.toggle('dark-theme', isDarkMode.value);
  document.documentElement.classList.toggle('light-theme', !isDarkMode.value);
};

const toggleMode = () => {
  setTheme(isDarkMode.value ? 'light' : 'dark');
};

onMounted(() => {
  const handler = (event) => {
    setTheme(event.payload);
  };
  window.__TAURI__.event.listen('change-theme', handler);
});

onUnmounted(() => {
  window.__TAURI__.event.unlisten('change-theme');
});
</script>
