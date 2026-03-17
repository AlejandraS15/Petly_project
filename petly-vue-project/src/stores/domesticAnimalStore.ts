import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'
import { DomesticAnimalService } from '@/services/domesticAnimalService'
import type { ReviewInterface } from '@/interfaces/reviewInterface'
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

  function getAnimalById(id: string) {
    return animals.value.find((animal) => animal.id === id)
  }

  function addReview(animalId: string, review: ReviewInterface): void {
    const animal = animals.value.find((a) => a.id === animalId)

    if (!animal) return

    animal.reviews.push(review)

    localStorage.setItem('domesticAnimals', JSON.stringify(animals.value))
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
    addReview,
  }
})
