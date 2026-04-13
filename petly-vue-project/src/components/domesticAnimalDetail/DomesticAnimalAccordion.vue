<script setup lang="ts">
// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

defineProps<{
  domesticAnimal: DomesticAnimalInterface;
}>();
</script>

<template>
  <div class="space-y-6 mt-16">
    <details class="border-b pb-4">
      <summary class="cursor-pointer text-xl font-semibold">Behaviour</summary>

      <p class="mt-2 text-gray-600">
          {{ domesticAnimal.behaviours }}
      </p>
    </details>

    <details class="border-b pb-4">
      <summary class="cursor-pointer text-xl font-semibold">Common Disease</summary>

      <p class="mt-2 text-gray-600">
          {{ domesticAnimal.commonDisease }}
      </p>
    </details>

    <details class="border-b pb-4">
      <summary class="cursor-pointer text-xl font-semibold">History</summary>

      <p class="mt-2 text-gray-600">
          {{ domesticAnimal.history }}
      </p>
    </details>
  </div>
</template>
