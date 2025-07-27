<script setup lang="ts">
import LandingBox from '@/components/LandingBox.vue'
</script>

<template>
  <main class="mt-16 w-4/5 mx-auto text-center">
    <div name="landing-content" class="flex flex-col gap-4 items-center">
      <h2 class="text-7xl">Bienvenido a <span class="text-yellow-300 font-bold">Forman</span></h2>
      <div>
        <p class="text-xl">La plataforma que rediseña tus textos</p>
        <p class="text-xl">Y los transforma en tus ideas</p>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-6 mt-8">
      <LandingBox msg="Empieza a crear" img-src="seed" />
      <LandingBox msg="Rediseña tus ideas" img-src="brain" />
      <LandingBox msg="Resultados sorprendentes" img-src="tree" />
    </div>
  </main>
</template>
