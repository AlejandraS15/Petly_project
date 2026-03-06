// External imports
import { ref } from 'vue'
import { defineStore } from 'pinia'

// Internal imports
import type { CategoryInterface } from '@/interfaces/categoryInterface'
import { CategoryService } from '@/services/categoryService'

export const useCategoryStore = defineStore('category', () => {

  // Reactive Variables
  const categories = ref<CategoryInterface[]>([])
  const selectedCategoryId = ref<string | null>(null)

  // Selectors
  function getSelectedCategory(): CategoryInterface | undefined {
    return categories.value.find(
      category => category.id === selectedCategoryId.value
    )
  }

  // Actions
  function loadCategories(): void {
    categories.value = CategoryService.getCategories()
  }

  function selectCategory(categoryId: string): void {
    selectedCategoryId.value = categoryId
  }

  return {
    categories,
    selectedCategoryId,
    loadCategories,
    selectCategory,
    getSelectedCategory
  }

})