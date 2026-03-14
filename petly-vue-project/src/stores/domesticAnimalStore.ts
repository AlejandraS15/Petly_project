import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'
import { DomesticAnimalService } from '@/services/domesticAnimalService'
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
  }
})
