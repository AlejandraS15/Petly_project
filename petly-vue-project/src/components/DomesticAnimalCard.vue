<script setup lang="ts">
import type { DomesticAnimalInterface } from "@/interfaces/domesticAnimalInterface"

defineProps<{
  animals: DomesticAnimalInterface[];
}>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4">

    <!-- Imagen -->
    <div class="w-full h-56 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
      <img
        :src="pet.image"
        :alt="pet.breed"
        class="object-contain h-full"
      />
    </div>

    <div class="mt-4">
      <h3 class="text-lg font-bold text-gray-800">
        {{ pet.breed }}
      </h3>

      <p class="text-sm text-gray-500">
        {{ pet.category.name }}
      </p>
    </div>

  </div>
</template>