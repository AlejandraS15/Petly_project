<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'

import ReviewList from './ReviewList.vue'
import ReviewForm from './ReviewForm.vue'
import RatingChart from '@/components/dashboard/RatingChart.vue'

defineProps<{
  pet: DomesticAnimalInterface
}>()

const authStore = useAuthStore()
const showForm = ref(false)
</script>

<template>
  <section class="mt-20">

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">
        Rating & Reviews
      </h2>

      <button
        v-if="authStore.isAuthenticated"
        @click="showForm = true"
        class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
      >
        Write a Review
      </button>
    </div>

    <ReviewList :reviews="pet.reviews" />

    <ReviewForm
      v-if="showForm"
      :animalId="pet.id"
      @close="showForm = false"
    />

    <!-- reutilizamos el gráfico del dashboard -->
    <div class="mt-16">

        <RatingChart />

    </div>

  </section>
</template>