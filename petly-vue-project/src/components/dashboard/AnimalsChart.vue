<script setup lang="ts">
// External imports
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js'
import { storeToRefs } from 'pinia'

// Internal imports
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'

Chart.register(ArcElement, Tooltip, Legend)

const animalStore = useDomesticAnimalStore()
const { animals } = storeToRefs(animalStore)

const chartData = computed(() => {
  const categories: Record<string, number> = {}

  animals.value.forEach((a) => {
    const cat = a.category.species

    if (!categories[cat]) categories[cat] = 0

    categories[cat]++
  })

  return {
    labels: Object.keys(categories),

    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'],
      },
    ],
  }
})
</script>

<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-bold mb-4">Animals by Category</h3>

    <Pie :data="chartData" />
  </div>
</template>
