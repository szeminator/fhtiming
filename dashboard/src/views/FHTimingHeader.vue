<template>
   <nav class="navbar">
    <router-link to="/" class="logo-link">
      <img src="/logo.png" alt="FH-Timing Icon" class="navbar-icon" />
    </router-link>
    <div class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link> | 
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link> | 
      <router-link to="/graph" class="nav-link">Graph</router-link> | 
      <router-link to="/table" class="nav-link">Tabelle</router-link> | 
      <router-link to="/impressum" class="nav-link">Impressum</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 10px 20px 10px 0px; /* Adjusted padding for vertical centering */
  background-color: white; /* Changed background color */
  border-bottom: 1px solid #d3d3d3; /* Greyish border at the bottom */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Slight shadow for depth */
  z-index: 1010;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px; /* Padding from the left side of the screen */
}

.nav-links {
display: flex;
align-items: center;
justify-content: flex-start;
}

.navbar-icon {
height: auto; 
width: 30%; 
} 

.nav-link {
color: #000;
text-shadow: none;
font-family: 'Open Sans', sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 24px;
padding: 0 10px;
text-decoration: none;
}

.nav-link:hover {
color: #76C657; /* Change the color on hover */
}

.router-link-active {
font-weight: bold;
color: #76C657; /* Optional: Make active link the same color as hover state */
}
</style>