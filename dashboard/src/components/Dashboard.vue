<template>
  <div>
    <h1>This is the Dashboard</h1>
  </div>
  <div>
  <select v-model="selectedCourse">
    <option v-for="course in courses" :key="course.Coursenr" :value="course.Coursenr">
      {{ course.Coursename }} - {{ course.Coursenr }}
    </option>
  </select>
  <p>Selected Course: {{ selectedCourse }}</p>
  <select v-model="selectedSplit">
    <option v-for="split in splits" :key="split.Splitnr" :value="split.Splitnr">
      {{ split.Splitname }} - {{ split.Splitnr }}
    </option>
  </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useStore } from '../store';

const store = useStore();
const courses = store.courses;
let splits = ref([]);

const selectedCourse = ref(null);
const selectedSplit = ref(null);


watch(selectedCourse, async (newCourse) => {
  if (newCourse) {
    let response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/info/json?setting=splits&course=${newCourse}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let jsonResponse = await response.json();
    console.log(jsonResponse);  
    // Well it depends on the course that the splits are called Splits_100, Splits_102, Splits_103, etc.
    // So we need to use the course number to get the correct splits.
    splits.value = jsonResponse[`Splits_${newCourse}`];

  }
});

onMounted(() => {
  console.log(courses);
});

</script>

<style scoped>
/* Add your styles here */
</style>