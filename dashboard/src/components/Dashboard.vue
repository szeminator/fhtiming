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
        <!-- Add renderKey to the key to force a re-render when combinedKeys changes -->
        <tr v-for="data in chartdata" :key="data.start + combinedKeys.join('-') + renderKey">
          <td v-for="key in combinedKeys" :key="key">
            {{ console.log('rendering row: ', data[key]) }}
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
let predefinedChartKeys = ['start', 'first', 'last', 'club', 'category', 'age', 'gender', 'status', 'nat'];

let selectedCourse = computed(() => store.selectedCourse);
let selectedSplits = computed(() => store.selectedSplitIDs);
let combinedKeys = computed(() => predefinedChartKeys.concat(selectedSplits.value));

// Create a ref that will be used to force a re-render
let renderKey = ref(0);

// Watch for changes in combinedKeys
watch(combinedKeys, () => {
  // Increment renderKey to force a re-render
  //console.log('combinedKeys changed', combinedKeys.value);
  renderKey.value++;
  //console.log('renderKey changed', renderKey.value);
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
  font-weight: bold;
}

.styled-table tr:nth-child(even) {
  background-color: #EBF9F1;
}
</style>