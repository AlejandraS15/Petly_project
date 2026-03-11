<script setup lang="ts">
/**
 * HomeView.vue
 * Vista principal de la aplicación
 */

import { onMounted } from "vue";
import { storeToRefs } from "pinia";

// Components
import CategoryFilter from "@/components/CategoryFilter.vue";
import DomesticAnimalGrid from "@/components/DomesticAnimalGrid.vue";
import SearchBar from "@/components/SearchBar.vue";

// Stores
import { useCategoryStore } from "@/stores/categoryStore";
import { useDomesticAnimalStore } from "@/stores/domesticAnimalStore";

// Stores instances
const categoryStore = useCategoryStore();
const animalStore = useDomesticAnimalStore();

// Reactive refs
const { categories, selectedCategoryId } = storeToRefs(categoryStore);
const { filteredAnimals } = storeToRefs(animalStore);

// Methods
function handleSearch(query: string) {
  animalStore.setSearch(query);
}

function handleCategorySelect(id: string) {
  categoryStore.selectCategory(id);
}

// Lifecycle
onMounted(() => {
  categoryStore.loadCategories();
  animalStore.loadAnimals();
});
</script>

<template>
  <main class="max-w-7xl mx-auto px-6">

    <!-- HEADER -->
    <header class="flex items-center justify-between py-6 border-b border-gray-200">

      <div class="flex items-center gap-4">
        <img
          src="@/assets/logo.svg"
          alt="Petly logo"
          width="50"
          height="50"
        />

        <h1 class="text-2xl font-black tracking-tight">
          PETLY.CO
        </h1>
      </div>

      <div class="w-96">
        <SearchBar @search="handleSearch" />
      </div>

    </header>

    <!-- CATEGORIES -->
    <section class="mt-10">

      <div class="flex items-center justify-between mb-6">

        <h2 class="text-xl font-bold">
          Categories
        </h2>

        <button
          class="bg-green-600 text-white text-sm px-4 py-1 rounded-full hover:bg-green-700 transition"
        >
          See all
        </button>

      </div>

      <CategoryFilter
        :categories="categories"
        :active-category="selectedCategoryId"
        @select="handleCategorySelect"
      />

    </section>

    <!-- ANIMAL GRID -->
    <section class="mt-12 mb-16">

      <DomesticAnimalGrid
        :animals="filteredAnimals"
      />

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

          <h2 class="text-2xl font-black mb-4">
            PETLY.CO
          </h2>

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

          <h3 class="font-semibold mb-4">
            Company
          </h3>

          <ul class="space-y-2 text-sm text-gray-500">
            <li class="hover:text-black cursor-pointer">About</li>
            <li class="hover:text-black cursor-pointer">Features</li>
            <li class="hover:text-black cursor-pointer">Works</li>
            <li class="hover:text-black cursor-pointer">Career</li>
          </ul>

        </div>

        <div>

          <h3 class="font-semibold mb-4">
            Help
          </h3>

          <ul class="space-y-2 text-sm text-gray-500">
            <li class="hover:text-black cursor-pointer">Customer Support</li>
            <li class="hover:text-black cursor-pointer">My Account</li>
            <li class="hover:text-black cursor-pointer">Terms & Conditions</li>
            <li class="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>

        </div>

      </div>

      <div class="border-t mt-10 pt-6 text-xs text-gray-400">
        Petly 2024. All Rights Reserved
      </div>

    </footer>

  </main>
</template>