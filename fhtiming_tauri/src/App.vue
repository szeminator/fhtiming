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