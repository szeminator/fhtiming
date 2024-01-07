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
    <h3 class="text-lg font-semibold title">Info fadsf sasf asdf asdf adfas  fasddf dasdfadsf sasf asdf asdf adfas   f</h3>
    <p class="content">Info 2</p>
  </div>
  </template>
  
  <style scoped>
  .infobox {
    display: flex;
    flex-direction: column;
    width: 188px;
    min-height: 108px; /* Minimum height */
    padding: 3px 9px 9px 9px; /* Increased padding for the box */
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
  }
  
  .content {
    margin-top: auto; /* Added to push content to the bottom */
    margin-bottom: 0px;
    align-self: flex-end;
    color: var(--Gray-scale-1, #747070);
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
  </style>
    