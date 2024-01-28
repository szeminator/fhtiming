<template>
<!-- <div>
    <table class="styled-table">
      <thead class="header">
        <tr>
          <th v-for="key in combinedKeys" :key="key">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in chartdata" :key="data.start + combinedKeys.join('-') + renderKey">
          <td v-for="key in combinedKeys" :key="key">
            {{ console.log('rendering row: ', data[key]) }}
            {{ data[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->


  <div>
    <table class="styled-table">
      <thead class="header">
        <tr>
          <th v-for="key in combinedDisplayNames" :key="key">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in chartdata" :key="data.start + combinedKeys.join('-') + renderKey">
        <td v-for="key in combinedKeys" :key="key">
        {{ data[key] }}
      </td>
      </tr>
    </tbody>
  </table>
</div>


</template>

 

<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue';
import { useStore } from '../store';

const store = useStore();
const courses = store.courses;
let chartdata = computed(() => store.allResults);
let chartdataKeys = computed(() => store.chartdataKeys);
let predefinedChartKeys = ['start', 'first', 'last', 'club', 'category', 'age', 'gender', 'status', 'nat', 'rank', 'city', 'dnf'];

let selectedCourse = computed(() => store.selectedCourse);
let selectedSplits = computed(() => store.selectedSplitIDs);
let keyMappings = computed(() => store.selectedKeys);

let combinedKeys = computed(() => keyMappings.value.map(Object.keys).concat(selectedSplits.value));
let combinedDisplayNames = computed(() => keyMappings.value.map(Object.entries).map(item => item[0][1]).concat(selectedSplits.value));



// Create a ref that will be used to force a re-render
let renderKey = ref(0);

// Watch for changes in combinedKeys
watch(combinedKeys, () => {
  // Increment renderKey to force a re-render
 // console.log('combinedKeys changed', combinedKeys.value);
  renderKey.value++;
  //console.log('renderKey changed', renderKey.value);
});
watch(keyMappings, () => {
 // console.log('keyMappings changed', keyMappings.value);
});

onMounted(() => {
  //console.log(courses);
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
  font-weight: bold; /* Makes the header text bold */
  padding: 10px; /* Adds padding around the text, adjust as needed */
}

.th.header{
  border-bottom: 1px solid #76C657
}

.styled-table th, .styled-table td {
  border-right: 1px solid #417DA8; /* Adds a thin right border to each cell */
  padding: 10px; /* Adds padding around the text, adjust as needed */
}

.styled-table th:last-child, .styled-table td:last-child {
  border-right: none; /* Removes the right border for the last cell */
}

.styled-table tr:nth-child(even) {
  background-color: var(--table-row-bg-light);
  color: var(--table-row-text-light);
}

.dark-theme .styled-table tr:nth-child(even) {
  background-color: var(--table-row-bg-dark);
  color: var(--table-row-text-dark);
}
</style>

