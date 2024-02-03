<script setup lang="ts">

import { ref, watch} from 'vue';
import Options from './InfoBoxOptions.vue'; // import your Questions.vue component
import { fastestWoman, countRunnersThatFinished, countRunnersInTurn1Section, countRunnersInTurn2Section, countRunnersInStartSection } from '../insights.ts';
import { useStore } from '../store';

// Reactive state
const store = useStore();

const showModal = ref(false);
const infoboxTitle = ref('Default Title');
const infoboxContent = ref('Default Content');
const configButton = ref(null);
const modalPosition = ref({ x: 0, y: 0 });

const emit = defineEmits(['delete']);
let boxID = 0;

const openModal = () => {
  // @ts-ignore
  if (configButton.value && configButton.value.offsetParent) {
    // @ts-ignore
    const rect = configButton.value.getBoundingClientRect();
    // @ts-ignore
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

const options = store.boxOptions;

const handleSelection = (selectedOption: { boxOptionID: number }) => {
  boxID = selectedOption.boxOptionID;
  showModal.value = false;
  infoboxTitle.value = options[selectedOption.boxOptionID].contentTitle;
  infoboxContent.value = options[selectedOption.boxOptionID].content;
  fillInfoboxAccordingToID(selectedOption.boxOptionID);
};


function fillInfoboxAccordingToID (id: number) {
  let result = null;
  switch (id) {
      case 0:
        result = fastestWoman();
        if (result === null) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        result = countRunnersInTurn1Section();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 4:
        result = countRunnersInTurn2Section();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 5:
        result = countRunnersThatFinished();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 6:
        result = countRunnersInStartSection();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 7:
      result = countRunnersInStartSection();
      if (result == 0) {
        result = options[id].content;
      }
      infoboxTitle.value = options[id].contentTitle;
      infoboxContent.value = result.toString();
      break;
      default:
        break;
    }
}

watch(() => store.allResults, () => {
  fillInfoboxAccordingToID(boxID);
});

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
    box-shadow: 5px 5px 5px 0px var(--infobox-shadow);
  }
  
  .title {
    align-self: flex-start;
    margin: 0px;
    text-align: left;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
  }
  
  .content {
    margin-top: auto; /* Added to push content to the bottom */
    margin-bottom: 0px;
    align-self: flex-end;
    color: #76C657;
    font-size: 22px;
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

.delete-button img, .config-icon img {
  display: block;
  margin: auto; /* This centers the image within the flex container */
  width: 24px; /* Adjust if necessary */
  height: 24px; /* Adjust if necessary */
}
</style>