<script setup lang="ts">
// External imports
import { onMounted } from 'vue'

// Internal imports
import AnimalsMap from '@/components/dashboard/AnimalsMap.vue'
import RatingChart from '@/components/dashboard/RatingChart.vue'
import StatsCards from '@/components/dashboard/StatsCards.vue'
import UsersTable from '@/components/dashboard/UsersTable.vue'
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'

const animalStore = useDomesticAnimalStore()

onMounted(() => {
  animalStore.loadAnimals()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-10">
    <h1 class="text-3xl font-bold mb-10">Admin Dashboard</h1>

    <!-- Stats -->
    <StatsCards />

    <!-- Charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
      <RatingChart />
    </div>

    <!-- Map -->
    <div class="mt-10">
      <AnimalsMap />
    </div>

    <div class="mt-10">
      <UsersTable />
    </div>
  </div>
</template>
