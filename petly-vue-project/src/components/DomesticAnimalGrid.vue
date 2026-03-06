<script setup lang="ts">
// Internal
import type { PetInterface } from "@/interfaces/petInterface";
import DomesticAnimalCard from "@/components/DomesticAnimalCard.vue";

// Props
defineProps<{
  pets: PetInterface[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
    <DomesticAnimalCard 
      v-for="pet in pets" 
      :key="pet.id" 
      :pet="pet" 
    />
  </div>
  <div class="flex justify-center mt-8 mb-12">
    <button class="border border-gray-300 text-gray-600 px-8 py-2 rounded-full text-xs font-bold hover:bg-gray-50">
      Load More Pets
    </button>
  </div>
</template>