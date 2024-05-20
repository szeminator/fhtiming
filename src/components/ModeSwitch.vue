<template>
  <div class="mode-switch">
    <button @click="toggleMode">
      <img v-if="isDarkMode" src="/light.svg" alt="Light Mode"/>
      <img v-else src="/dark.svg" alt="Dark Mode"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDarkMode = ref(false);

const applyTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  } else {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
  }
};

const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value;
  applyTheme();
  window.electronAPI.toggleDarkMode(isDarkMode.value);
};

onMounted(() => {
  window.electronAPI.getDarkMode().then((mode) => {
    isDarkMode.value = mode;
    applyTheme();
  });

  window.electronAPI.onToggleTheme((newMode) => {
    isDarkMode.value = newMode;
    applyTheme();
  });
});
</script>
