<script setup lang="ts">
import FHTimingHeader from './views/FHTimingHeader.vue'
import Sidebar from './views/Sidebar.vue';
import { ref } from 'vue';


const isSidebarVisible = ref(true);

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}
</script>

<template>
  <button @click="toggleSidebar" class="toggle-button">Settings</button>
  <FHTimingHeader name="FHTimingHeader" />
  <Sidebar v-show="isSidebarVisible" />
  <div :class="isSidebarVisible ? 'content-with-sidebar' : 'content-full-width'">
    <router-view />
  </div>
</template>

<style scoped>
.content-with-sidebar {
  margin-left: 256px; /* Adjust to match the sidebar's width */
  width: calc(100% - 256px); /* Adjust the width */
}

.content-full-width {
  margin-left: 0;
  width: 100%;
}

.toggle-button {
  position: fixed;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  z-index: 1500; /* Make sure it's above other elements */
  /* Add more styling as per your UI design */
}
</style>
