<script setup lang="ts">
/**
 * AppHeader.vue
 * Header principal de la aplicación
 */

// Internal
import SearchBar from '@/components/SearchBar.vue'

// Emits
const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

// Functions
function handleSearch(query: string): void {
  emit('search', query)
}
</script>

<template>
  <header class="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-4">
      <img src="@/assets/logo.svg" alt="Petly logo" width="50" height="50" />

      <h1 class="text-2xl font-black tracking-tight">PETLY.CO</h1>
    </div>

    <!-- Search -->
    <div class="w-full sm:w-96">
      <SearchBar @search="handleSearch" />
    </div>
  </header>
</template>
