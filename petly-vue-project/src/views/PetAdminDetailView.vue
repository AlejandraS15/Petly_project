<!-- Autor: Nombre Apellido -->
<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal imports
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import { useCategoryStore } from '@/stores/categoryStore';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

import PetAccordion from '@/components/petDetail/PetAccordion.vue';
import PetForm from '@/components/petDetail/PetForm.vue';
import PetImageGallery from '@/components/petDetail/PetImageGallery.vue';
import PetInfoSection from '@/components/petDetail/PetInfoSection.vue';
import PetStatsTable from '@/components/petDetail/PetStatsTable.vue';

const route = useRoute();
const router = useRouter();
const animalStore = useDomesticAnimalStore();
const categoryStore = useCategoryStore();

const pet = ref<DomesticAnimalInterface | null>(null);
const isEditing = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const feedbackMessage = ref<string>('');

const editInitialValues = computed<Partial<CreateDomesticAnimalDTO>>(() => {
  if (!pet.value) return {};

  return {
    breed: pet.value.breed,
    description: pet.value.description,
    lifeExpectancy: pet.value.lifeExpectancy,
    weight: pet.value.weight,
    height: pet.value.height,
    behaviours: pet.value.behaviours,
    commonDisease: pet.value.commonDisease,
    countryOrigin: pet.value.countryOrigin,
    history: pet.value.history,
    image: pet.value.image,
    categoryId: pet.value.category.id,
  };
});

function startEditing(): void {
  feedbackMessage.value = '';
  isEditing.value = true;
}

function cancelEditing(): void {
  isEditing.value = false;
  feedbackMessage.value = '';
}

function handleUpdate(data: CreateDomesticAnimalDTO): void {
  if (!pet.value) return;

  isSubmitting.value = true;
  const updated = animalStore.updateAnimal(pet.value.id, data);
  isSubmitting.value = false;

  if (!updated) {
    feedbackMessage.value = 'Could not update: invalid category.';
    return;
  }

  pet.value = updated;
  isEditing.value = false;
  feedbackMessage.value = '';
}

function confirmDelete(): void {
  isDeleting.value = true;
}

function cancelDelete(): void {
  isDeleting.value = false;
}

function handleDelete(): void {
  if (!pet.value) return;

  animalStore.deleteAnimal(pet.value.id);
  router.push({ name: 'home' });
}

onMounted(() => {
  animalStore.loadAnimals();
  categoryStore.loadCategories();

  const id = route.params.id as string;
  const found = animalStore.getAnimalById(id);

  if (found) {
    pet.value = found;
  }
});
</script>

<template>
  <main v-if="pet" class="max-w-7xl mx-auto px-6 py-10">
    <!-- Admin toolbar -->
    <div class="admin-pet-toolbar">
      <span class="admin-pet-category-badge">{{ pet.category.species }}</span>

      <div class="admin-pet-toolbar-actions">
        <button
          v-if="!isEditing && !isDeleting"
          class="btn-primary admin-pet-button"
          type="button"
          @click="startEditing"
        >
          Edit Animal
        </button>

        <button
          v-if="!isDeleting"
          class="btn-secondary admin-pet-delete-button"
          type="button"
          @click="confirmDelete"
        >
          Delete Animal
        </button>
      </div>
    </div>

    <!-- Delete confirmation -->
    <div v-if="isDeleting" class="admin-pet-confirm-delete">
      <p>
        Are you sure you want to delete <strong>{{ pet.breed }}</strong
        >? This action cannot be undone.
      </p>
      <div class="admin-pet-confirm-actions">
        <button class="btn-secondary admin-pet-button" type="button" @click="cancelDelete">
          Cancel
        </button>
        <button class="btn-primary admin-pet-delete-button" type="button" @click="handleDelete">
          Yes, delete
        </button>
      </div>
    </div>

    <!-- Edit mode -->
    <PetForm
      v-if="isEditing"
      :initial-values="editInitialValues"
      :categories="categoryStore.categories"
      :is-submitting="isSubmitting"
      :feedback-message="feedbackMessage"
      @submit="handleUpdate"
      @cancel="cancelEditing"
    />

    <!-- View mode -->
    <template v-else-if="!isDeleting">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <PetImageGallery :pet="pet" />

        <div>
          <PetInfoSection :pet="pet" />
          <PetStatsTable :pet="pet" />
        </div>
      </div>

      <PetAccordion :pet="pet" />
    </template>
  </main>
</template>
