<template>
  <nav class="bg-white flex justify-between w-full shadow-lg shadow-white/30 text-black px-4 py-2">
    <routerLink :to="{ name: 'LandingView' }" class="flex gap-3 items-center cursor-pointer">
      <img class="w-10" src="@/assets/forman-icon.svg" alt="" />
      <h1 class="text-5xl font-bold">Forman</h1>
    </routerLink>
    <div class="h-full p-3 gap-2 flex items-center text-xl">
      <button class="hover:text-yellow-300 cursor-pointer duration-150">Login</button>
      <button class="p-2 bg-yellow-200 hover:bg-yellow-300 cursor-pointer duration-150 font-light">
        Sign Up
      </button>
    </div>
  </nav>
</template>
