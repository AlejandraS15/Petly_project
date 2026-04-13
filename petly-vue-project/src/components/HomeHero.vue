<script setup lang="ts">
/**
 * HomeHero.vue
 * Hero section del Home
 * Muestra introducción de la plataforma
 */
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-16">
    <!-- TEXTO -->
    <div>
      <h1 class="text-5xl font-black leading-tight">
        Discover DomesticAnimal Breeds
        <br />
        from Around the World
      </h1>

      <p class="mt-6 text-gray-500 max-w-md">
        Learn about different types of dogs, cats, and other domesticAnimals, their characteristics, origins,
        and unique personalities.
      </p>

      <button
        class="mt-8 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
      >
        Discover All
      </button>

      <!-- STATS -->
      <div class="flex gap-12 mt-12">
        <div>
          <p class="text-3xl font-bold">50+</p>
          <p class="text-gray-500 text-sm">Species</p>
        </div>

        <div>
          <p class="text-3xl font-bold">100+</p>
          <p class="text-gray-500 text-sm">Breeds</p>
        </div>

        <div>
          <p class="text-3xl font-bold">100+</p>
          <p class="text-gray-500 text-sm">Reviews</p>
        </div>
      </div>
    </div>

    <!-- IMAGEN -->
    <div class="flex justify-center">
      <img
        src="@/assets/domesticAnimal-hero.png"
        alt="DomesticAnimal illustration"
        class="max-h-[420px] object-contain"
      />
    </div>
  </section>
</template>
