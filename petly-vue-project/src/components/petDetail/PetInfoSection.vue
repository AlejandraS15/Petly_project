<script setup lang="ts">
/**
 * PetInfoSection.vue
 * Información principal del animal
 */

import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'

defineProps<{
  pet: DomesticAnimalInterface
}>()
</script>

<template>
  <div>
    <h1 class="text-4xl mb-2">
      {{ pet.breed }}
    </h1>

    <p class="text-yellow-500 mb-2">⭐⭐⭐⭐⭐ 4.5/5</p>

    <p class="text-sm underline mb-4">Country of Origin: {{ pet.countryOrigin }}</p>

    <p class="text-gray-600">
      {{ pet.description }}
    </p>
  </div>
</template>
