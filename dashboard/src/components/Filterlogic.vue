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
    //console.log("Splitnumbers got updated");

    response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/result/json?course=${selectedCourse.value}&splitnr=${store.allSplitIDs.join(',')}&rank=199100&order=asc&detail=start,first,last,club,category,age,gender,status,nat`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //console.log(response);
    jsonResponse = await response.json();
    chartdata = jsonResponse[`Course_${selectedCourse.value}`];
    store.setChartdataKeys(Object.keys(chartdata[0]));
    store.setAllResultData(chartdata);
    selectedSplits.value = [];
    store.setSelectedSplitIDs([]);
    //console.log("Chartdata got updated");
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
.info-container {
  display: flex;
  justify-content: flex-start;
  gap: 20px; 
  margin-bottom: 20px;
  margin-top: 20px;
}

.split-list {
  margin: 0;
  padding: 0;
}

.split-item {
  display: flex;
  align-items: center;
  padding: 8px 8px;
  border-radius: 4px;
  margin-bottom: 2px;
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

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
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
width: 90%; 
display: block; 
margin-top: 1.2rem; 
}

</style>