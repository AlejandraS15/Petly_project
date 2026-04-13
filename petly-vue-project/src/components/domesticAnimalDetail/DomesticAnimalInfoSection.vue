<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

const props = defineProps<{
  domesticAnimal: DomesticAnimalInterface;
}>();

const averageRating = computed<number>(() => {
  if (props.domesticAnimal.reviews.length === 0) {
    return 0;
  }

  const totalRating = props.domesticAnimal.reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / props.domesticAnimal.reviews.length;
});

const roundedRating = computed<number>(() => Math.round(averageRating.value));
</script>

<template>
  <div>
    <h1 class="text-4xl mb-2">
      {{ domesticAnimal.breed }}
    </h1>

    <p class="text-yellow-500 mb-2">
      <span v-for="index in 5" :key="index">{{ index <= roundedRating ? '★' : '☆' }}</span>
      {{ averageRating.toFixed(1) }}/5
    </p>

    <p class="text-sm underline mb-4">Country of Origin: {{ domesticAnimal.countryOrigin }}</p>

    <p class="text-gray-600">
      {{ domesticAnimal.description }}
    </p>
  </div>
</template>
