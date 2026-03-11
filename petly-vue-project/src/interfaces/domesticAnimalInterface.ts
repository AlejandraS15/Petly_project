// Internal imports
import type { CategoryInterface } from '@/interfaces/categoryInterface'
import type { ReviewInterface } from '@/interfaces/reviewInterface'

export interface DomesticAnimalInterface {
  id: string
  breed: string
  description: string
  lifeExpectancy: string
  weight: string
  height: string
  behaviours: string
  commonDisease: string
  countryOrigin: string
  history: string
  image: string
  category: CategoryInterface
  reviews: ReviewInterface[]
}