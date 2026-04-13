<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

const props = defineProps<{
  domesticAnimal: DomesticAnimalInterface;
}>();

const sizeLabel = computed<string>(() => {
  const weightMatches = props.domesticAnimal.weight.match(/\d+(?:\.\d+)?/g);

  if (!weightMatches || weightMatches.length === 0) {
    return 'Unknown';
  }

  const numericWeights = weightMatches.map((value) => Number(value));
  const averageWeight =
    numericWeights.reduce((accumulator, current) => accumulator + current, 0) /
    numericWeights.length;

  if (averageWeight < 5) {
    return 'Small';
  }

  if (averageWeight <= 20) {
    return 'Medium';
  }

  return 'Large';
});
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
      <div class="p-3">{{ domesticAnimal.lifeExpectancy }}</div>
      <div class="p-3">{{ domesticAnimal.weight }}</div>
      <div class="p-3">{{ domesticAnimal.height }}</div>
      <div class="p-3">{{ sizeLabel }}</div>
    </div>
  </div>
</template>
