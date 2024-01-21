<template>
    <div class="mode-switch">
        <button @click="toggleMode">
            <img v-if="isDarkMode" src="/light.svg" alt="Light Mode"/>
            <img v-else src="/dark.svg" alt="Dark Mode"/>
        </button>
    </div>

</template>
  
<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const isDarkMode = ref(false);

const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  } else {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
  }
};


watchEffect(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
  }
});
</script>

<style scoped>
.mode-switch button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
}

.mode-switch-button:focus {
  outline: none; /* Optional: removes outline on focus */
}
</style>
