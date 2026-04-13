<!-- Autor: Nombre Apellido -->
<!-- Componente reutilizable para crear y editar animales domésticos -->
<script setup lang="ts">
// External imports
import { reactive, watch } from 'vue';

// Internal imports
import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO';

const props = defineProps<{
  initialValues?: Partial<CreateDomesticAnimalDTO>;
  categories: CategoryInterface[];
  isSubmitting: boolean;
  feedbackMessage: string;
}>();

const emit = defineEmits<{
  (e: 'submit', data: CreateDomesticAnimalDTO): void;
  (e: 'cancel'): void;
}>();

const form = reactive<CreateDomesticAnimalDTO>({
  breed: '',
  description: '',
  lifeExpectancy: '',
  weight: '',
  height: '',
  behaviours: '',
  commonDisease: '',
  countryOrigin: '',
  history: '',
  image: '',
  categoryId: '',
});

watch(
  () => props.initialValues,
  (values) => {
    if (values) {
      Object.assign(form, values);
    }
  },
  { immediate: true },
);

function handleSubmit(): void {
  emit('submit', { ...form });
}
</script>

<template>
  <form class="domestic-animal-form" @submit.prevent="handleSubmit">
    <div class="domestic-animal-form-grid">
      <div class="domestic-animal-form-field">
        <label for="domesticAnimalBreed">Breed</label>
        <input id="domesticAnimalBreed" v-model="form.breed" type="text" required />
      </div>

      <div class="domestic-animal-form-field">
        <label for="domesticAnimalCategory">Category</label>
        <select id="domesticAnimalCategory" v-model="form.categoryId" required>
          <option value="" disabled>Select a category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.species }}
          </option>
        </select>
      </div>

      <div class="domestic-animal-form-field">
        <label for="domesticAnimalCountry">Country of Origin</label>
        <input id="domesticAnimalCountry" v-model="form.countryOrigin" type="text" required />
      </div>

      <div class="domestic-animal-form-field">
        <label for="domesticAnimalLifeExpectancy">Life Expectancy</label>
        <input id="domesticAnimalLifeExpectancy" v-model="form.lifeExpectancy" type="text" required />
      </div>

      <div class="domestic-animal-form-field">
        <label for="domesticAnimalWeight">Weight</label>
        <input id="domesticAnimalWeight" v-model="form.weight" type="text" required />
      </div>

      <div class="domestic-animal-form-field">
        <label for="domesticAnimalHeight">Height</label>
        <input id="domesticAnimalHeight" v-model="form.height" type="text" required />
      </div>

      <div class="domestic-animal-form-field domestic-animal-form-field--full">
        <label for="domesticAnimalImage">Image URL</label>
        <input id="domesticAnimalImage" v-model="form.image" type="text" required />
      </div>

      <div class="domestic-animal-form-field domestic-animal-form-field--full">
        <label for="domesticAnimalDescription">Description</label>
        <textarea id="domesticAnimalDescription" v-model="form.description" rows="3" required />
      </div>

      <div class="domestic-animal-form-field domestic-animal-form-field--full">
        <label for="domesticAnimalBehaviours">Behaviour</label>
        <textarea id="domesticAnimalBehaviours" v-model="form.behaviours" rows="2" required />
      </div>

      <div class="domestic-animal-form-field domestic-animal-form-field--full">
        <label for="domesticAnimalDisease">Common Disease</label>
        <textarea id="domesticAnimalDisease" v-model="form.commonDisease" rows="2" required />
      </div>

      <div class="domestic-animal-form-field domestic-animal-form-field--full">
        <label for="domesticAnimalHistory">History</label>
        <textarea id="domesticAnimalHistory" v-model="form.history" rows="3" required />
      </div>
    </div>

    <p v-if="feedbackMessage" class="domestic-animal-form-feedback">{{ feedbackMessage }}</p>

    <div class="domestic-animal-form-actions">
      <button class="btn-secondary domestic-animal-form-button" type="button" @click="emit('cancel')">
        Cancel
      </button>
      <button class="btn-primary domestic-animal-form-button" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Saving...' : 'Save' }}
      </button>
    </div>
  </form>
</template>
