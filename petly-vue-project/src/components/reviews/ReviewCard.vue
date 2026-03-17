<script setup lang="ts">
// Internal imports
import type { ReviewInterface } from '@/interfaces/ReviewInterface'
import StarRating from '@/components/reviews/StarRating.vue'

defineProps<{
  review: ReviewInterface
}>()
</script>

<template>
  <div class="border rounded-xl p-4 bg-white shadow-sm">
    <StarRating :rating="review.rating" />

    <p class="mt-2 text-gray-700">
      {{ review.comment }}
    </p>

    <p class="text-sm text-gray-400 mt-2">
      Posted on {{ new Date(review.postDate).toLocaleDateString() }}
    </p>
  </div>
</template>
