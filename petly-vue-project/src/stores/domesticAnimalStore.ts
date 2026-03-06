// External imports
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'
import { DomesticAnimalService } from '@/services/domesticAnimalService'
import { useCategoryStore } from '@/stores/categoryStore'

export const useDomesticAnimalStore = defineStore('domesticAnimal', () => {

  // Stores
  const categoryStore = useCategoryStore()

  // State
  const animals = ref<DomesticAnimalInterface[]>([])
  const searchQuery = ref<string>('')

  // Actions
  function loadAnimals(): void {
    animals.value = DomesticAnimalService.getDomesticAnimals()
  }

  function setSearch(query: string): void {
    searchQuery.value = query
  }

  // Computed
  const filteredAnimals = computed((): DomesticAnimalInterface[] => {

    return animals.value.filter(animal => {

      const matchesCategory =
        !categoryStore.selectedCategoryId ||
        animal.category.id === categoryStore.selectedCategoryId

      const matchesSearch =
        animal.breed
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())

      return matchesCategory && matchesSearch
    })

  })

  // Exports
  return {
    animals,
    searchQuery,
    filteredAnimals,
    loadAnimals,
    setSearch
  }

})