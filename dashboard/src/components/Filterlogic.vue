<template>
  <div class="filter-container">
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
    <div class="split-list">
      <div v-for="split in splits" :key="split.Splitnr" class="split-item">
        <input type="checkbox" :id="`split-${split.Splitname}`" :value="split.Splitname" v-model="selectedSplits" class="hidden-checkbox">
        <label :for="'split-' + split.Splitname" class="checkbox-label">
          <span class="custom-checkbox">
            <!-- @vue-ignore -->
            <i class="checkmark" v-show="selectedSplits.includes(split.Splitname)">✓</i>
          </span>{{ split.Splitname }} - {{ split.Splitnr }}</label>
      </div>
    </div>
    <button class="reset-button" @click="resetSplitsFilter">Reset Splits</button>
  </div>
  <div class="split-list">
      <div v-for="key in keyMappings" :key="key" class="split-item">
        <input type="checkbox" :id="`${key}`" :value="`${key}`" v-model="selectedKeys" class="hidden-checkbox">
        <label :for="`${key}`" class="checkbox-label">
          <span class="custom-checkbox">
            <i class="checkmark" v-show="selectedKeys.includes(key)">✓</i>
          </span> {{ key }}</label>
      </div>
    </div>
    <button class="reset-button" @click="resetKeysFilter">Reset Parameters</button>
  </div>
  <div class="toggle-container">
  <div class="checkbox-container">
    <input type="checkbox" id="autoRefresh" v-model="autoRefresh" class="hidden-checkbox">
    <label for="autoRefresh" class="checkbox-label">
      <span class="custom-checkbox">
        <i class="checkmark" v-show="autoRefresh">✓</i>
      </span>
      Autorefresh
    </label>
  </div>
  <progress id="progressBar" max="100" :value="progress" class="custom-progress"></progress>
</div>

<div class="gender-filter-container">
  <div class="checkbox-container">
  <input type="checkbox" id="filterFemales" v-model="checkbox_filterFemales" class="hidden-checkbox">
  <label for="filterFemales" class="checkbox-label">
    <span class="custom-checkbox">
      <i class="checkmark" v-show="checkbox_filterFemales">✓</i>
    </span>
    Female participants only
  </label>
</div>
<div class="checkbox-container">
  <input type="checkbox" id="filterMales" v-model="checkbox_filterMales" class="hidden-checkbox">
  <label for="filterMales" class="checkbox-label">
    <span class="custom-checkbox">
      <i class="checkmark" v-show="checkbox_filterMales">✓</i>
    </span>
    Male participants only
  </label>
</div>
</div>


</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import {fetchStartersThatDidntGetFar, selectRunnersForSplit, filterFemales} from '../insights';



interface Course {
    Coursenr: number;
    Coursename: string;
    // add other properties as needed
  }

const store = useStore();
const router = useRouter();
const textInput = ref('2305270');
const numberInput = ref<number | null>(null);
let isError = ref(false);
const courses = ref<Course[]>([]);
let splits = ref<any[]>([]);
let chartdata = [] as any[];
let selectedKeys = ref([]) as any;
let autoRefresh = ref(false);
let progress = ref(0);
let progressIntervalId: number | null | undefined = null;
let intervalId: number | null | undefined = null;
const checkbox_filterFemales = ref(false);
const checkbox_filterMales = ref(false);


const keyMappings = {
  start: 'Start Number',
  first: 'First Name',
  last: 'Last Name',
  club: 'Club',
  category: 'Category',
  age: 'Age',
  gender: 'Gender',
  status: 'Status',
  nat: 'Nationality',
  rank: 'Rank',
  city: 'City',
  dnf: 'DNF'
// Add more mappings as needed
};



const selectedCourse = ref(null);
const selectedSplits = ref([]);

watch(checkbox_filterFemales, (newVal) => {
  if (newVal) {
    console.log("filterFemales True");
    console.log(filterFemales());
  } else {
    console.log("filterFemales False");
  }
  
});

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
    router.push('/table');
    //router.push({ name: 'table', params: { courses: courses.value } });
    if (courses.value.length > 0) {
      // @ts-ignore
      selectedCourse.value = courses.value[0].Coursenr;
  }
  };


