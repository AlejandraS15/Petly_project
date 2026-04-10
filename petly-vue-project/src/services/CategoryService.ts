// Autor: Nombre Apellido

// Internal imports
import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import { useCategoryStore } from '@/stores/categoryStore';

export class CategoryService {
  static getCategories(): CategoryInterface[] {
    const categoryStore = useCategoryStore();

    if (categoryStore.categories.length === 0) {
      categoryStore.loadCategories();
    }

    return categoryStore.categories;
  }

  static getCategoryById(id: string): CategoryInterface | undefined {
    return this.getCategories().find((category) => category.id === id);
  }
}
