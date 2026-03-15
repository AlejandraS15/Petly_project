<script setup lang="ts">
/**
 * PetAccordion.vue
 * Sección expandible de información
 */

import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'

defineProps<{
  pet: DomesticAnimalInterface
}>()
</script>

<template>
  <div class="space-y-6 mt-16">
    <details class="border-b pb-4">
      <summary class="cursor-pointer text-xl font-semibold">Behaviour</summary>

      <p class="mt-2 text-gray-600">
        {{ pet.behaviours }}
      </p>
    </details>

    <details class="border-b pb-4">
      <summary class="cursor-pointer text-xl font-semibold">Common Disease</summary>

      <p class="mt-2 text-gray-600">
        {{ pet.commonDisease }}
      </p>
    </details>

    <details class="border-b pb-4">
      <summary class="cursor-pointer text-xl font-semibold">History</summary>

      <p class="mt-2 text-gray-600">
        {{ pet.history }}
      </p>
    </details>
  </div>
</template>
