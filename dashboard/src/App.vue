<script setup lang="ts">
import FHTimingHeader from './views/FHTimingHeader.vue'
import InfoBoxValue from './components/InfoBoxValue.vue';
import InfoBoxPercentage from './components/InfoBoxPercentage.vue';
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
    <div class="info-container">
    <InfoBoxValue title="Info" />
    <InfoBoxPercentage title="Info2" />
    <InfoBoxPercentage title="Info3" />
    <InfoBoxPercentage title="Info5" />
  </div>
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
  top: 20px; /* Adjust as needed */
  right: 20px; /* Adjust as needed */
  z-index: 1500; /* Make sure it's above other elements */
  border-radius: 100px;
  background: #76C657;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
  transition: box-shadow 0.2s, transform 0.2s; /* Smooth transition for the press effect */
}

.toggle-button:active {
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15); /* Reduced shadow for pressed effect */
  transform: translateY(2px); /* Slightly move the button down to mimic pressing */
}

.info-container {
  display: flex;
  justify-content: flex-start;
  gap: 20px; 
  margin-bottom: 20px;
  margin-top: 100px;
}
</style>
