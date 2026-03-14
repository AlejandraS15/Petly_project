// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'
import { seedDomesticAnimals } from '@/seeders/domesticAnimalSeeder'

const STORAGE_KEY = 'domesticAnimals'

export class DomesticAnimalService {
  static getDomesticAnimals(): DomesticAnimalInterface[] {
    const storedAnimals = localStorage.getItem(STORAGE_KEY)

    if (!storedAnimals) {
      const animals = seedDomesticAnimals()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animals))
      return animals
    }

    try {
      return JSON.parse(storedAnimals) as DomesticAnimalInterface[]
    } catch {
      const animals = seedDomesticAnimals()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animals))
      return animals
    }
  }

  static filterByCategory(
    animals: DomesticAnimalInterface[],
    categoryId: string,
  ): DomesticAnimalInterface[] {
    return animals.filter((animal) => animal.category.id === categoryId)
  }

  static searchAnimals(
    animals: DomesticAnimalInterface[],
    query: string,
  ): DomesticAnimalInterface[] {
    const normalizedQuery = query.toLowerCase()

    return animals.filter((animal) => animal.breed.toLowerCase().includes(normalizedQuery))
  }
}
