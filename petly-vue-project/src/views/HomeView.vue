<script setup lang="ts">
/**
 * HomeView.vue
 * Vista principal que coordina los stores de categorías y animales.
 */

// External
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia";

// Internal
import CategoryFilter from "@/components/CategoryFilter.vue";
import DomesticAnimalGrid from "@/components/DomesticAnimalGrid.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useDomesticAnimalStore } from "@/stores/domesticAnimalStore";

// Variables
const categoryStore = useCategoryStore();
const animalStore = useDomesticAnimalStore();

// Destructuring con storeToRefs para mantener reactividad
const { categories, selectedCategoryId } = storeToRefs(categoryStore);
const { animals } = storeToRefs(animalStore);

// Reactive Variables
const searchQuery = ref<string>("");

// Selectors (Computed)
/**
 * Filtra los animales basado en la categoría seleccionada y la búsqueda por nombre.
 */
const filteredAnimals = computed(() => {
  return animals.value.filter((animal) => {
    const matchesCategory =
      selectedCategoryId.value === "all" ||
      animal.categoryId === selectedCategoryId.value;
    const matchesSearch = animal.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});

// Functions
/**
 * Actualiza el término de búsqueda.
 * @param query - El texto ingresado en el SearchBar
 */
function handleSearch(query: string): void {
  searchQuery.value = query;
}

/**
 * Cambia la categoría activa en el store.
 * @param id - El ID de la categoría seleccionada
 */
function handleCategorySelect(id: string): void {
  categoryStore.setSelectedCategory(id);
}

onMounted(() => {
  categoryStore.loadCategories()
  animalStore.loadAnimals()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header y Buscador -->
    <header class="py-6 border-b border-gray-100 mb-8">
      <SearchBar @search="handleSearch" />
    </header>

    <!-- Sección de Categorías -->
    <section class="mb-12">
      <CategoryFilter
        :active-category-id="selectedCategoryId"
        :categories="categories"
        @select="handleCategorySelect"
      />
    </section>

    <!-- Cuadrícula de Animales -->
    <section class="mb-20">
      <DomesticAnimalGrid :animals="filteredAnimals" />
    </section>

    <!-- Footer según referencia visual -->
    <footer class="border-t border-gray-200 py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-2">
          <h2 class="text-2xl font-black tracking-tighter mb-4">PETLY.CO</h2>
          <p class="text-gray-500 max-w-sm text-sm leading-relaxed">
            Find what other people think about your pets and say something
            about them too.
          </p>
          <div class="flex space-x-4 mt-6 text-gray-400">
            <span class="cursor-pointer hover:text-black">𝕏</span>
            <span class="cursor-pointer hover:text-black">f</span>
            <span class="cursor-pointer hover:text-black">i</span>
            <span class="cursor-pointer hover:text-black">github</span>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm text-gray-900 mb-4">Company</h3>
          <ul class="space-y-3 text-sm text-gray-500">
            <li class="cursor-pointer hover:text-black">About</li>
            <li class="cursor-pointer hover:text-black">Features</li>
            <li class="cursor-pointer hover:text-black">Works</li>
            <li class="cursor-pointer hover:text-black">Career</li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-sm text-gray-900 mb-4">Help</h3>
          <ul class="space-y-3 text-sm text-gray-500">
            <li class="cursor-pointer hover:text-black">Customer Support</li>
            <li class="cursor-pointer hover:text-black">My Account</li>
            <li class="cursor-pointer hover:text-black">Terms & Conditions</li>
            <li class="cursor-pointer hover:text-black">Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200">
        <p class="text-xs text-gray-400">Petly 2024. All Rights Reserved</p>
      </div>
    </footer>
  </div>
</template>