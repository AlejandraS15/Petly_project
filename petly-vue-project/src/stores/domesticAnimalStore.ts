// External imports
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// Internal imports
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO'
import type { CreateReviewDTO } from '@/dtos/review/CreateReviewDTO'
import type { UpdateDomesticAnimalDTO } from '@/dtos/animal/UpdateDomesticAnimalDTO'
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface'
import { DomesticAnimalService } from '@/services/DomesticAnimalService'
import { useCategoryStore } from '@/stores/categoryStore'

export const useDomesticAnimalStore = defineStore('domesticAnimal', () => {
  const categoryStore = useCategoryStore()

  const animals = ref<DomesticAnimalInterface[]>([])
  const searchQuery = ref<string>('')

  function loadAnimals(): void {
    animals.value = DomesticAnimalService.getDomesticAnimals()
  }

  function setSearch(query: string): void {
    searchQuery.value = query
  }

  function getAnimalById(id: string): DomesticAnimalInterface | undefined {
    return animals.value.find((animal) => animal.id === id)
  }

  function createAnimal(dto: CreateDomesticAnimalDTO): DomesticAnimalInterface | null {
    const created = DomesticAnimalService.createAnimal(dto)

    if (created) {
      animals.value = [...animals.value, created]
    }

    return created
  }

  function updateAnimal(id: string, dto: UpdateDomesticAnimalDTO): DomesticAnimalInterface | null {
    const updated = DomesticAnimalService.updateAnimal(id, dto)

    if (updated) {
      animals.value = animals.value.map((a) => (a.id === id ? updated : a))
    }

    return updated
  }

  function deleteAnimal(id: string): boolean {
    const success = DomesticAnimalService.deleteAnimal(id)

    if (success) {
      animals.value = animals.value.filter((a) => a.id !== id)
    }

    return success
  }
  function addReview(animalId: string, dto: CreateReviewDTO): void {
    const added = DomesticAnimalService.addReview(animalId, dto)

    if (!added) return

    const animal = animals.value.find((a) => a.id === animalId)

    if (animal) {
      animal.reviews.push(added)
    }
  }

  function getReviewsByAnimal(animalId: string): DomesticAnimalInterface['reviews'] {
    const animal = animals.value.find((currentAnimal) => currentAnimal.id === animalId)
    return animal ? animal.reviews : []
  }

  function getAverageRating(animalId: string): number {
    const reviews = getReviewsByAnimal(animalId)

    if (reviews.length === 0) {
      return 0
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return totalRating / reviews.length
  }

  const filteredAnimals = computed(() => {
    return animals.value.filter((animal) => {
      const matchesCategory =
        categoryStore.selectedCategoryId === 'all' ||
        animal.category.id === categoryStore.selectedCategoryId

      const matchesSearch = animal.breed.toLowerCase().includes(searchQuery.value.toLowerCase())

      return matchesCategory && matchesSearch
    })
  })

  return {
    animals,
    searchQuery,
    filteredAnimals,
    loadAnimals,
    setSearch,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    addReview,
    getReviewsByAnimal,
    getAverageRating,
  }
})
