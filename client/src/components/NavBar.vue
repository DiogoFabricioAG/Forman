<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Detectar si estamos en la página de autenticación
const isAuthPage = computed(() => route.name === 'AuthView')
</script>

<template>
  <nav
    class="bg-white flex justify-between w-full shadow-lg shadow-white/30 text-black px-4 py-2 fixed top-0 left-0 right-0 z-50"
  >
    <routerLink :to="{ name: 'LandingView' }" class="flex gap-3 items-center cursor-pointer">
      <img class="w-10" src="@/assets/forman-icon.svg" alt="" />
      <h1 class="text-5xl font-bold">Forman</h1>
    </routerLink>

    <!-- Solo mostrar botones de auth si NO estamos en AuthView -->
    <div v-if="!isAuthPage" class="h-full p-3 gap-2 flex items-center text-xl">
      <routerLink
        :to="{ name: 'AuthView', query: { authenticated: 'true' } }"
        class="hover:text-yellow-300 cursor-pointer duration-150"
        >Login</routerLink
      >
      <router-link
        :to="{ name: 'AuthView', query: { authenticated: 'false' } }"
        class="p-2 bg-yellow-200 hover:bg-yellow-300 cursor-pointer duration-150 font-light"
      >
        Sign Up
      </router-link>
    </div>
  </nav>
</template>
