<!-- Autor: Nombre Apellido -->
<script setup lang="ts">
// External imports
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO';
import { useCategoryStore } from '@/stores/categoryStore';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

import PetForm from '@/components/petDetail/PetForm.vue';

const router = useRouter();
const animalStore = useDomesticAnimalStore();
const categoryStore = useCategoryStore();

const isSubmitting = ref<boolean>(false);
const feedbackMessage = ref<string>('');

function handleCreate(data: CreateDomesticAnimalDTO): void {
  isSubmitting.value = true;
  const created = animalStore.createAnimal(data);
  isSubmitting.value = false;

  if (!created) {
    feedbackMessage.value = 'Could not create animal: invalid category.';
    return;
  }

  router.push({ name: 'petAdminDetail', params: { id: created.id } });
}

function handleCancel(): void {
  router.push({ name: 'dashboard' });
}

onMounted(() => {
  categoryStore.loadCategories();
});
</script>

<template>
  <main class="max-w-4xl mx-auto px-6 py-10">
    <h1 class="app-title mb-6">New Animal</h1>

    <PetForm
      :categories="categoryStore.categories"
      :is-submitting="isSubmitting"
      :feedback-message="feedbackMessage"
      @submit="handleCreate"
      @cancel="handleCancel"
    />
  </main>
</template>
