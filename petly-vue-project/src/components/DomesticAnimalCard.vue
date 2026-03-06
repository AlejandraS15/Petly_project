<script setup lang="ts">
// Internal
import type { PetInterface } from "@/interfaces/petInterface";

// Props
defineProps<{
  pet: PetInterface;
}>();
</script>

<template>
  <div class="bg-[#F2F2F2] rounded-3xl p-6 flex flex-col items-center relative overflow-hidden group">
    <div class="h-56 w-full flex items-center justify-center mb-4">
      <img 
        :src="pet.image" 
        :alt="pet.name" 
        class="max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
      />
    </div>
    
    <div class="w-full flex justify-between items-end mt-2">
      <h3 class="text-xl font-black text-gray-900 leading-tight w-2/3">
        {{ pet.name }}
      </h3>
      <button class="bg-[#5C8D1A] text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
        See all
      </button>
    </div>
  </div>
</template>