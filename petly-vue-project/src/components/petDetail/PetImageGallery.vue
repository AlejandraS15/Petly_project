<script setup lang="ts">
// Internal imports
import defaultImage from '@/assets/default.jpg'
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface'

defineProps<{
  pet: DomesticAnimalInterface
}>()

function handleImageError(event: Event): void {
  const imageElement = event.target as HTMLImageElement

  if (imageElement.src !== defaultImage) {
    imageElement.src = defaultImage
  }
}
</script>

<template>
  <div class="grid grid-cols-[100px_1fr] gap-4">
    <div class="flex flex-col gap-4">
      <img
        v-for="n in 3"
        :key="n"
        :src="pet.image"
        class="rounded-xl object-cover h-24 cursor-pointer"
        @error="handleImageError"
      />
    </div>

    <img
      :src="pet.image"
      class="rounded-2xl object-contain bg-gray-100 p-4"
      @error="handleImageError"
    />
  </div>
</template>
