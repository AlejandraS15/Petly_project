// Autor: Alejandra Suarez
// Corrección: Alejandra Suarez

// Internal imports
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO';
import type { CreateReviewDTO } from '@/dtos/review/CreateReviewDTO';
import type { UpdateDomesticAnimalDTO } from '@/dtos/animal/UpdateDomesticAnimalDTO';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { CategoryService } from '@/services/CategoryService';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

export class DomesticAnimalService {
  static initializeAnimalsStore(): void {
    useDomesticAnimalStore().initializeAnimals();
  }

  static getAnimals(): DomesticAnimalInterface[] {
    const animalStore = useDomesticAnimalStore();

    if (!Array.isArray(animalStore.animals) || animalStore.animals.length === 0) {
      animalStore.initializeAnimals();
    }

    return Array.isArray(animalStore.animals) ? animalStore.animals : [];
  }

  static getAnimalById(id: string): DomesticAnimalInterface | undefined {
    return this.getAnimals().find((animal) => animal.id === id);
  }

  static setSearchQuery(query: string): void {
    useDomesticAnimalStore().setSearch(query);
  }

  static filterByCategory(
    animals: DomesticAnimalInterface[],
    categoryId: string,
  ): DomesticAnimalInterface[] {
    return animals.filter((animal) => animal.category.id === categoryId);
  }

  static searchAnimals(
    animals: DomesticAnimalInterface[],
    query: string,
  ): DomesticAnimalInterface[] {
    const normalizedQuery = query.toLowerCase();

    return animals.filter((animal) => animal.breed.toLowerCase().includes(normalizedQuery));
  }

  static createAnimal(dto: CreateDomesticAnimalDTO): DomesticAnimalInterface | null {
    const categories = CategoryService.getCategories();
    const category = categories.find((c) => c.id === dto.categoryId);

    if (!category) {
      return null;
    }

    const newAnimal: DomesticAnimalInterface = {
      id: crypto.randomUUID(),
      breed: dto.breed.trim(),
      description: dto.description.trim(),
      lifeExpectancy: dto.lifeExpectancy.trim(),
      weight: dto.weight.trim(),
      height: dto.height.trim(),
      behaviours: dto.behaviours.trim(),
      commonDisease: dto.commonDisease.trim(),
      countryOrigin: dto.countryOrigin.trim(),
      history: dto.history.trim(),
      image: dto.image.trim(),
      category,
      reviews: [],
    };

    return newAnimal;
  }

  static updateAnimal(
    id: string,
    dto: UpdateDomesticAnimalDTO,
    animals: DomesticAnimalInterface[],
  ): DomesticAnimalInterface | null {
    const categories = CategoryService.getCategories();
    const category = categories.find((c) => c.id === dto.categoryId);

    if (!category) {
      return null;
    }

    const existing = animals.find((a) => a.id === id);

    if (!existing) {
      return null;
    }

    const updatedAnimal: DomesticAnimalInterface = {
      ...existing,
      breed: dto.breed.trim(),
      description: dto.description.trim(),
      lifeExpectancy: dto.lifeExpectancy.trim(),
      weight: dto.weight.trim(),
      height: dto.height.trim(),
      behaviours: dto.behaviours.trim(),
      commonDisease: dto.commonDisease.trim(),
      countryOrigin: dto.countryOrigin.trim(),
      history: dto.history.trim(),
      image: dto.image.trim(),
      category,
    };

    return updatedAnimal;
  }

  static deleteAnimal(id: string, animals: DomesticAnimalInterface[]): boolean {
    const filtered = animals.filter((a) => a.id !== id);

    return filtered.length !== animals.length;
  }

  static addReview(
    animalId: string,
    dto: CreateReviewDTO,
    animals: DomesticAnimalInterface[],
  ): { review: ReviewInterface; updatedAnimals: DomesticAnimalInterface[] } | null {
    const animal = animals.find((a) => a.id === animalId);

    if (!animal) {
      return null;
    }

    const newReview: ReviewInterface = {
      id: crypto.randomUUID(),
      ...dto,
    };

    const updatedAnimals = animals.map((currentAnimal) =>
      currentAnimal.id === animalId
        ? {
            ...currentAnimal,
            reviews: [...currentAnimal.reviews, newReview],
          }
        : currentAnimal,
    );

    return {
      review: newReview,
      updatedAnimals,
    };
  }

  static createAnimalAndSync(dto: CreateDomesticAnimalDTO): DomesticAnimalInterface | null {
    const animalStore = useDomesticAnimalStore();
    const created = this.createAnimal(dto);

    if (!created) {
      return null;
    }

    animalStore.setAnimals([...animalStore.animals, created]);
    return created;
  }

  static updateAnimalAndSync(
    id: string,
    dto: UpdateDomesticAnimalDTO,
  ): DomesticAnimalInterface | null {
    const animalStore = useDomesticAnimalStore();
    const updated = this.updateAnimal(id, dto, animalStore.animals);

    if (!updated) {
      return null;
    }

    animalStore.setAnimals(animalStore.animals.map((animal) => (animal.id === id ? updated : animal)));
    return updated;
  }

  static deleteAnimalAndSync(id: string): boolean {
    const animalStore = useDomesticAnimalStore();
    const success = this.deleteAnimal(id, animalStore.animals);

    if (success) {
      animalStore.setAnimals(animalStore.animals.filter((animal) => animal.id !== id));
    }

    return success;
  }

  static addReviewAndSync(animalId: string, dto: CreateReviewDTO): ReviewInterface | null {
    const animalStore = useDomesticAnimalStore();
    const result = this.addReview(animalId, dto, animalStore.animals);

    if (!result) {
      return null;
    }

    animalStore.setAnimals(result.updatedAnimals);
    return result.review;
  }
}
