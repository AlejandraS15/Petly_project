// Corrección: Alejandra Suarez
<script setup lang="ts">
// External imports
import { RouterView } from 'vue-router';

// Internal imports
import AppHeader from '@/components/AppHeader.vue';
import { useAuthStore } from '@/stores/authStore';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

const authStore = useAuthStore();
const domesticAnimalStore = useDomesticAnimalStore();

authStore.initializeAuth();
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="fixed inset-x-0 top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-6">
        <AppHeader @search="domesticAnimalStore.setSearch" />
      </div>
    </div>

    <div class="pt-28">
      <RouterView />
    </div>
  </div>
</template>
