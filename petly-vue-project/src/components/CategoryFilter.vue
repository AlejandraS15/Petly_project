<script setup lang="ts">
// Internal imports
import type { CategoryInterface } from '@/interfaces/CategoryInterface'

// Props
defineProps<{
  categories: CategoryInterface[]
  activeCategory: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

function selectCategory(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  emit('select', value)
}
</script>

<template>
  <div class="py-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Categories</h2>
    </div>

    <!-- Dropdown -->
    <select
      class="w-72 border border-gray-300 rounded-full px-5 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
      :value="activeCategory"
      @change="selectCategory"
    >
      <option value="all">All categories</option>

      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.species }}
      </option>
    </select>
  </div>
</template>
