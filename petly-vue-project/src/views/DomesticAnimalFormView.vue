<!-- Autor: Nombre Apellido -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import { CategoryService } from '@/services/CategoryService';

import DomesticAnimalForm from '@/components/domesticAnimalDetail/DomesticAnimalForm.vue';

const router = useRouter();
const categories = ref(CategoryService.getCategories());

const isSubmitting = ref<boolean>(false);
const feedbackMessage = ref<string>('');

function handleCreate(data: CreateDomesticAnimalDTO): void {
  isSubmitting.value = true;
  const created = DomesticAnimalService.createAnimalAndSync(data);
  isSubmitting.value = false;

  if (!created) {
    feedbackMessage.value = 'Could not create animal: invalid category.';
    return;
  }

  router.push({ name: 'domesticAnimalAdminDetail', params: { id: created.id } });
}

function handleCancel(): void {
  router.push({ name: 'dashboard' });
}

</script>

<template>
  <main class="max-w-4xl mx-auto px-6 py-10">
    <h1 class="app-title mb-6">New Animal</h1>

    <DomesticAnimalForm
      :categories="categories"
      :is-submitting="isSubmitting"
      :feedback-message="feedbackMessage"
      @submit="handleCreate"
      @cancel="handleCancel"
    />
  </main>
</template>
