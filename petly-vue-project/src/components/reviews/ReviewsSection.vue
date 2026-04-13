<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import ReviewForm from '@/components/reviews/ReviewForm.vue';
import ReviewList from '@/components/reviews/ReviewList.vue';
import { useAuthStore } from '@/stores/authStore';

defineProps<{
  domesticAnimal: DomesticAnimalInterface;
}>();

const authStore = useAuthStore();
const showForm = ref<boolean>(false);
</script>

<template>
  <section class="mt-20">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Rating & Reviews</h2>

      <button
        v-if="authStore.isAuthenticated"
        @click="showForm = true"
        class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
      >
        Write a Review
      </button>
    </div>

    <ReviewList :reviews="domesticAnimal.reviews" />

    <ReviewForm v-if="showForm" :animalId="domesticAnimal.id" @close="showForm = false" />
  </section>
</template>
