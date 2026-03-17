<!-- Autor: Nombre Apellido -->
<!-- Componente reutilizable para crear y editar animales domésticos -->
<script setup lang="ts">
// External imports
import { reactive, watch } from 'vue'

// Internal imports
import type { CategoryInterface } from '@/interfaces/CategoryInterface'
import type { CreateDomesticAnimalDTO } from '@/dtos/animal/CreateDomesticAnimalDTO'

const props = defineProps<{
  initialValues?: Partial<CreateDomesticAnimalDTO>
  categories: CategoryInterface[]
  isSubmitting: boolean
  feedbackMessage: string
}>()

const emit = defineEmits<{
  (e: 'submit', data: CreateDomesticAnimalDTO): void
  (e: 'cancel'): void
}>()

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
})

watch(
  () => props.initialValues,
  (values) => {
    if (values) {
      Object.assign(form, values)
    }
  },
  { immediate: true },
)

function handleSubmit(): void {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="pet-form" @submit.prevent="handleSubmit">
    <div class="pet-form-grid">
      <div class="pet-form-field">
        <label for="petBreed">Breed</label>
        <input id="petBreed" v-model="form.breed" type="text" required />
      </div>

      <div class="pet-form-field">
        <label for="petCategory">Category</label>
        <select id="petCategory" v-model="form.categoryId" required>
          <option value="" disabled>Select a category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.species }}
          </option>
        </select>
      </div>

      <div class="pet-form-field">
        <label for="petCountry">Country of Origin</label>
        <input id="petCountry" v-model="form.countryOrigin" type="text" required />
      </div>

      <div class="pet-form-field">
        <label for="petLifeExpectancy">Life Expectancy</label>
        <input id="petLifeExpectancy" v-model="form.lifeExpectancy" type="text" required />
      </div>

      <div class="pet-form-field">
        <label for="petWeight">Weight</label>
        <input id="petWeight" v-model="form.weight" type="text" required />
      </div>

      <div class="pet-form-field">
        <label for="petHeight">Height</label>
        <input id="petHeight" v-model="form.height" type="text" required />
      </div>

      <div class="pet-form-field pet-form-field--full">
        <label for="petImage">Image URL</label>
        <input id="petImage" v-model="form.image" type="text" required />
      </div>

      <div class="pet-form-field pet-form-field--full">
        <label for="petDescription">Description</label>
        <textarea id="petDescription" v-model="form.description" rows="3" required />
      </div>

      <div class="pet-form-field pet-form-field--full">
        <label for="petBehaviours">Behaviour</label>
        <textarea id="petBehaviours" v-model="form.behaviours" rows="2" required />
      </div>

      <div class="pet-form-field pet-form-field--full">
        <label for="petDisease">Common Disease</label>
        <textarea id="petDisease" v-model="form.commonDisease" rows="2" required />
      </div>

      <div class="pet-form-field pet-form-field--full">
        <label for="petHistory">History</label>
        <textarea id="petHistory" v-model="form.history" rows="3" required />
      </div>
    </div>

    <p v-if="feedbackMessage" class="pet-form-feedback">{{ feedbackMessage }}</p>

    <div class="pet-form-actions">
      <button class="btn-secondary pet-form-button" type="button" @click="emit('cancel')">
        Cancel
      </button>
      <button class="btn-primary pet-form-button" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Saving...' : 'Save' }}
      </button>
    </div>
  </form>
</template>
