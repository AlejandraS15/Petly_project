<script setup lang="ts">
/**
 * PetImageGallery.vue
 * Galería de imágenes del animal
 */

import type { DomesticAnimalInterface } from "@/interfaces/domesticAnimalInterface"

defineProps<{
  pet: DomesticAnimalInterface
}>()
</script>

<template>
  <div class="grid grid-cols-[100px_1fr] gap-4">

    <div class="flex flex-col gap-4">

      <img
        v-for="n in 3"
        :key="n"
        :src="pet.image"
        class="rounded-xl object-cover h-24 cursor-pointer"
      />

    </div>

    <img
      :src="pet.image"
      class="rounded-2xl object-contain bg-gray-100 p-4"
    />

  </div>
</template>