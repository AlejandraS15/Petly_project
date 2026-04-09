<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

const props = defineProps<{
  pet: DomesticAnimalInterface;
}>();

const averageRating = computed<number>(() => {
  if (props.pet.reviews.length === 0) {
    return 0;
  }

  const totalRating = props.pet.reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / props.pet.reviews.length;
});

const roundedRating = computed<number>(() => Math.round(averageRating.value));
</script>

<template>
  <div>
    <h1 class="text-4xl mb-2">
      {{ pet.breed }}
    </h1>

    <p class="text-yellow-500 mb-2">
      <span v-for="index in 5" :key="index">{{ index <= roundedRating ? '★' : '☆' }}</span>
      {{ averageRating.toFixed(1) }}/5
    </p>

    <p class="text-sm underline mb-4">Country of Origin: {{ pet.countryOrigin }}</p>

    <p class="text-gray-600">
      {{ pet.description }}
    </p>
  </div>
</template>
