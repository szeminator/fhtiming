<template>
  <div class="modal"
      :style="modalStyle" 
      @click.self="closeModal">
<div class="modal-content" ref="modalContent">
<h2>Select an Option</h2>
<ul>
<li v-for="option in options" :key="option.id">
<button @click="selectOption(option)" class="button">{{ option.modalTitle }}</button>
</li>
</ul>
<button @click="closeModal" class="closeButton">Close</button>
</div>

  </div>
</template>
  
  <script setup lang="ts">
  import { defineEmits, computed, ref, onMounted, onUnmounted} from 'vue';
  import { countRunnersThatFinished, countRunnersInTurn1Section, countRunnersInTurn2Section, countRunnersInStartSection } from '../insights.ts';

  const props = defineProps({
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  }
});

const modalStyle = computed(() => ({
  position: 'absolute',
  top: `${props.position.y}px`,
  left: `${props.position.x}px`,
  // Adjust 'left' as necessary to align the modal to the right of the button
}));

  // Define the emits
  const emit = defineEmits(['select', 'close']);
  const modalContent = ref(null);

  const handleClickOutside = (event) => {
  if (modalContent.value && !modalContent.value.contains(event.target)) {
    closeModal();
  }
};


onMounted(() => {
  document.addEventListener('click', handleClickOutside, true); // Notice the 'true' for capturing phase
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true); // Match the event listener exactly
});


  // Example options data
  const options = [
  { id: 1, modalTitle: 'Who is currently the fastest woman?', contentTitle: 'Currently leading woman', content: '' },
  { id: 2, modalTitle: 'Who is currently the fastest man?', contentTitle: 'Currently leading man', content: '' },
  { id: 3, modalTitle: 'Who will reach the finish line next?', contentTitle: 'Next person at the finish', content: '' },
  { id: 4, modalTitle: 'How many people are still in section 1?', contentTitle: '# of Persons in 1st section', content: '' },
  { id: 5, modalTitle: 'How many people are still in section 2?', contentTitle: '# of Persons in 2nd section', content: '' },
  { id: 6, modalTitle: 'How many have already crossed the finish line?', contentTitle: 'Runners at the finish:', content: 'None yet' },
  { id: 7, modalTitle: 'How many are still at the start?', contentTitle: 'Runners at the start:', content: 'None' },
  { id: 8, modalTitle: 'How many are supposed to start?', contentTitle: 'Runners altogether:', content: 'None' },

  // Add more options as needed
];
  
  // Method to emit selected option
  const selectOption = (option) => {
    let result = 0;
    
    switch (option.id) {
      case 1:
        result = countRunnersThatFinished();
        if (result == 0) {
          result = option.content;
        }
        emit('select', { contentTitle: option.contentTitle, content: result});
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        result = countRunnersInTurn1Section();
        if (result == 0) {
          result = option.content;
        }
        emit('select', { contentTitle: option.contentTitle, content: result});
        break;
      case 5:
        result = countRunnersInTurn2Section();
        if (result == 0) {
          result = option.content;
        }
        emit('select', { contentTitle: option.contentTitle, content: result});
        break;
      case 6:
        result = countRunnersThatFinished();
        if (result == 0) {
          result = option.content;
        }
        emit('select', { contentTitle: option.contentTitle, content: result});
        break;
      case 7:
        result = countRunnersInStartSection();
        if (result == 0) {
          result = option.content;
        }
        emit('select', { contentTitle: option.contentTitle, content: result});
        break;
      default:
        break;
    }
};

  
  // Method to close the modal
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  
  .modal-content {
    background-color: var(--bg-color); 
    border-radius: 5px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    color: #76C657;

  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .button {
  color: var(--text-color);
  background-color: var(--bg-color);
  border: 1px solid #76C657;
  width: 100%;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
}

.button:hover {
  background-color: #9BE77D; /* Lighter green color */
  color: var(--text-color);
}

.button:active {
  background-color: #659C44; /* Darker green for pressed state */
  transform: scale(0.98); /* Slightly scale down when pressed */
}
.closeButton {
  color: var(--text-color);
  background-color: var(--bg-color);
  border: 1px solid #c9302e;
  width: 100%;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  /* Add more styling as needed */
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
}
.closeButton:hover {
  background-color: #d15f5f; 
  color: var(--text-color);
}

.closeButton:active {
  background-color: #c22424ef; 
  transform: scale(0.98); /* Slightly scale down when pressed */
}
  </style>
