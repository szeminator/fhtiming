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
  <div class="header-sidebar-container">
    <FHTimingHeader name="FHTimingHeader" />
    <button @click="toggleSidebar" class="toggle-button">
    <img src="/settings.svg" alt="Settings" />
  </button>
  <Sidebar v-show="isSidebarVisible" />
  </div>
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
.header-sidebar-container {
  position: relative; /* Container for header and sidebar */
}

.content-with-sidebar {
  margin-left: 256px; /* Adjust to match the sidebar's width */
  width: calc(100% - 256px); /* Adjust the width */
  padding-top: 0px;
  z-index: 1500;
}

.content-full-width {
  margin-left: 0;
  width: 100%;
  padding-top: 0px;
  padding-left: 10px;
}
.toggle-button:focus {
  outline: none; /* Removes the outline on focus as well */
}
.toggle-button {
  position: fixed;
  top: 70px; /* Adjust as needed */
  left: 10px; /* Adjust as needed */
  background: none; /* Remove background if you want only the SVG to be visible */
  cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
  z-index: 1500;
  padding: 0px;
  border-radius: 50%;
  outline: none; /* Remove focus ring for accessibility */
}

.toggle-button:active {
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15); /* Reduced shadow for pressed effect */
  transform: translateY(2px); /* Slightly move the button down to mimic pressing */
}

.info-container {
  display: flex;
  justify-content: center;
  gap: 20px; 
  margin-bottom: 20px;
  margin-top: 100px;
}

.sidebar {
  transition: transform 0.3s;
  transform: translateX(0); /* Default state */
}

.sidebar-hidden {
  transform: translateX(-100%); /* Hidden state */
}

.toggle-button img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  padding: 8px;
  background: #76C657;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
  outline: none; /* Removes the outline on focus as well */
}
</style>
