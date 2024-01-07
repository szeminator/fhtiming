<template>
  <div class="info-container">
    <InfoBoxValue title="Info" />
    <InfoBoxPercentage title="Info2" />
    <InfoBoxPercentage title="Info3" />
    <InfoBoxPercentage title="Info5" />
  </div>
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

  <table>
      <thead>
        <tr>
          <th>Start</th>
          <th>First</th>
          <th>Last</th>
          <th>Club</th>
          <th>Category</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Nat</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in chartdata.value" :key="data.start">
          <td>{{ data.start }}</td>
          <td>{{ data.first }}</td>
          <td>{{ data.last }}</td>
          <td>{{ data.club }}</td>
          <td>{{ data.category }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.gender }}</td>
          <td>{{ data.status }}</td>
          <td>{{ data.nat }}</td>
          <td>{{ data.NETTO_ET2_Time }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
 

<script setup lang="ts">
import { ref, watch, onMounted, reactive } from 'vue';
import { useStore } from '../store';
import InfoBoxValue from './InfoBoxValue.vue';
import InfoBoxPercentage from './InfoBoxPercentage.vue';

const store = useStore();
const courses = store.courses;
let splits = ref([]) as any;
let chartdata = reactive({ value: [] });

const selectedCourse = ref(null);
const selectedSplits = ref([]);


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

  }
});

onMounted(() => {
  console.log(courses);
});

async function loadChartdata() {
  console.log(selectedSplits.value);
  //http://win2.fh-timing.com/middleware/{{event}}/result/json?course=102&detail=start,first,last,club,category,age,gender,status,nat&splitnr=100,199,199100&rank=199100&order=asc
  let response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/result/json?course=${selectedCourse.value}&splitnr=${selectedSplits.value.join(',')}&rank=199100&order=asc&detail=start,first,last,club,category,age,gender,status,nat`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  //console.log(response);
  let jsonResponse = await response.json();
  chartdata.value = jsonResponse[`Course_${selectedCourse.value}`];
  console.log("Chartdata got updated: " + chartdata.value);
  console.log(chartdata.value[0].first);
}


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