<script setup lang="ts">

import { onMounted } from "vue"
import { useDomesticAnimalStore } from "@/stores/domesticAnimalStore"

import StatsCards from "@/components/dashboard/StatsCards.vue"

const animalStore = useDomesticAnimalStore()

onMounted(() => {
  animalStore.loadAnimals()
})

</script>

<template>

<div class="max-w-7xl mx-auto px-8 py-10">

<h1 class="text-3xl font-bold mb-10">
Admin Dashboard
</h1>

<StatsCards />

</div>

</template>
