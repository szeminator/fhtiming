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
          <!-- @vue-ignore -->
          <td v-for="key in combinedKeys" :key="key.toString()">
            {{
                // @ts-ignore
              data[key] 
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useStore } from '../store';

const store = useStore();
let chartdata = computed(() => store.allResults);

let selectedCourse = computed(() => store.selectedCourse);
let selectedSplits = computed(() => store.selectedSplitIDs);
let keyMappings = computed(() => store.selectedKeys);

let combinedKeys = computed(() => keyMappings.value.map(Object.keys).concat(selectedSplits.value));
let combinedDisplayNames = computed(() => keyMappings.value.map(Object.entries).map(item => item[0][1]).concat(selectedSplits.value).flat());

let sortKey = ref(null);
let sortOrder = ref(1); // 1 for ascending, -1 for descending

 // @ts-ignore
function sort(key) {
  sortKey.value = key || 'last';
  sortOrder.value *= -1; // set sort order to ascending
}

let sortedChartData = computed(() => {
  let sorted = [...chartdata.value];
  sorted.sort((a, b) => {
     // @ts-ignore
    let aValue = a[sortKey.value] !== undefined ? a[sortKey.value] : a[findKey(sortKey.value)];
     // @ts-ignore
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
  return sorted;
});

 // @ts-ignore
function findKey(value) {
  let mapping = keyMappings.value.find(item => Object.values(item)[0] === value);
  return mapping ? Object.keys(mapping)[0] : null;
}


// Create a ref that will be used to force a re-render
let renderKey = ref(0);
// Watch for changes in combinedKeys
watch(combinedKeys, () => {
  // Increment renderKey to force a re-render
  renderKey.value++;
});


watch(() => selectedCourse.value, () => {
    sortKey.value = null;
});
</script>

