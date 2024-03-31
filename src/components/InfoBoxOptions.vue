<template>
  <!-- @vue-ignore -->
  <div class="modal"
      :style="modalStyle" 
      @click.self="closeModal">
<div class="modal-content" ref="modalContent">
<h2>Select an Option</h2>
<ul>
<li v-for="option in boxOptions" :key="option.id">
<!-- @vue-ignore -->
<button @click="selectOption(option)" class="modal-button">{{ option.modalTitle }}</button>
</li>
</ul>
<button @click="closeModal" class="closeButton">Close</button>
</div>

  </div>
</template>
  
  <script setup lang="ts">
  import { defineEmits, computed, ref, onMounted, onUnmounted} from 'vue';
  import { useStore } from '../store';

  const store = useStore();
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

  const handleClickOutside = (event: { target: any; }) => {
  // @ts-ignore

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

  const boxOptions = store.boxOptions;
  
  
  // Method to emit selected option
  const selectOption = (boxOption: { id: any}) => {
    emit('select', { boxOptionID: boxOption.id});
};

  
  // Method to close the modal
  const closeModal = () => {
    emit('close');
  };
  </script>
