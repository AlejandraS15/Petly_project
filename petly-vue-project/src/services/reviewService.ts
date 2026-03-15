// Internal imports
import type { ReviewInterface } from "@/interfaces/reviewInterface"
import { seedReviews } from "@/seeders/reviewSeeder"

const STORAGE_KEY = "reviews"

export class ReviewService {

  static getReviews(): ReviewInterface[] {

    const storedReviews = localStorage.getItem(STORAGE_KEY)

    // Si no existen reviews, se cargan del seeder
    if (!storedReviews) {

      const reviews = seedReviews()

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reviews)
      )

      return reviews
    }

    return JSON.parse(storedReviews) as ReviewInterface[]

  }

}
