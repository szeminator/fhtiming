<script setup lang="ts">

import { ref, watch} from 'vue';
import Options from './InfoBoxOptions.vue';
import { fastestWoman, countRunnersThatFinished, countRunnersInTurn1Section, countRunnersInTurn2Section, countRunnersInStartSection, countRunnersThatDidntStartYet, countAllRunners, nextSpeakerRunner, countRunnersThatDNF, fastestMan } from '../insights.ts';
import { useStore } from '../store';

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
      x: adjustedXPosition + 130,
      y: rect.top + 120 // Adjust if needed for vertical alignment
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
        result = fastestMan();
        if (result === null) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 2:
        result = nextSpeakerRunner();
        if (result === null) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 3:
        result = countRunnersInStartSection();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 4:
        result = countRunnersInTurn1Section();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 5:
        result = countRunnersInTurn2Section();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 6:
        result = countRunnersThatFinished();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 7:
        result = countRunnersThatDNF();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 8:
        result = countRunnersThatDidntStartYet();
        if (result == 0) {
          result = options[id].content;
        }
        infoboxTitle.value = options[id].contentTitle;
        infoboxContent.value = result.toString();
        break;
      case 9:
        result = countAllRunners();
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

watch(() => store.nettoTimeIdentifier, () => {
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