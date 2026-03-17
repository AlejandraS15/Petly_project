<script setup lang="ts">
/**
 * PetDetailView.vue
 * Vista de detalle del animal
 */

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/authStore'
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'
import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'

import PetImageGallery from '@/components/petDetail/PetImageGallery.vue'
import PetInfoSection from '@/components/petDetail/PetInfoSection.vue'
import PetStatsTable from '@/components/petDetail/PetStatsTable.vue'
import PetAccordion from '@/components/petDetail/PetAccordion.vue'

const route = useRoute()
const router = useRouter()
const animalStore = useDomesticAnimalStore()
const authStore = useAuthStore()
const { isAdmin } = storeToRefs(authStore)

const pet = ref<DomesticAnimalInterface | null>(null)

onMounted(() => {
  animalStore.loadAnimals()

  const id = route.params.id as string
  const found = animalStore.getAnimalById(id)

  if (found) {
    pet.value = found
  }
})

function goToAdminView(): void {
  const id = route.params.id as string
  router.push({ name: 'petAdminDetail', params: { id } })
}
</script>

<template>
  <main v-if="pet" class="max-w-7xl mx-auto px-6 py-10">
    <div v-if="isAdmin" class="mb-6 flex justify-end">
      <button class="btn-primary" type="button" @click="goToAdminView">Edit Animal</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <PetImageGallery :pet="pet" />

      <div>
        <PetInfoSection :pet="pet" />

        <PetStatsTable :pet="pet" />
      </div>
    </div>

    <PetAccordion :pet="pet" />
  </main>
</template>
