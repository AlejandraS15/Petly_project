<script setup lang="ts">
// Internal
import type { CategoryInterface } from "@/interfaces/categoryInterface";

// Props
defineProps<{
  categories: CategoryInterface[];
  activeCategory: string;
}>();

// Emits
const emit = defineEmits<{
  (e: "select", id: string): void;
}>();

function selectCategory(id: string): void {
  emit("select", id);
}
</script>

<template>
  <div class="py-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Categories</h2>
      <button class="bg-[#5C8D1A] text-white px-6 py-1 rounded-full text-sm font-medium">See all</button>
    </div>

    <div class="flex justify-start gap-12">
      <div 
        v-for="cat in categories" 
        :key="cat.id"
        class="flex flex-col items-center cursor-pointer group"
        @click="selectCategory(cat.id)"
      >
        <div 
          :class="[
            'w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-2 transition-all',
            activeCategory === cat.id ? 'bg-orange-200 scale-110' : 'bg-[#FFF4D9] group-hover:bg-orange-100'
          ]"
        >
          {{ cat.icon }}
        </div>
        <span class="text-sm font-bold text-gray-700">{{ cat.name }}</span>
      </div>
    </div>
  </div>
</template>