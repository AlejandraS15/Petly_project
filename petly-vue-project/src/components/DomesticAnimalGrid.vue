<script setup lang="ts">
// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import DomesticAnimalCard from '@/components/DomesticAnimalCard.vue';

defineProps<{
  animals: DomesticAnimalInterface[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8">
    <DomesticAnimalCard v-for="animal in animals" :key="animal.id" :domesticAnimal="animal" />
  </div>
</template>
