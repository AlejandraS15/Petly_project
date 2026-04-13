// External imports
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import { useCategoryStore } from '@/stores/categoryStore';
import { seedDomesticAnimals } from '@/seeders/domesticAnimalSeeder';

const STORAGE_KEY = 'domesticAnimals';

export const useDomesticAnimalStore = defineStore('domesticAnimal', () => {
  const categoryStore = useCategoryStore();

  const animals = ref<DomesticAnimalInterface[]>([]);
  const searchQuery = ref<string>('');

  function saveAnimals(currentAnimals: DomesticAnimalInterface[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentAnimals));
  }

  function setAnimals(nextAnimals: DomesticAnimalInterface[]): void {
    animals.value = nextAnimals;
    saveAnimals(nextAnimals);
  }

  function initializeAnimals(): void {
    const storedAnimals = localStorage.getItem(STORAGE_KEY);

    if (!storedAnimals) {
      setAnimals(seedDomesticAnimals());
      return;
    }

    try {
      animals.value = JSON.parse(storedAnimals) as DomesticAnimalInterface[];
    } catch {
      setAnimals(seedDomesticAnimals());
    }
  }

  function loadAnimals(): void {
    initializeAnimals();
  }

  function setSearch(query: string): void {
    searchQuery.value = query;
  }

  function getAnimalById(id: string): DomesticAnimalInterface | undefined {
    return animals.value.find((animal) => animal.id === id);
  }

  function getReviewsByAnimal(animalId: string): DomesticAnimalInterface['reviews'] {
    const animal = animals.value.find((currentAnimal) => currentAnimal.id === animalId);
    return animal ? animal.reviews : [];
  }

  function getAverageRating(animalId: string): number {
    const reviews = getReviewsByAnimal(animalId);

    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  const filteredAnimals = computed(() => {
    return animals.value.filter((animal) => {
      const matchesCategory =
        !categoryStore.selectedCategoryId ||
        categoryStore.selectedCategoryId === 'all' ||
        animal.category.id === categoryStore.selectedCategoryId;

      const matchesSearch = animal.breed.toLowerCase().includes(searchQuery.value.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  });

  return {
    animals,
    searchQuery,
    filteredAnimals,
    setAnimals,
    initializeAnimals,
    loadAnimals,
    setSearch,
    getAnimalById,
    getReviewsByAnimal,
    getAverageRating,
  };
});
