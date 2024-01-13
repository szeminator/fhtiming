<script setup lang="ts">
import Filterlogic from '../components/Filterlogic.vue';

const props = defineProps({
  isVisible: Boolean
});


</script>
<template>

<aside id="default-sidebar" class="sidebar">
    <div class="sidebar-content">   
        <div class="h-full px-3 overflow-y-auto bg-gray-50 dark:bg-gray-800 pt-20">
    <Filterlogic />
   </div>
</div>
</aside>

</template>


<style scoped>
.sidebar {
  position: fixed; /* Fixed position */
  top: 0; /* Start from the top of the page */
  left: 0; /* Align to the left */
  width: 256px; /* Or any other width you prefer */
  height: 100vh; /* Full height of the viewport */
  z-index: 1000; /* Ensure it's above other elements */
  background-color: #f8f8f8; /* Background color */
  overflow-y: auto; /* Add scroll for overflow content */
}

.sidebar-content {
  padding-top: 150px; /* Start the content below the header */
  /* Rest of your content styling */
}

/* Rest of your CSS */
</style>