<template>
  <div>
    <form @submit.prevent="loadEvent">
    <div class="input-container">
      <label for="textInput" class="form-label">Enter Race ID</label>
      <input type="text" id="textInput" v-model="textInput" placeholder="Enter a number" class="input-field">
    </div>
    <p class="error-text" v-if="isError">Bitte eine gültige RaceID eingeben</p>
    <button class="start-button" type="submit">START</button>
  </form>

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
  </div>
</template>
 

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import {fetchStartersThatDidntGetFar, selectRunnersForSplit} from '../insights';

const store = useStore();
const router = useRouter();
const textInput = ref('2305270');
const numberInput = ref<number | null>(null);
let isError = ref(false);
const courses = ref([]);
let splits = ref([]) as any;
let chartdata = [] as any;

const selectedCourse = ref(null);
const selectedSplits = ref([]);

watch(textInput, (newVal) => {
    
    if (!isNaN(Number(newVal))) {
        if (newVal) {
            numberInput.value = parseInt(newVal);
            store.setEventID(numberInput.value);
            isError.value = false;
        } else {
            numberInput.value = null;
            isError.value = true;
        }
    } else {
        isError.value = true;
    }
    console.log('numberInput changed to:', numberInput.value);
  });
  const loadEvent = async () => {
    let response = await fetch("http://win2.fh-timing.com/middleware/" + numberInput.value + "/info/json?setting=courses");
    if (!response.ok) {
      //throw new Error(`HTTP error! status: ${response.status}`);
      isError.value = true;
    }
    let jsonResponse = await response.json();
    //console.log(jsonResponse);
    courses.value = jsonResponse.Courses;
    store.setCourses(jsonResponse.Courses);
    router.push('/dashboard');
    //router.push({ name: 'dashboard', params: { courses: courses.value } });
    if (courses.value.length > 0) {
    selectedCourse.value = courses.value[0].Coursenr;
  }
  };

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
  color: var(--text-color);
}

.dropdown-container {
  position: relative;
  margin-bottom: 1rem;
}

.dropdown-label {
  position: absolute;
  top: -0.6rem; /* Adjusts to move the label slightly above the select */
  left: 1rem; /* Adjusts to align with the text inside the select */
  padding: 0 0.4rem;
  background-color: var(--sidebar-bg); /* Use the background color variable */
  font-size: 0.8rem;
  transition: all 0.3s;
  pointer-events: none;
  user-select: none;
  color: #76C657;
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
  background-color: var(--sidebar-bg); /* Use the background color variable */
}

.input-container {
  position: relative;
  margin-bottom: 1rem;
  width: calc(100% - 30px);
}

.input-field {
  padding: 0.4rem 0.8rem;
  border: 1px solid #76C657;
  border-radius: 4px;
  color: var(--text-color);
  background-color: var(--sidebar-bg); /* Use the background color variable */
  width: calc(100% - 30px);
  margin-top: 1.2rem; /* Space for the label */
  /* Other styles as needed */
}

.form-label {
  position: absolute;
  top: 0.4rem; /* Adjust this to position the label inside the border */
  left: 1rem; /* Adjust as needed */
  background-color: var(--sidebar-bg); /* Use the background color variable */
  padding: 0 0.4rem;
  font-size: 0.8rem;
  transition: all 0.3s;
  pointer-events: none;
  user-select: none;
  color: #76C657;
}

.start-button {
  width: fit-content; /* Adjust this value to your liking */
  margin: 10px auto; /* Centers the elements */
  display: block; /* Needed for margin auto to work */
}
  
  .start-button {
    background-color: #4CAF50;
    color: white;
    opacity: 0.9;
  }
  
  .start-button:hover {
    opacity: 1;
  }
</style>