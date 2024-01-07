<template>
  <div class="info-container">
    <InfoBoxValue title="Info" />
    <InfoBoxPercentage title="Info2" />
  </div>
  <div>
    <select>
    <option v-for="course in courses" :key="course.Coursenr" :value="course.Coursenr">
      {{ course.Coursename }} - {{ course.Coursenr }}
    </option>
  </select>
  </div>
</template>
 

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '../store';
import InfoBoxValue from './InfoBoxValue.vue';
import InfoBoxPercentage from './InfoBoxPercentage.vue';

const store = useStore();
const courses = store.courses;

onMounted(() => {
  console.log(courses);
});


</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: flex-start;
  gap: 20px; /* Adjust the gap as needed */
}
</style>