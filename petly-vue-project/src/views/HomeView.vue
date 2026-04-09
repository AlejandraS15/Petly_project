<script setup lang="ts">
// Autor: Nombre Apellido

// External imports
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

// Internal imports
import CategoryFilter from '@/components/CategoryFilter.vue';
import DomesticAnimalGrid from '@/components/DomesticAnimalGrid.vue';
import HomeHero from '@/components/HomeHero.vue';
import { useAuthStore } from '@/stores/authStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

// Stores instances
const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const animalStore = useDomesticAnimalStore();

// Reactive refs
const { categories, selectedCategoryId } = storeToRefs(categoryStore);
const { filteredAnimals } = storeToRefs(animalStore);

function handleCategorySelect(id: string): void {
  categoryStore.selectCategory(id);
}

// Lifecycle
onMounted(() => {
  authStore.initializeAuth();
  categoryStore.loadCategories();
  animalStore.loadAnimals();
});
</script>

<template>
  <main class="max-w-7xl mx-auto px-6">
    <HomeHero />

    <!-- CATEGORIES -->
    <section id="categories-section" class="mt-10">
      <CategoryFilter
        :categories="categories"
        :active-category="selectedCategoryId ?? 'all'"
        @select="handleCategorySelect"
      />
    </section>

    <!-- ANIMAL GRID -->
    <section class="mt-12 mb-16">
      <DomesticAnimalGrid :animals="filteredAnimals" />
    </section>

    <!-- LOAD MORE -->
    <div class="flex justify-center mb-20">
      <button
        class="border border-gray-300 px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition"
      >
        Load More Pets
      </button>
    </div>

    <!-- FOOTER -->
    <footer class="border-t border-gray-200 pt-16 pb-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div class="md:col-span-2">
          <h2 class="text-2xl font-black mb-4">PETLY.CO</h2>

          <p class="text-gray-500 max-w-sm text-sm">
            Find what other people think about your pets and say something about them too.
          </p>

          <div class="flex gap-4 mt-6 text-gray-400 text-sm">
            <span class="cursor-pointer hover:text-black">𝕏</span>
            <span class="cursor-pointer hover:text-black">Facebook</span>
            <span class="cursor-pointer hover:text-black">Instagram</span>
            <span class="cursor-pointer hover:text-black">GitHub</span>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Company</h3>

          <ul class="space-y-2 text-sm text-gray-500">
            <li class="hover:text-black cursor-pointer">About</li>
            <li class="hover:text-black cursor-pointer">Features</li>
            <li class="hover:text-black cursor-pointer">Works</li>
            <li class="hover:text-black cursor-pointer">Career</li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Help</h3>

          <ul class="space-y-2 text-sm text-gray-500">
            <li class="hover:text-black cursor-pointer">Customer Support</li>
            <li class="hover:text-black cursor-pointer">My Account</li>
            <li class="hover:text-black cursor-pointer">Terms & Conditions</li>
            <li class="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div class="border-t mt-10 pt-6 text-xs text-gray-400">Petly 2024. All Rights Reserved</div>
    </footer>
  </main>
</template>
