<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'

const animalStore = useDomesticAnimalStore()
const { animals } = storeToRefs(animalStore)

const totalAnimals = computed(() => animals.value.length)

const animalsByCategory = computed(() => {
  const counts: Record<string, number> = {}

  animals.value.forEach((animal) => {
    const category = animal.category?.species ?? 'Unknown'

    if (!counts[category]) {
      counts[category] = 0
    }

    counts[category]++
  })

  return counts
})
</script>

<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="bg-white shadow rounded-xl p-6">
      <p class="text-gray-500 text-sm">Total Animals</p>

      <p class="text-3xl font-bold mt-2">
        {{ totalAnimals }}
      </p>
    </div>

    <div
      v-for="(count, category) in animalsByCategory"
      :key="category"
      class="bg-white shadow rounded-xl p-6"
    >
      <p class="text-gray-500 text-sm">
        {{ category }}
      </p>

      <p class="text-3xl font-bold mt-2">
        {{ count }}
      </p>
    </div>
  </div>
</template>
