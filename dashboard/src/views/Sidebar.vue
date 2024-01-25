<script setup lang="ts">
import Filterlogic from '../components/Filterlogic.vue';

const props = defineProps({
  isVisible: Boolean
});


</script>
<template>
<aside id="default-sidebar" class="sidebar">
    <div class="sidebar-content">   
        <div class="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 pt-20">
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
  overflow-y: auto; /* Add scroll for overflow content */
  border-right: 1px solid #d3d3d3; /* Greyish border at the bottom */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Slight shadow for depth */
  background-color: var(--sidebar-bg); /* Use the background color variable */
}

.sidebar-content {
  padding-top: 150px; /* Start the content below the header */
  padding-left: 15px;
  text-size-adjust: 80%;
}

</style>