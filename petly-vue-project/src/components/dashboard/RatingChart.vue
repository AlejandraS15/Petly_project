<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'
import { storeToRefs } from 'pinia'

Chart.register(CategoryScale, LinearScale, BarElement)

const animalStore = useDomesticAnimalStore()
const { animals } = storeToRefs(animalStore)

const topAnimals = computed(() => {
  return [...animals.value].sort((a, b) => b.rating - a.rating).slice(0, 5)
})

const chartData = computed(() => ({
  labels: topAnimals.value.map((a) => a.breed),

  datasets: [
    {
      label: 'Rating',
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
