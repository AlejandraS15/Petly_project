// Autor: Nombre Apellido

// Internal imports
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO'
import type { CreateReviewDTO } from '@/dtos/review/CreateReviewDTO'
import type { UpdateDomesticAnimalDTO } from '@/dtos/animal/UpdateDomesticAnimalDTO'
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface'
import type { ReviewInterface } from '@/interfaces/ReviewInterface'
import { seedDomesticAnimals } from '@/seeders/domesticAnimalSeeder'
import { CategoryService } from '@/services/CategoryService'

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

  static createAnimal(dto: CreateDomesticAnimalDTO): DomesticAnimalInterface | null {
    const categories = CategoryService.getCategories()
    const category = categories.find((c) => c.id === dto.categoryId)

    if (!category) {
      return null
    }

    const newAnimal: DomesticAnimalInterface = {
      id: crypto.randomUUID(),
      breed: dto.breed.trim(),
      description: dto.description.trim(),
      lifeExpectancy: dto.lifeExpectancy.trim(),
      weight: dto.weight.trim(),
      height: dto.height.trim(),
      behaviours: dto.behaviours.trim(),
      commonDisease: dto.commonDisease.trim(),
      countryOrigin: dto.countryOrigin.trim(),
      history: dto.history.trim(),
      image: dto.image.trim(),
      category,
      reviews: [],
    }

    const animals = this.getDomesticAnimals()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...animals, newAnimal]))

    return newAnimal
  }

  static updateAnimal(id: string, dto: UpdateDomesticAnimalDTO): DomesticAnimalInterface | null {
    const categories = CategoryService.getCategories()
    const category = categories.find((c) => c.id === dto.categoryId)

    if (!category) {
      return null
    }

    const animals = this.getDomesticAnimals()
    const existing = animals.find((a) => a.id === id)

    if (!existing) {
      return null
    }

    const updatedAnimal: DomesticAnimalInterface = {
      ...existing,
      breed: dto.breed.trim(),
      description: dto.description.trim(),
      lifeExpectancy: dto.lifeExpectancy.trim(),
      weight: dto.weight.trim(),
      height: dto.height.trim(),
      behaviours: dto.behaviours.trim(),
      commonDisease: dto.commonDisease.trim(),
      countryOrigin: dto.countryOrigin.trim(),
      history: dto.history.trim(),
      image: dto.image.trim(),
      category,
    }

    const updatedAnimals = animals.map((a) => (a.id === id ? updatedAnimal : a))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnimals))

    return updatedAnimal
  }

  static deleteAnimal(id: string): boolean {
    const animals = this.getDomesticAnimals()
    const filtered = animals.filter((a) => a.id !== id)

    if (filtered.length === animals.length) {
      return false
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))

    return true
  }

  static addReview(animalId: string, dto: CreateReviewDTO): ReviewInterface | null {
    const animals = this.getDomesticAnimals()
    const animal = animals.find((a) => a.id === animalId)

    if (!animal) {
      return null
    }

    const newReview: ReviewInterface = {
      id: crypto.randomUUID(),
      ...dto,
    }

    animal.reviews.push(newReview)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animals))

    return newReview
  }
}
