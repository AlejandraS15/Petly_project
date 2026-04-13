<!-- Autor: Camila Velez -->
<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal imports
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import { CategoryService } from '@/services/CategoryService';

import DomesticAnimalAccordion from '@/components/domesticAnimalDetail/DomesticAnimalAccordion.vue';
import DomesticAnimalForm from '@/components/domesticAnimalDetail/DomesticAnimalForm.vue';
import DomesticAnimalImageGallery from '@/components/domesticAnimalDetail/DomesticAnimalImageGallery.vue';
import DomesticAnimalInfoSection from '@/components/domesticAnimalDetail/DomesticAnimalInfoSection.vue';
import DomesticAnimalStatsTable from '@/components/domesticAnimalDetail/DomesticAnimalStatsTable.vue';

const route = useRoute();
const router = useRouter();
DomesticAnimalService.initializeAnimalsStore();
const categories = ref(CategoryService.getCategories());

const domesticAnimalId = route.params.id as string;
const domesticAnimal = ref<DomesticAnimalInterface | null>(
  DomesticAnimalService.getAnimalById(domesticAnimalId) ?? null,
);
const isEditing = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const feedbackMessage = ref<string>('');

const editInitialValues = computed<Partial<CreateDomesticAnimalDTO>>(() => {
  if (!domesticAnimal.value) return {};

  return {
    breed: domesticAnimal.value.breed,
    description: domesticAnimal.value.description,
    lifeExpectancy: domesticAnimal.value.lifeExpectancy,
    weight: domesticAnimal.value.weight,
    height: domesticAnimal.value.height,
    behaviours: domesticAnimal.value.behaviours,
    commonDisease: domesticAnimal.value.commonDisease,
    countryOrigin: domesticAnimal.value.countryOrigin,
    history: domesticAnimal.value.history,
    image: domesticAnimal.value.image,
    categoryId: domesticAnimal.value.category.id,
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
  if (!domesticAnimal.value) return;

  isSubmitting.value = true;
  const updated = DomesticAnimalService.updateAnimalAndSync(domesticAnimal.value.id, data);
  isSubmitting.value = false;

  if (!updated) {
    feedbackMessage.value = 'Could not update: invalid category.';
    return;
  }

  domesticAnimal.value = updated;
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
  if (!domesticAnimal.value) return;

  DomesticAnimalService.deleteAnimalAndSync(domesticAnimal.value.id);

  router.push({ name: 'home' });
}

</script>

<template>
  <main v-if="domesticAnimal" class="max-w-7xl mx-auto px-6 py-10">
    <!-- Admin toolbar -->
    <div class="admin-domestic-animal-toolbar">
      <span class="admin-domestic-animal-category-badge">{{ domesticAnimal.category.species }}</span>

      <div class="admin-domestic-animal-toolbar-actions">
        <button
          v-if="!isEditing && !isDeleting"
          class="btn-primary admin-domestic-animal-button"
          type="button"
          @click="startEditing"
        >
          Edit Animal
        </button>

        <button
          v-if="!isDeleting"
          class="btn-secondary admin-domestic-animal-delete-button"
          type="button"
          @click="confirmDelete"
        >
          Delete Animal
        </button>
      </div>
    </div>

    <!-- Delete confirmation -->
    <div v-if="isDeleting" class="admin-domestic-animal-confirm-delete">
      <p>
        Are you sure you want to delete <strong>{{ domesticAnimal.breed }}</strong
        >? This action cannot be undone.
      </p>
      <div class="admin-domestic-animal-confirm-actions">
        <button class="btn-secondary admin-domestic-animal-button" type="button" @click="cancelDelete">
          Cancel
        </button>
        <button class="btn-primary admin-domestic-animal-delete-button" type="button" @click="handleDelete">
          Yes, delete
        </button>
      </div>
    </div>

    <!-- Edit mode -->
    <DomesticAnimalForm
      v-if="isEditing"
      :initial-values="editInitialValues"
      :categories="categories"
      :is-submitting="isSubmitting"
      :feedback-message="feedbackMessage"
      @submit="handleUpdate"
      @cancel="cancelEditing"
    />

    <!-- View mode -->
    <template v-else-if="!isDeleting">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <DomesticAnimalImageGallery :domestic-animal="domesticAnimal" />

        <div>
          <DomesticAnimalInfoSection :domestic-animal="domesticAnimal" />
          <DomesticAnimalStatsTable :domestic-animal="domesticAnimal" />
        </div>
      </div>

      <DomesticAnimalAccordion :domestic-animal="domesticAnimal" />
    </template>
  </main>
</template>
