<template>
  <div class="dropdown-container">
    <label for="courseSelect" class="dropdown-label">Select a course</label>
    <select v-model="selectedCourse" id="courseSelect" class="dropdown-select">
      <option v-for="course in courses" :key="course.Coursenr" :value="course.Coursenr">
        {{ course.Coursename }} - {{ course.Coursenr }}
      </option>
    </select>
    <p class="text">Selected Course: {{ selectedCourse }}</p>
    <div class="split-list">
      <div v-for="split in splits" :key="split.Splitnr" class="split-item">
        <input type="checkbox" :id="`split-${split.Splitname}`" :value="split.Splitname" v-model="selectedSplits" class="hidden-checkbox">
        <label :for="'split-' + split.Splitname" class="checkbox-label">
          <span class="custom-checkbox">
            <i class="checkmark" v-show="selectedSplits.includes(split.Splitname)">✓</i>
          </span>{{ split.Splitname }} - {{ split.Splitnr }}</label>
      </div>
    </div>
  </div>
</template>
 

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from '../store';
import {fetchStartersThatDidntGetFar, selectRunnersForSplit} from '../insights';

const store = useStore();
let courses = computed(() => store.courses);
let splits = ref([]) as any;
let chartdata = [] as any;

const selectedCourse = ref(null);
const selectedSplits = ref([]);

watch(selectedCourse, async (newCourse) => {
  if (newCourse) {
    store.setSelectedCourse(newCourse);
    //console.log("Selected Course got updated");
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

    let splitNumberNamePairs = splits.value.map((split: { Splitnr: any; Splitname: any; }) => ({
      Splitnr: split.Splitnr,
      Splitname: split.Splitname
    }));
    store.setAllSplitIDNamePairs(splitNumberNamePairs);

    //console.log("Splitnumbers got updated");

    response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/result/json?course=${selectedCourse.value}&splitnr=${store.allSplitIDs.join(',')}&order=asc&detail=start,first,last,club,category,age,gender,status,nat`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //console.log(response);
    jsonResponse = await response.json();
    chartdata = jsonResponse[`Course_${selectedCourse.value}`];
    if (chartdata.length > 0) {
      store.setChartdataKeys(Object.keys(chartdata[0]));
    }
    store.setAllResultData(chartdata);

    selectedSplits.value = [];
    store.setSelectedSplitIDs([]);
    fetchStartersThatDidntGetFar();
    selectRunnersForSplit();
    //console.log("Chartdata got updated" + chartdata);
  }
});

watch(selectedSplits, (newSplits) => {
  //console.log(newSplits);
  //every entry in the result/json?course=102 call gets the splits back
  //but in the results call the splits are called START_DUMMY_Time so every Splitname with _Time at the end needs to be updated
  let updatedSplits = newSplits.map(split => split + "_Time");
  store.setSelectedSplitIDs(updatedSplits);
});

onMounted(() => {
  //courses = computed(() => store.courses);
  console.log(courses);
});

</script>

<style scoped>
.split-list {
  margin: 0;
  padding: 0;
}

.split-item {
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;
  padding-left: 5px;
  font-family: 'Arial', sans-serif; /* Your preferred font */
}
.split-item input[type="checkbox"] {
  margin-right: 10px; /* Space between the checkbox and the label */
}

.text {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: #000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Open Sans', sans-serif;
}

.hidden-checkbox {
  opacity: 0;
  position: absolute;
}

.dropdown-select ::selection {
  background: #76C657; /* Your desired green color */
  color: white; /* Text color */
}

.dropdown-select option:hover {
  background-color: #76C657 !important; /* Green */
  color: white;
}

.dropdown-select option:checked {
  background-color: #76C657 !important; /* Your desired green color */
  color: white;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.75rem;
}

.custom-checkbox {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #76C657;
  border-radius: 4px;
  position: relative;
}

.checkmark {
  color: #76C657;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px; /* Adjusted for the smaller checkbox size */
  line-height: 1; /* Aligns the checkmark vertically */
}

select {
  font-size: 0.8rem; /* Smaller font size */
  padding: 0.4rem 0.8rem; /* Smaller padding */
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem; /* Less margin below the dropdown */
  cursor: pointer;
  width: auto; /* Adjust width to content or set a specific size */
  display: block; /* Ensure it doesn't inline with other elements */
  margin-left: auto; /* Centers the dropdown if its width is less than 100% */
  margin-right: auto;
}

.dropdown-container {
  position: relative;
  margin-bottom: 1rem;
}

.dropdown-label {
  position: absolute;
  top: -0.6rem; /* Adjusts to move the label slightly above the select */
  left: 1rem; /* Adjusts to align with the text inside the select */
  background: #ffffff; /* Assumes your sidebar background color */
  padding: 0 0.4rem;
  font-size: 0.8rem;
  color: #76C657;
  transition: all 0.3s;
  pointer-events: none; 
  user-select: none; 
}

.dropdown-select {
font-size: 0.8rem;
padding: 0.4rem 0.8rem;
border: 1px solid #76C657;
border-radius: 4px;
cursor: pointer;
width: calc(100% - 30px);
display: block; 
margin-top: 1.2rem; 
margin-left: 5px;
}

</style>