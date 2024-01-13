<template>
  <div class="info-container">
    <InfoBoxValue title="Info" />
    <InfoBoxPercentage title="Info2" />
    <InfoBoxPercentage title="Info3" />
    <InfoBoxPercentage title="Info5" />
  </div>
  <div>

    <button class="start-button" @click="loadChartdata">Lade Chartdaten</button>

  <table class="styled-table">
      <thead class="header">
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
        <tr v-for="data in chartdata" :key="data.start">
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
let chartdata = store.allResults;

let selectedCourse = store.selectedCourse;
let selectedSplits = store.selectedSplitIDs;

onMounted(() => {
  console.log(courses);
});

async function loadChartdata() {

  selectedCourse = store.selectedCourse;
  selectedSplits = store.selectedSplitIDs;
  console.log(selectedCourse);
  console.log(selectedSplits);

  chartdata = store.allResults;
  console.log(chartdata[0].first + " " + chartdata[0].last);
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
.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th.header {
  font-weight: bold;
}

.styled-table tr:nth-child(even) {
  background-color: #EBF9F1;
}
</style>