// External imports
import { ref } from 'vue';
import { defineStore } from 'pinia';

// Internal imports
import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import { seedCategories } from '@/seeders/categorySeeder';

const STORAGE_KEY = 'categories';

export const useCategoryStore = defineStore('category', () => {
  // Reactive Variables
  const categories = ref<CategoryInterface[]>([]);
  const selectedCategoryId = ref<string>('all');

  // Selectors
  function getSelectedCategory(): CategoryInterface | undefined {
    return categories.value.find((category) => category.id === selectedCategoryId.value);
  }

  function setCategories(nextCategories: CategoryInterface[]): void {
    categories.value = nextCategories;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCategories));
  }

  function setSelectedCategory(categoryId: string): void {
    selectedCategoryId.value = categoryId;
  }

  function resetCategoryState(): void {
    categories.value = [];
    selectedCategoryId.value = 'all';
  }

  function initializeCategories(): void {
    const storedCategories = localStorage.getItem(STORAGE_KEY);

    if (!storedCategories) {
      setCategories(seedCategories());
      return;
    }

    try {
      categories.value = JSON.parse(storedCategories) as CategoryInterface[];
    } catch {
      setCategories(seedCategories());
    }
  }

  return {
    categories,
    selectedCategoryId,
    setCategories,
    setSelectedCategory,
    resetCategoryState,
    initializeCategories,
    getSelectedCategory,
  };
});
