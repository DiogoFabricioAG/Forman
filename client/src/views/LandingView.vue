<script setup lang="ts">
import LandingBox from '@/components/LandingBox.vue'
</script>

<template>
  <main class="mt-16 w-4/5 mx-auto text-center">
    <section class="mb-16">
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
    </section>

    <section class="mb-16 mt-2">
      <div class="flex items-center gap-4">
        <div>
          <h3 class="text-2xl mt-8 font-bold">¿Qué es Forman?</h3>
          <p class="mt-4 text-sm">
            Forman es una plataforma innovadora que utiliza inteligencia artificial para ayudarte a
            rediseñar y transformar tus textos en ideas más claras y efectivas.
          </p>
        </div>
        <div>
          <img src="@/assets/penguin.png" alt="penguin" class="hover:-translate-x-5 duration-150" />
        </div>
      </div>
    </section>
  </main>
</template>
