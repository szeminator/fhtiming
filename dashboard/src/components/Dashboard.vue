<template>
  <div>
    <h1>This is the Dashboard</h1>
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

const store = useStore();
const courses = store.courses;

onMounted(() => {
  console.log(courses);
});

</script>

<style scoped>
/* Add your styles here */
</style>