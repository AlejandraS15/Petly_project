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

  function saveCategories(currentCategories: CategoryInterface[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentCategories));
  }

  // Actions
  function loadCategories(): void {
    const storedCategories = localStorage.getItem(STORAGE_KEY);

    if (!storedCategories) {
      const seededCategories = seedCategories();
      categories.value = seededCategories;
      saveCategories(seededCategories);
      return;
    }

    try {
      categories.value = JSON.parse(storedCategories) as CategoryInterface[];
    } catch {
      const seededCategories = seedCategories();
      categories.value = seededCategories;
      saveCategories(seededCategories);
    }
  }

  function selectCategory(categoryId: string): void {
    selectedCategoryId.value = categoryId;
  }

  return {
    categories,
    selectedCategoryId,
    loadCategories,
    selectCategory,
    getSelectedCategory,
  };
});
