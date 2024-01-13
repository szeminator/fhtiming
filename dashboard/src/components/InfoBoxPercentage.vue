<script setup lang="ts">

/* interface Props {
  title: string,
  content: string,
}
const { 
  title, 
  content 
    }= defineProps<Props>() */

</script>

<template>
  <div class="infobox">
    <img src="/config.svg" alt="Config" class="config-icon" />
    <h3 class="text-lg font-semibold title">Läufer 1. Percentile</h3>
    <p class="content">5%</p>
  </div>
 </template>
  
  <style scoped>
  .infobox {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 188px;
    min-height: 108px; /* Minimum height */
    padding: 9px; /* Increased padding for the box */
    align-items: flex-start;
    gap: 10px;
    border-radius: 5px;
    border: 2px solid var(--Bright-Cape-colors-BC-Blue, #417DA8);
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.30);
  }
  
  .title {
    align-self: flex-start;
    margin: 0px;
    text-align: left;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }
  
  .content {
    margin-top: auto; /* Added to push content to the bottom */
    margin-bottom: 0px;
    align-self: flex-end;
    color: #76C657;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.14px;
    text-align: right;
  }
  
  .title, .content {
    padding: 2px;
    width: 100%;
    box-sizing: border-box;
  }

  .config-icon {
    position: absolute;
    top: -15px; 
    right: -15px;
    background-color: #76C657;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
  }
  </style>