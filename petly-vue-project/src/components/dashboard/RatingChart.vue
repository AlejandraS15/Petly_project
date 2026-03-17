<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { storeToRefs } from 'pinia'

import { useDomesticAnimalStore } from "@/stores/domesticAnimalStore"

Chart.register(CategoryScale, LinearScale, BarElement)

// Stores
const animalStore = useDomesticAnimalStore()
const { animals } = storeToRefs(animalStore)

// calcular promedio de rating por animal
const animalsWithRating = computed(() => {

  return animals.value.map(animal => {

    const avgRating =
      animal.reviews.length > 0
        ? animal.reviews.reduce((sum, r) => sum + r.rating, 0) /
          animal.reviews.length
        : 0

    return {
      breed: animal.breed,
      rating: avgRating
    }

  })

})

// Top animales según rating promedio
const topAnimals = computed(() => {

    return [...animalsWithRating.value]
    .sort((a,b)=> b.rating - a.rating)
    .slice(0,5)

})

// Datos del gráfico
const chartData = computed(() => ({
  labels: topAnimals.value.map((a) => a.breed),

  datasets: [
    {
      label: 'Average Rating',
      data: topAnimals.value.map((a) => a.rating),
      backgroundColor: '#6366f1',
    },
  ],
}))
</script>

<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-bold mb-4">Top Rated Animals</h3>

    <Bar :data="chartData" />
  </div>
</template>
