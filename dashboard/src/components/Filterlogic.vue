<template>
  <div>
  <select v-model="selectedCourse">
    <option v-for="course in courses" :key="course.Coursenr" :value="course.Coursenr">
      {{ course.Coursename }} - {{ course.Coursenr }}
    </option>
  </select>
  <p>Selected Course: {{ selectedCourse }}</p>
  <div v-for="split in splits" :key="split.Splitnr">
      <input type="checkbox" :value="split.Splitnr" v-model="selectedSplits">
      {{ split.Splitname }} - {{ split.Splitnr }}
    </div>
  <button class="start-button" @click="loadChartdata">Lade Chartdaten</button>

  </div>
</template>
 

<script setup lang="ts">
import { ref, watch, onMounted, reactive } from 'vue';
import { useStore } from '../store';

const store = useStore();
const courses = store.courses;
let splits = ref([]) as any;
let chartdata = reactive({ value: [] });

const selectedCourse = ref(null);
const selectedSplits = ref([]);

const emit = defineEmits(['loadChartdata']);


watch(selectedCourse, async (newCourse) => {
  if (newCourse) {
    let response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/info/json?setting=splits&course=${newCourse}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //console.log(response);  
    let jsonResponse = await response.json();
    //console.log(jsonResponse);  
    // Well it depends on the course that the splits are called Splits_100, Splits_102, Splits_103, etc.
    // So we need to use the course number to get the correct splits.
    splits.value = jsonResponse[`Splits_${newCourse}`];
    let splitNumbers = splits.value.map(split => Number(split.Splitnr));
    store.setAllSplitIDs(splitNumbers);
  }
});

onMounted(() => {
  console.log(courses);
});

const loadChartdata = () => {
  console.log('loadChartdata function called at child');
  emit('loadChartdata');
};

</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: flex-start;
  gap: 20px; 
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>