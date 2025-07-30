<script setup lang="ts">
defineProps<{
  msg: string
  imgSrc?: string
}>()
</script>

<template>
  <div
    class="border-2 border-yellow-300 shadow-lg shadow-white/20 p-2 cursor-pointer hover:rotate-2 hover:scale-105 duration-150"
  >
    <div class="border border-gray-300 pb-2">
      <img
        v-if="imgSrc === 'seed'"
        class="size-[300px] w-full object-cover"
        src="@/assets/seed-pros.png"
        alt="Black and white Img"
      />
      <img
        v-else-if="imgSrc === 'brain'"
        class="size-[300px] w-full object-cover"
        src="@/assets/brain-pros.png"
        alt="Black and white Img"
      />
      <img
        v-else-if="imgSrc === 'tree'"
        class="size-[300px] w-full object-cover"
        src="@/assets/tree-pros.png"
        alt="Black and white Img"
      />
      <h1 class="text-2xl font-bold">{{ msg }}</h1>
    </div>
  </div>
</template>
