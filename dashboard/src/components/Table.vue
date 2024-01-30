<template>
  <div>
    <table class="styled-table">
      <thead class="header">
        <tr>
          <th v-for="key in combinedDisplayNames" :key="key" @click="sort(key)" :class="{ 'highlighted': sortKey === key }">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in sortedChartData" :key="data.start + combinedKeys.join('-') + renderKey">
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

let sortKey = ref(null);
let sortOrder = ref(1); // 1 for ascending, -1 for descending




function sort(key) {
  //console.log('sort', key);
  sortKey.value = key || 'last';
  sortOrder.value *= -1; // set sort order to ascending
}

let sortedChartData = computed(() => {
  let sorted = [...chartdata.value];
  sorted.sort((a, b) => {
    //console.log("sort_Key.value: " + sortKey.value);
    //console.log("a: " + a);
    //console.log('a[sortKey.value]:', a[sortKey.value]); // Add this line
    let aValue = a[sortKey.value] !== undefined ? a[sortKey.value] : a[findKey(sortKey.value)];
    let bValue = b[sortKey.value] !== undefined ? b[sortKey.value] : b[findKey(sortKey.value)];

    // Check if both values are numeric
    if (!isNaN(aValue) && !isNaN(bValue)) {
      // Convert to numbers and compare
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else {
      // Compare as strings
      aValue = String(aValue);
      bValue = String(bValue);
    }

    if (aValue < bValue) return -1 * sortOrder.value;
    if (aValue > bValue) return 1 * sortOrder.value;

    return 0;
  });
  //console.log('sortedChartData:', sorted); // Add this line
  return sorted;
});


function findKey(value) {
  //console.log(keyMappings.value);
  let mapping = keyMappings.value.find(item => Object.values(item)[0] === value);
  return mapping ? Object.keys(mapping)[0] : null;
}


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

watch(() => selectedCourse.value, () => {
    sortKey.value = null;
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

.highlighted {
  background-color: #f0f0f0;
}
</style>

