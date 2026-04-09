<script setup lang="ts">
// External imports
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { storeToRefs } from 'pinia';

// Internal imports
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

Chart.register(CategoryScale, LinearScale, BarElement);

const animalStore = useDomesticAnimalStore();
const { animals } = storeToRefs(animalStore);

const animalsWithRating = computed(() => {
  return animals.value.map((animal) => {
    const avgRating =
      animal.reviews.length > 0
        ? animal.reviews.reduce((sum, r) => sum + r.rating, 0) / animal.reviews.length
        : 0;

    return {
      breed: animal.breed,
      rating: avgRating,
    };
  });
});

const topAnimals = computed(() => {
  return [...animalsWithRating.value].sort((a, b) => b.rating - a.rating).slice(0, 5);
});

const chartData = computed(() => ({
  labels: topAnimals.value.map((a) => a.breed),
  datasets: [
    {
      label: 'Average Rating',
      data: topAnimals.value.map((a) => a.rating),
      backgroundColor: '#6366f1',
    },
  ],
}));
</script>

<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-bold mb-4">Top Rated Animals</h3>

    <Bar :data="chartData" />
  </div>
</template>
