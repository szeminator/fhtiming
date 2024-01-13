<template>
  <nav class="navbar">
    <router-link to="/">
    <img src="/logo.png" alt="FH-Timing Icon" class="navbar-icon" /></router-link>
    <router-link to="/" class="nav-link">Home</router-link> | 
    <router-link to="/dashboard" class="nav-link">Dashboard</router-link> | 
    <router-link to="/graph" class="nav-link">Graph</router-link> | 
    <router-link to="/table" class="nav-link">Tabelle</router-link> | 
    <router-link to="/impressum" class="nav-link">Impressum</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;  
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  z-index: 1010;
  text-align: left;
}

.navbar-icon {
  height: 5%;
  width: 5%;
  margin-right: 10px;
}

.nav-link {
  color: #000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.nav-link:hover {
  color: #76C657; /* Change the color on hover */
}

.router-link-active {
  font-weight: bold;
}
</style>