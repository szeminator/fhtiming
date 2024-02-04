<template>
  <div class="filter-container">
    <form @submit.prevent="loadEvent">
    <div class="input-container">
      <label for="textInput" class="form-label">Enter Race ID</label>
      <input type="text" id="textInput" v-model="textInput" placeholder="Enter a number" class="input-field">
    </div>
    <p class="error-text" v-if="isError">Please enter a valid Race ID</p>
    <button class="start-button" type="submit">START</button>
  </form>
  <div class="input-container">
    <label for="nettoTimeID" class="form-label">Enter Time Identifier</label>
    <input type="text" id="nettoTimeID" v-model="nettoTime" class="input-field">
    <p class="error-text" v-if="isTimeError">Please enter a valid Time Identifier</p>
  </div>
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
    Female Participants only
  </label>
</div>
<div class="checkbox-container">
  <input type="checkbox" id="filterMales" v-model="checkbox_filterMales" class="hidden-checkbox">
  <label for="filterMales" class="checkbox-label">
    <span class="custom-checkbox">
      <i class="checkmark" v-show="checkbox_filterMales">✓</i>
    </span>
    Male Participants only
  </label>
</div>
</div>


</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import {fetchStartersThatDidntGetFar, selectRunnersForSplit, filterFemales, filterMales} from '../insights';

interface Course {
    Coursenr: number;
    Coursename: string;
    // add other properties as needed
  }

const store = useStore();
const router = useRouter();

let textInput = ref('2305270');
store.setEventID(2305270);
let nettoTime = ref('199100');
store.setNettoTimeIdentifier(199100);
const numberInput = ref(2305270);
let isError = ref(false);
let isTimeError = ref(false);
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
let intervalLengthInSeconds = 2;

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
    if (checkbox_filterMales.value) {
      refresh();
    }
    store.setAllResultData(filterFemales());
  } else {
    if (checkbox_filterMales.value == false) {
      refresh();
    } else
    {
      store.setAllResultData(filterMales());
    }
  }
});

watch(checkbox_filterMales, (newVal) => {
  if (newVal) {
    if (checkbox_filterFemales.value) {
      refresh();
    }
    store.setAllResultData(filterMales());
  } else {
    if (checkbox_filterFemales.value == false) {
      refresh();
    } else
    {
      store.setAllResultData(filterFemales());
    }
  }
});

watch(nettoTime, (newVal) => {
  if (!isNaN(Number(newVal))) {
    if (newVal) {
      store.setNettoTimeIdentifier(parseInt(newVal));
      isTimeError.value = false;
    } else {
      isTimeError.value = true;
    }
  } else {
    isTimeError.value = true;
  }
});

watch(textInput, (newVal) => {
    
    if (!isNaN(Number(newVal))) {
        if (newVal) {
            numberInput.value = parseInt(newVal);
            store.setEventID(numberInput.value);
            isError.value = false;
        } else {
          // @ts-ignore
            numberInput.value = null;
            isError.value = true;
        }
    } else {
        isError.value = true;
    }
  });
  const loadEvent = async () => {
    let response = await fetch("http://win2.fh-timing.com/middleware/" + numberInput.value + "/info/json?setting=courses");
    if (!response.ok) {
      isError.value = true;
    }
    let jsonResponse = await response.json();
    courses.value = jsonResponse.Courses;
    store.setCourses(jsonResponse.Courses);
    router.push('/table');
    if (courses.value.length > 0) {
      // @ts-ignore
      selectedCourse.value = courses.value[0].Coursenr;
  }
  };

