import { ref } from "vue"
import { defineStore } from "pinia"

import type { ReviewInterface } from "@/interfaces/reviewInterface"
import { ReviewService } from "@/services/reviewService"

export const useReviewStore = defineStore("review", () => {

  const reviews = ref<ReviewInterface[]>([])

  function loadReviews(): void {
    reviews.value = ReviewService.getReviews()
  }

  function getReviewsByAnimal(animalId: string): ReviewInterface[] {

    return reviews.value.filter(
      review => review.domesticAnimalId === animalId
    )

  }

  function getAverageRating(animalId: string): number {

    const animalReviews = getReviewsByAnimal(animalId)

    if (animalReviews.length === 0) return 0

    const total = animalReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    )

    return total / animalReviews.length

  }

  return {
    reviews,
    loadReviews,
    getReviewsByAnimal,
    getAverageRating
  }

})
