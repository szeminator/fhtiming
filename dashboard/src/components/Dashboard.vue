<template>
  
  <div>
  <table class="styled-table">
      <thead class="header">
        <tr>
          <th v-for="key in combinedKeys" :key="key">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in chartdata" :key="data.start">
          <td v-for="key in combinedKeys" :key="key">
            {{ data[key] }}
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
let chartdataKeys = computed(() => store.chartdataKeys);
let predefinedChartKeys = ['start', 'first', 'last', 'club', 'category', 'age', 'gender', 'status', 'nat'];

let selectedCourse = computed(() => store.selectedCourse);
let selectedSplits = computed(() => store.selectedSplitIDs);
let combinedKeys = computed(() => predefinedChartKeys.concat(selectedSplits.value));


onMounted(() => {
  
  console.log(courses);
});

async function loadChartdata() {
  console.log(selectedCourse);
  console.log(selectedSplits);
  console.log((chartdata.value[0] as any)?.first + " " + (chartdata.value[0] as any)?.last);
  console.log("Chartdata Keys: " + chartdataKeys);
  console.log("Chartdata Amount of Keys: " + chartdataKeys.value.length);
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