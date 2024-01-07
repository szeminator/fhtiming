<script setup lang="ts">
import FHTimingFooter from './components/FHTimingFooter.vue'
import InfoBox from './components/InfoBox.vue';
import StartDialog from './components/StartDialog.vue'
</script>

<template>
  <StartDialog name="StartDialog" />
  <div class="container">
    <FHTimingFooter name="FHTimingFooter" />
  </div>
  <InfoBox name="InfoBox" />
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.container {
    padding-top: 50px;
  }

</style>
