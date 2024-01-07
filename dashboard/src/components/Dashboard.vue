<template>
  <div class="info-container">
    <InfoBoxValue title="Info" />
    <InfoBoxPercentage title="Info2" />
  </div>
  <div>
    <h1>This is the Dashboard</h1>
  </div>

</template>

<script setup lang="ts">
import InfoBoxValue from './InfoBoxValue.vue';
import InfoBoxPercentage from './InfoBoxPercentage.vue';

// Add your script here
</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: flex-start;
  gap: 20px; /* Adjust the gap as needed */
}
</style>