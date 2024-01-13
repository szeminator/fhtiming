<template>
  
  <div>
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
import { onMounted, computed } from 'vue';
import { useStore } from '../store';


const store = useStore();
const courses = store.courses;
let chartdata = computed(() => store.allResults);

let selectedCourse = computed(() => store.selectedCourse);
let selectedSplits = computed(() => store.selectedSplitIDs);

onMounted(() => {
  console.log(courses);
});

async function loadChartdata() {
  console.log(selectedCourse);
  console.log(selectedSplits);
  console.log((chartdata.value[0] as any)?.first + " " + (chartdata.value[0] as any)?.last);
}


</script>

<style scoped>

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