// External imports
import { storeToRefs } from 'pinia';

// Internal imports
import { useAuthStore } from '@/stores/authStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

export class HomeService {
  static useHomeViewModel() {
    const authStore = useAuthStore();
    const categoryStore = useCategoryStore();
    const animalStore = useDomesticAnimalStore();

    const { categories, selectedCategoryId } = storeToRefs(categoryStore);
    const { filteredAnimals } = storeToRefs(animalStore);

    function handleCategorySelect(id: string): void {
      categoryStore.selectCategory(id);
    }

    function initialize(): void {
      authStore.initializeAuth();

      if (categories.value.length === 0) {
        categoryStore.loadCategories();
      }

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