<script setup lang="ts">

import { ref } from 'vue';
import Options from './InfoBoxOptions.vue'; // import your Questions.vue component

// Reactive state
const showModal = ref(false);
const infoboxTitle = ref('Default Title');
const infoboxContent = ref('Default Content');
const configButton = ref(null);
const modalPosition = ref({ x: 0, y: 0 });

const emit = defineEmits(['delete']);

const openModal = () => {
  if (configButton.value && configButton.value.offsetParent) {
    const rect = configButton.value.getBoundingClientRect();
    const offsetParentRect = configButton.value.offsetParent.getBoundingClientRect();
    const buttonRightEdgeX = rect.right;
    const offsetParentLeft = offsetParentRect.left;

    // Calculate the adjusted X position
    const adjustedXPosition = buttonRightEdgeX - offsetParentLeft; // Adjusting with margin-left

    modalPosition.value = {
      x: adjustedXPosition - 20,
      y: rect.top - 35 // Adjust if needed for vertical alignment
    };
    showModal.value = true;
  }
};


const handleSelection = (selectedOption) => {
  showModal.value = false;
  infoboxTitle.value = selectedOption.contentTitle; // Make sure this matches the emitted object's property
  infoboxContent.value = selectedOption.content;
};


function emitDeleteEvent() {
  emit('delete');
}
</script>

<template>
<div class="infobox">
  <div class="control-buttons">
    <button @click="emitDeleteEvent" class="delete-button">
      <img src="/delete.svg" alt="Delete" />
    </button>
    <button @click="openModal" class="config-icon" ref="configButton">
      <img src="/config.svg" alt="Config" />
    </button>
  </div>
    <h3 class="text-lg font-semibold title">{{ infoboxTitle }}</h3>
    <p class="content">{{ infoboxContent }}</p>
  <Options v-if="showModal" :position="modalPosition" @close="showModal = false" @select="handleSelection" />
  </div>
 </template>
  
  <style scoped>
  .infobox {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 188px;
    min-height: 108px; /* Minimum height */
    padding: 9px; /* Increased padding for the box */
    align-items: flex-start;
    gap: 10px;
    border-radius: 5px;
    border: 2px solid var(--Bright-Cape-colors-BC-Blue, #417DA8);
    box-shadow: 5px 5px 5px 0px rgba(8, 3, 3, 0.3);
  }
  
  .title {
    align-self: flex-start;
    margin: 0px;
    text-align: left;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }
  
  .content {
    margin-top: auto; /* Added to push content to the bottom */
    margin-bottom: 0px;
    align-self: flex-end;
    color: #76C657;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.14px;
    text-align: right;
  }
  
  .title, .content {
    padding: 2px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .control-buttons {
  position: absolute;
  top: -15px;
  right: -15px;
  display: flex;
  gap: 8px;
}


.delete-button, .config-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #76C657;
  border-radius: 50%;
  padding: 4px; 
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
  display: flex;
  justify-content: center;
  align-items: center;
}


/* .config-icon {
  background-color: #76C657;
  border-radius: 50%;
  padding: 4px; 
  width: 24px; 
  height: 24px; 
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
  display: flex;
  justify-content: center;
  align-items: center;
} */

.delete-button img, .config-icon img {
  display: block;
  margin: auto; /* This centers the image within the flex container */
  width: 24px; /* Adjust if necessary */
  height: 24px; /* Adjust if necessary */
}


  </style>