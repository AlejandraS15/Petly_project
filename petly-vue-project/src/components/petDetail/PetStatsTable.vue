<script setup lang="ts">
/**
 * PetStatsTable.vue
 * Tabla de información del animal
 */

import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'

defineProps<{
  pet: DomesticAnimalInterface
}>()
</script>

<template>
  <div class="border rounded-xl overflow-hidden mt-6">
    <div class="grid grid-cols-4 text-center font-semibold category-header">
      <div class="p-3">Life Expectancy</div>
      <div class="p-3">Weight</div>
      <div class="p-3">Height</div>
      <div class="p-3">Size</div>
    </div>

    <div class="grid grid-cols-4 text-center border-t">
      <div class="p-3">{{ pet.lifeExpectancy }}</div>
      <div class="p-3">{{ pet.weight }}</div>
      <div class="p-3">{{ pet.height }}</div>
      <div class="p-3">Small</div>
    </div>
  </div>
</template>
