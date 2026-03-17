<script setup lang="ts">
import type { ReviewInterface } from '@/interfaces/reviewInterface'
import ReviewCard from './ReviewCard.vue'

defineProps<{
  reviews: ReviewInterface[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

    <ReviewCard
      v-for="review in reviews"
      :key="review.id"
      :review="review"
    />

  </div>
</template>