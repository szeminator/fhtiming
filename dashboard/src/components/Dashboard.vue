<template>
    <button class="start-button" @click="loadChartdata">Lade Chartdaten</button>

    <div>
    <table>
      <thead>
        <tr>
          <th v-for="key in chartdataKeys" :key="key">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in chartdata.value" :key="index">
          <td v-for="key in chartdataKeys" :key="key">
            {{ item[key] }}
          </td>
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
let chartdataKeys = computed(() => store.allResults);

let selectedCourse = computed(() => store.selectedCourse);
let selectedSplits = computed(() => store.selectedSplitIDs);

onMounted(() => {
  
  console.log(courses);
});

async function loadChartdata() {
  console.log(selectedCourse);
  console.log(selectedSplits);
  console.log((chartdata.value[0] as any)?.first + " " + (chartdata.value[0] as any)?.last);
  console.log("Chartdata Keys: " + Object.keys(chartdata.value[0]));
  console.log("Chartdata Amount of Keys: " + Object.keys(chartdata.value[0]).length);
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