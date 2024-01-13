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

  </div>
</template>
 

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from '../store';

const store = useStore();
let courses = computed(() => store.courses);
let splits = ref([]) as any;
let chartdata = [] as any;

const selectedCourse = ref(null);
const selectedSplits = ref([]);

watch(selectedCourse, async (newCourse) => {
  if (newCourse) {
    store.setSelectedCourse(newCourse);
    console.log("Selected Course got updated");
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
    let splitNumbers = splits.value.map((split: { Splitnr: any; }) => Number(split.Splitnr));
    store.setAllSplitIDs(splitNumbers);
    console.log("Splitnumbers got updated");

    response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/result/json?course=${selectedCourse.value}&splitnr=${store.allSplitIDs.join(',')}&rank=199100&order=asc&detail=start,first,last,club,category,age,gender,status,nat`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //console.log(response);
    jsonResponse = await response.json();
    chartdata = jsonResponse[`Course_${selectedCourse.value}`];
    store.setAllResultData(chartdata);
    console.log("Chartdata got updated");
  }
});

watch(selectedSplits, (newSplits) => {
  console.log(newSplits);
  //store.setSelectedSplitIDs(newSplits);
});

onMounted(() => {
  //courses = computed(() => store.courses);
  console.log(courses);
});

</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: flex-start;
  gap: 20px; 
  margin-bottom: 20px;
  margin-top: 20px;
}

.start-button {
  border-radius: 100px;
  background: #76C657;

/* M3/Elevation Light/2 */
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
}
</style>