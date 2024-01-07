<template>
    <div class="container">
      <h1>FH Timing Streckenauswertung</h1>
      <p>
        Streckenauswertung bietet eine visuelle Darstellung der Zeitdaten von Läufer:innen, Fahrer:innen und Radfahrer:innen. 
        Durch Diagramme und Tabellen können Sie leicht die Leistung jedes/jeder Teilnehmers/Teilnehmerin verfolgen und vergleichen. 
        Dies ermöglicht eine effektive Analyse und verbessert das Verständnis der Rennbedingungen.
      </p>
    </div>
    <div>
        <input type="text" v-model="textInput" placeholder="Enter a number" class="input-field">
        <p class="error-text" v-if="isError">Bitte eine gültige RaceID eingeben</p>
        <button class="start-button" @click="loadEvent">START</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../store';


  const store = useStore();
  const router = useRouter();
  const textInput = ref('');
  const numberInput = ref<number | null>(null);
  let isError = ref(false);
  const courses = ref([]);


   
  watch(textInput, (newVal) => {
    
    if (!isNaN(Number(newVal))) {
        if (newVal) {
            numberInput.value = parseInt(newVal);
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
  };
  </script>
  
  <style scoped>
  .error-text {
  color: red;
  font-size: 12px;
}
  .container {
    padding-bottom: 20px;
  }
  .input-field {
  /* Other styles remain the same */
  padding: 20px 10px; /* Adjust the first value (vertical padding) to your liking */
}
  .input-field, .start-button {
  width: 20%; /* Adjust this value to your liking */
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