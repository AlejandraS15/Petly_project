<script setup lang="ts">

// Vue
import { onMounted } from "vue"

// Stores
import { useDomesticAnimalStore } from "@/stores/domesticAnimalStore"
import { useReviewStore } from "@/stores/reviewStore"

// Components
import StatsCards from "@/components/dashboard/StatsCards.vue"
import RatingChart from "@/components/dashboard/RatingChart.vue"
import AnimalsMap from "@/components/dashboard/AnimalsMap.vue"

// Store instances
const animalStore = useDomesticAnimalStore()
const reviewStore = useReviewStore()

// Load data when dashboard loads
onMounted(() => {

  animalStore.loadAnimals()
  reviewStore.loadReviews()

})

</script>


<template>

<div class="max-w-7xl mx-auto px-8 py-10">

  <h1 class="text-3xl font-bold mb-10">
    Admin Dashboard
  </h1>

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

</div>

</template>
