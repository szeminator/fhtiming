<template>
    <div class="modal" :style="modalStyle" @click.self="closeModal">
      <div class="modal-content" ref="modalContent">
        <h2>Select an Option</h2>
        <ul>
          <!-- Example options. Replace with your actual data -->
          <li v-for="option in options" :key="option.id">
            <button @click="selectOption(option)">{{ option.title }}</button>
          </li>
        </ul>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineEmits, computed, ref, onMounted, onUnmounted} from 'vue';
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
    { id: 1, title: 'Option 1', content: 'Content for Option 1' },
    { id: 2, title: 'Option 2', content: 'Content for Option 2' },
    // Add more options as needed
  ];
  
  // Method to emit selected option
  const selectOption = (option) => {
    emit('select', option);
  };
  
  // Method to close the modal
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal {
    /* Styles for the modal background */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  
  .modal-content {
    /* Styles for the modal content */
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  button {
    /* Add button styles */
  }
  </style>
  