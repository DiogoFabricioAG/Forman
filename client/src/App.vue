<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <!-- Padding top para compensar el navbar fijo (altura aproximada del navbar) -->
  <div class="pt-20">
    <RouterView />
  </div>
</template>
