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
        <button class="start-button">START</button>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const textInput = ref('');
  let numberInput = ref(null);
  
  watch(textInput, (newVal) => {
    let numberInput = ref<number | null>(null);
    if (!isNaN(Number(newVal))) {
        if (newVal) {
          numberInput.value = parseInt(newVal);
        } else {
           numberInput.value = null;
        }
    }
    console.log('numberInput changed to:', numberInput.value);
  });
  </script>
  
  <style scoped>
  .container {
    padding-bottom: 20px;
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