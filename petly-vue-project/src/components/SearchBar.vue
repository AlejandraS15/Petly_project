<script setup lang="ts">
// External
import { ref } from "vue";

// Variables
const searchQuery = ref<string>("");

// Emits
const emit = defineEmits<{
  (e: "search", value: string): void;
}>();

function handleInput(): void {
  emit("search", searchQuery.value);
}
</script>

<template>
  <div class="flex items-center justify-between w-full py-4">
    <h1 class="text-2xl font-bold tracking-tighter">PETLY.CO</h1>
    
    <div class="flex items-center gap-4">
      <div class="relative">
        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for pets..."
          class="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
          @input="handleInput"
        />
      </div>
      <div class="flex gap-2 text-gray-500">
        <button class="p-1 hover:bg-gray-100 rounded">⎙</button>
        <button class="p-1 hover:bg-gray-100 rounded">⚙</button>
        <button class="p-1 hover:bg-gray-100 rounded">X</button>
      </div>
    </div>
  </div>
</template>