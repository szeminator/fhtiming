<script setup lang="ts">
import FHTimingHeader from './views/FHTimingHeader.vue';
import InfoBox from './components/InfoBox.vue';
import Sidebar from './views/Sidebar.vue';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const isSidebarVisible = ref(true);
const infoBoxes = ref([{ id: uuidv4(), title: "Info1" }]);

const toggleIcon = computed(() => isSidebarVisible.value ? '/hide.svg' : '/show.svg');
const hasInfoBoxes = computed(() => infoBoxes.value.length > 0);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const addInfoBox = () => {
  infoBoxes.value.push({ id: uuidv4(), title: `Info${infoBoxes.value.length + 1}` });
};

const removeInfoBox = (id: any) => {
  const index = infoBoxes.value.findIndex(box => box.id === id);
  if (index > -1) {
    infoBoxes.value.splice(index, 1);
  }
};

const handleModeToggle = (isDarkMode: boolean | undefined) => {
  document.documentElement.classList.toggle('dark', isDarkMode);
};

</script>

<template>
  <div class="header-sidebar-container">
    <FHTimingHeader name="FHTimingHeader" @toggleMode="handleModeToggle" />
    <button @click="toggleSidebar" class="toggle-button">
      <img :src="toggleIcon" alt="Toggle Sidebar" />
    </button>

    <Sidebar v-show="isSidebarVisible" />
  </div>
  <div :class="isSidebarVisible ? 'content-with-sidebar' : 'content-full-width'">
    <button @click="addInfoBox" 
            :class="isSidebarVisible ? 'add-button-sidebar-visible' : 'add-button-sidebar-hidden'"
            class="add-button">
      <img src="/add.svg" alt="Add" />
    </button>
    <div class="info-container">
      <InfoBox
        v-for="box in infoBoxes"
        :key="box.id"
        :title="box.title"
        @delete="() => removeInfoBox(box.id)"
      />
    </div>
    <div :class="hasInfoBoxes ? 'router-view-with-infobox' : 'router-view-no-infobox'">
   <router-view />
    </div>
  </div>
</template>

<style scoped>
.header-sidebar-container {
  position: relative; /* Container for header and sidebar */
}

.content-with-sidebar {
  margin-left: 276px; /* Adjust to match the sidebar's width */
  width: calc(100% - 256px); /* Adjust the width */
  padding-top: 0px;
  z-index: 1500;
}

.content-full-width {
  margin-left: 20px;
  width: 100%;
  padding-top: 0px;
  padding-left: 15px;
}
.info-container {
  display: flex;
  justify-content: start;
  gap: 20px; 
  margin-bottom: 40px;
  margin-top: 135px;
}

.sidebar {
  transition: transform 0.3s;
  transform: translateX(0); /* Default state */
  background-color: var(--sidebar-bg); /* Use the background color variable */
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-hidden {
  transform: translateX(-100%); /* Hidden state */
}
.dark-theme .sidebar {
  background-color: var(--sidebar-bg);
}
.toggle-button:focus {
  outline: none; /* Removes the outline on focus as well */
}
.toggle-button {
  position: fixed;
  top: 90px; /* Adjust as needed */
  left: 15px; /* Adjust as needed */
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

.add-button {
  position: fixed; /* Use fixed positioning */
  top: 90px; /* Align vertically with the toggle button */
  background-color: #76C657;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-button-sidebar-visible {
  left: calc(276px + 30px); /* Adjust this to align with the sidebar */
}

.add-button-sidebar-hidden {
  left: 30px; /* Align with the content when sidebar is hidden */
}

.router-view-with-infobox {
  /* Styling when there are InfoBoxes */
  margin-top: 20px; /* Example value, adjust as needed */
}

.router-view-no-infobox {
  /* Styling when there are no InfoBoxes */
  margin-top: 0px; /* Example value, adjust as needed */
}

</style>
