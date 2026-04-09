// Autor: Nombre Apellido

// Internal imports
import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import { seedCategories } from '@/seeders/categorySeeder';

const STORAGE_KEY = 'categories';

export class CategoryService {
  static getCategories(): CategoryInterface[] {
    const storedCategories = localStorage.getItem(STORAGE_KEY);

    if (!storedCategories) {
      const categories = seedCategories();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
      return categories;
    }

    return JSON.parse(storedCategories) as CategoryInterface[];
  }
}
