<template>
    <div class="container">
      <h1>FH Timing Streckenauswertung</h1>
      <p>
        Streckenauswertung bietet eine visuelle Darstellung der Zeitdaten von Läufern und Radfahrern. 
        Durch Diagramme und Tabellen können Sie leicht die Leistung jedes Teilnehmers verfolgen und vergleichen. 
        Dies ermöglicht eine effektive Analyse und verbessert das Verständnis der Rennbedingungen.
      </p>
    </div>
        <input type="text" v-model="textInput" placeholder="Enter a number" class="input-field">
        <p class="error-text" v-if="isError">Bitte eine RaceID eingeben</p>
        <button class="start-button">START</button>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const textInput = ref('');
  let numberInput = ref(null);
  let isError = ref(false);

  
  watch(textInput, (newVal) => {
    let numberInput = ref<number | null>(null);
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
  width: 50%; /* Adjust this value to your liking */
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