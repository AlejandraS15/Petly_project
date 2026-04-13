// External imports
import { storeToRefs } from 'pinia';

// Internal imports
import { AuthService } from '@/services/AuthService';
import { CategoryService } from '@/services/CategoryService';
import { useCategoryStore } from '@/stores/categoryStore';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

export class HomeService {
  static useHomeViewModel() {
    const categoryStore = useCategoryStore();
    const animalStore = useDomesticAnimalStore();

    const { categories, selectedCategoryId } = storeToRefs(categoryStore);
    const { filteredAnimals } = storeToRefs(animalStore);

    function handleCategorySelect(id: string): void {
      CategoryService.selectCategory(id);
    }

    function initialize(): void {
      AuthService.initializeAuthStore();

      CategoryService.getCategories();

      if (animalStore.animals.length === 0) {
        animalStore.loadAnimals();
      }
    }

    return {
      categories,
      selectedCategoryId,
      filteredAnimals,
      handleCategorySelect,
      initialize,
    };
  }
}