watch(autoRefresh, (newVal) => {
  if (newVal) {
      progressIntervalId = setInterval(() => {
        progress.value = (progress.value + 2) % 100;
      }, 100);
      intervalId = setInterval(refresh, 5000);

    } else {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
      if(intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      progress.value = 0;
    }
});

async function refresh() {
  //console.log('refresh');
  let selectedCourse = store.selectedCourse

  let response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/info/json?setting=splits&course=${selectedCourse}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  //console.log(response);  
  let jsonResponse = await response.json();
  console.log(jsonResponse);  
  console.log("selectedCourse: " + selectedCourse);
  // Well it depends on the course that the splits are called Splits_100, Splits_102, Splits_103, etc.
  // So we need to use the course number to get the correct splits.
  let firstKey = Object.keys(jsonResponse)[0];
  let splits = jsonResponse[firstKey]; //jsonResponse[`Splits_${newCourse}`];  console.log("splits: " + splits);

  let splitNumbers = splits.map((split: { Splitnr: any; }) => Number(split.Splitnr));
  store.setAllSplitIDs(splitNumbers);

  let splitNumberNamePairs = splits.map((split: { Splitnr: any; Splitname: any; }) => ({
    Splitnr: split.Splitnr,
    Splitname: split.Splitname
  }));
  store.setAllSplitIDNamePairs(splitNumberNamePairs);

  //console.log("Splitnumbers got updated");

  response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/result/json?course=${selectedCourse}&splitnr=${store.allSplitIDs.join(',')}&order=asc&detail=start,first,last,club,category,age,gender,status,nat`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  //console.log(response);
  jsonResponse = await response.json();
  firstKey = Object.keys(jsonResponse)[0];
  chartdata = jsonResponse[firstKey];
  if (chartdata.length > 0) {
    store.setChartdataKeys(Object.keys(chartdata[0]));
  }
  store.setAllResultData(chartdata);
    //console.log("Chartdata got updated" + chartdata);
}

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
    let firstKey = Object.keys(jsonResponse)[0];

    splits.value = jsonResponse[firstKey]; //jsonResponse[`Splits_${newCourse}`];
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
    firstKey = Object.keys(jsonResponse)[0];
    chartdata = jsonResponse[firstKey]; //chartdata = jsonResponse[`Course_${selectedCourse.value}`];
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


/*
const keyMappings = {
  start: 'Start Number',
  first: 'First Name',
  last: 'Last Name',
  club: 'Club',
  category: 'Category',
  age: 'Age',
  gender: 'Gender',
  status: 'Status',
  nat: 'Nationality',
  rank: 'Rank',
  city: 'City',
  dnf: 'DNF'
};

*/

watch(selectedKeys, (newKeys) => {
  selectedKeys.value = newKeys;
  let completlyNewArray: { [x: string]: string; }[] = [];
  //console.log(newKeys);
  newKeys.forEach((value: string) => {
    //console.log(value);
    // @ts-ignore
    let foundKey = Object.keys(keyMappings).find(key => keyMappings[key] === value) as string;
    let newObject = {
      [foundKey]: value
    };
    completlyNewArray.push(newObject);
    });
  //console.log(completlyNewArray);
  store.setSelectedKeys(completlyNewArray);
  }, {}
);  

onMounted(() => {
  //courses = computed(() => store.courses);
  //console.log(courses);
});

const resetSplitsFilter = () => {
  selectedSplits.value = []; // Adjust this as needed for the default state
};

const resetKeysFilter = () => {
  selectedKeys.value = []; // Adjust this as needed for the default state
};

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
  left: 20px; /* Adjusts to align with the text inside the select */
  font-family: 'Open Sans', sans-serif;
  margin-left: 15px;
}
.split-item input[type="checkbox"] {
  margin-right: 10px; /* Space between the checkbox and the label */
}

.text {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #76C657;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
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
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
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
  font-size: 14px;
  line-height: 1;
  display: none;  /* Aligns the checkmark vertically */
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
  color: var(--text-color);
}

.dropdown-container {
  position: relative;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
}

.dropdown-label {
  position: absolute;
  top: -0.6rem; /* Adjusts to move the label slightly above the select */
  left: 20px; /* Adjusts to align with the text inside the select */
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
  padding: 0.6rem 0.8rem;
  border: 1px solid #76C657;
  border-radius: 4px;
  cursor: pointer;
  width: calc(100% - 30px);
  display: block; 
  margin-top: 1.2rem; 
  margin-left: 15px;
  margin-bottom: 15px;
  background-color: var(--sidebar-bg); /* Use the background color variable */
}

.input-container {
  position: relative;
  margin-bottom: 1rem;
  width: calc(100% - 30px);
}

.input-field {
  padding: 0.6rem 0.8rem;
  border: 1px solid #76C657;
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--text-color);
  background-color: var(--sidebar-bg); /* Use the background color variable */
  width: calc(100% - 30px);
  margin-top: 1.2rem; /* Space for the label */
  /* Other styles as needed */
  margin-left: 15px;
}

.form-label {
  position: absolute;
  top: 0.4rem; /* Adjust this to position the label inside the border */
  left: 20px; /* Adjust as needed */
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Adds shadow */
  transition: box-shadow 0.3s ease; /* Smooth transition for the shadow */
  background-color: #4CAF50;
  color: white;
  opacity: 0.9;
  margin-top: 10px;
  margin-bottom: 25px;
  }
  

.start-button:hover {
  background-color: #9BE77D; /* Lighter green color */
  color: var(--text-color);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Slightly larger shadow on hover */
}

.start-button:active {
  background-color: #659C44; /* Darker green for pressed state */
  transform: scale(0.98); /* Slightly scale down when pressed */
}

.reset-button {
  background-color: #c22424ef;
  color: white;
  opacity: 0.9;
  border: none; /* Optional: removes the default border */
  padding: 10px 15px; /* Adjust padding as needed */
  border-radius: 5px; /* Optional: rounds the corners of the button */
  cursor: pointer; /* Changes the cursor to a pointer when hovering over the button */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Adds shadow */
  transition: box-shadow 0.3s ease; /* Smooth transition for the shadow */
  margin-top: 10px;
  margin-bottom: 25px;
}

.reset-button:hover {
  background-color: #c22424ef; 
  color: var(--text-color);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Slightly larger shadow on hover */

}

.reset-button:active {
  background-color: #7e1c1cef; /* Darker green for pressed state */
  transform: scale(0.98); /* Slightly scale down when pressed */
}

/* Custom styles for progress bar */
/* Style for the autorefresh checkbox to match other checkboxes */
.toggle-container .split-item .hidden-checkbox {
  opacity: 0;
  position: absolute;
}


.toggle-container .split-item .checkbox-label {
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: #76C657;
}

.toggle-container .split-item .custom-checkbox {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #76C657;
  border-radius: 4px;
  position: relative;
}

.toggle-container .split-item .checkmark {
  color: #76C657;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  line-height: 1;
}

/* Custom progress bar styling */
.custom-progress {
  width: 100%;
  height: 20px;
  background-color: var(--sidebar-bg);
  border-radius: 10px;
  overflow: hidden;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #76C657;
  cursor: pointer;
  width: calc(100% - 30px);
}

.custom-progress::-webkit-progress-bar {
  background-color: var(--sidebar-bg);
  border-radius: 10px;
}

.custom-progress::-webkit-progress-value {
  background-color: #76C657;
  border-radius: 10px;
}

.custom-progress::-moz-progress-bar {
  background-color: #76C657;
  border-radius: 10px;
}

.split-item, .toggle-container .checkbox-container {
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;
  left: 20px; /* Adjust if needed */
  font-family: 'Open Sans', sans-serif;
  margin-left: 15px;
}

.hidden-checkbox:checked + .checkbox-label .checkmark {
  display: inline; /* Show checkmark when checkbox is checked */
}

.gender-filter-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px; /* Adjust the padding value as needed */
  margin-left: 15px; /* Align with other containers */
}

.gender-filter-container .checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 8px; /* Consistent spacing between checkbox items */
}

.gender-filter-container .checkbox-container .hidden-checkbox {
  margin-right: 10px; /* Space between the checkbox and the label */
}

.gender-filter-container .checkbox-container .checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: var(--text-color);
}

.gender-filter-container .checkbox-container .custom-checkbox {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #76C657;
  border-radius: 4px;
  position: relative;
}

.gender-filter-container .checkbox-container .checkmark {
  color: #76C657;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  line-height: 1;
}
</style>