watch(autoRefresh, (newVal) => {
  if (newVal) {
      progressIntervalId = setInterval(() => {
        progress.value = (progress.value + 1) % 100;
      }, intervalLengthInSeconds * 10);
      intervalId = setInterval(refresh, intervalLengthInSeconds * 1000);

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
  let selectedCourse = store.selectedCourse

  let response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/info/json?setting=splits&course=${selectedCourse}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let jsonResponse = await response.json();

  // Well it depends on the course that the splits are called Splits_100, Splits_102, Splits_103, etc.
  // So we need to use the course number to get the correct splits.
  let firstKey = Object.keys(jsonResponse)[0];
  let splits = jsonResponse[firstKey]; 

  let splitNumbers = splits.map((split: { Splitnr: any; }) => Number(split.Splitnr));
  store.setAllSplitIDs(splitNumbers);

  let splitNumberNamePairs = splits.map((split: { Splitnr: any; Splitname: any; }) => ({
    Splitnr: split.Splitnr,
    Splitname: split.Splitname
  }));
  store.setAllSplitIDNamePairs(splitNumberNamePairs);

  response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/result/json?course=${selectedCourse}&splitnr=${store.allSplitIDs.join(',')}&order=asc&detail=start,first,last,club,category,age,gender,status,nat`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  jsonResponse = await response.json();
  firstKey = Object.keys(jsonResponse)[0];
  chartdata = jsonResponse[firstKey];
  if (chartdata.length > 0) {
    store.setChartdataKeys(Object.keys(chartdata[0]));
  }
  store.setAllResultData(chartdata);
}

watch(selectedCourse, async (newCourse) => {
  if (newCourse) {
    store.setSelectedCourse(newCourse);
    let response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/info/json?setting=splits&course=${newCourse}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let jsonResponse = await response.json();
    // Well it depends on the course that the splits are called Splits_100, Splits_102, Splits_103, etc.
    // So we need to use the course number to get the correct splits.
    let firstKey = Object.keys(jsonResponse)[0];

    splits.value = jsonResponse[firstKey]; 
    let splitNumbers = splits.value.map((split: { Splitnr: any; }) => Number(split.Splitnr));
    store.setAllSplitIDs(splitNumbers);

    let splitNumberNamePairs = splits.value.map((split: { Splitnr: any; Splitname: any; }) => ({
      Splitnr: split.Splitnr,
      Splitname: split.Splitname
    }));
    store.setAllSplitIDNamePairs(splitNumberNamePairs);

    response = await fetch(`http://win2.fh-timing.com/middleware/${store.eventid}/result/json?course=${selectedCourse.value}&splitnr=${store.allSplitIDs.join(',')}&order=asc&detail=start,first,last,club,category,age,gender,status,nat`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    jsonResponse = await response.json();
    firstKey = Object.keys(jsonResponse)[0];
    chartdata = jsonResponse[firstKey]; 
    if (chartdata.length > 0) {
      store.setChartdataKeys(Object.keys(chartdata[0]));
    }
    store.setAllResultData(chartdata);

    selectedSplits.value = [];
    store.setSelectedSplitIDs([]);
    fetchStartersThatDidntGetFar();
    selectRunnersForSplit();
    checkbox_filterFemales.value = false;
    checkbox_filterMales.value = false;
  }
});

watch(selectedSplits, (newSplits) => {
  
  //every entry in the result/json?course=102 call gets the splits back
  //but in the results call the splits are called START_DUMMY_Time so every Splitname with _Time at the end needs to be updated
  let updatedSplits = newSplits.map(split => split + "_Time");
  store.setSelectedSplitIDs(updatedSplits);
});

watch(selectedKeys, (newKeys) => {
  selectedKeys.value = newKeys;
  let completlyNewArray: { [x: string]: string; }[] = [];
  newKeys.forEach((value: string) => {
    // @ts-ignore
    let foundKey = Object.keys(keyMappings).find(key => keyMappings[key] === value) as string;
    let newObject = {
      [foundKey]: value
    };
    completlyNewArray.push(newObject);
    });
  store.setSelectedKeys(completlyNewArray);
  }, {}
);  



onMounted(() => {
  nettoTime.value = '199100';
  textInput.value = '2305270'; 
});

const resetSplitsFilter = () => {
  selectedSplits.value = []; // Adjust this as needed for the default state
};

const resetKeysFilter = () => {
  selectedKeys.value = []; // Adjust this as needed for the default state
};

</script>