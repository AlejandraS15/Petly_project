<script setup lang="ts">
/**
 * DomesticAnimalDetailView.vue
 * Vista de detalle del animal
 */

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import DomesticAnimalAccordion from '@/components/domesticAnimalDetail/DomesticAnimalAccordion.vue';
import DomesticAnimalImageGallery from '@/components/domesticAnimalDetail/DomesticAnimalImageGallery.vue';
import DomesticAnimalInfoSection from '@/components/domesticAnimalDetail/DomesticAnimalInfoSection.vue';
import DomesticAnimalStatsTable from '@/components/domesticAnimalDetail/DomesticAnimalStatsTable.vue';
import ReviewsSection from '@/components/reviews/ReviewsSection.vue';
import { AuthService } from '@/services/AuthService';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';

const route = useRoute();
const router = useRouter();
DomesticAnimalService.initializeAnimalsStore();
const currentUser = computed(() => AuthService.getActiveUser());
const domesticAnimal = computed<DomesticAnimalInterface | null>(() => {
  const id = route.params.id as string;
  return DomesticAnimalService.getAnimalById(id) ?? null;
});

function goToAdminView(): void {
  const id = route.params.id as string;
  router.push({ name: 'domesticAnimalAdminDetail', params: { id } });
}
</script>

<template>
  <main v-if="domesticAnimal" class="max-w-7xl mx-auto px-6 py-10">
    <div v-if="currentUser?.role === 'admin'" class="mb-6 flex justify-end">
      <button class="btn-primary" type="button" @click="goToAdminView">Edit Animal</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <DomesticAnimalImageGallery :domestic-animal="domesticAnimal" />

      <div>
        <DomesticAnimalInfoSection :domestic-animal="domesticAnimal" />

        <DomesticAnimalStatsTable :domestic-animal="domesticAnimal" />
      </div>
    </div>

    <DomesticAnimalAccordion :domestic-animal="domesticAnimal" />
    <ReviewsSection :domestic-animal="domesticAnimal" />
  </main>
</template>
