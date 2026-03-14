<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'

import StatsCards from '@/components/dashboard/StatsCards.vue'

const authStore = useAuthStore()
const animalStore = useDomesticAnimalStore()
const router = useRouter()

function goToHome(): void {
  router.push({ name: 'home' })
}

function handleLogout(): void {
  authStore.logout()
  router.push({ name: 'login' })
}

onMounted(() => {
  authStore.initializeAuth()
  animalStore.loadAnimals()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-10">
    <header class="mb-10 flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-3xl font-bold">Admin Dashboard</h1>

      <div class="flex gap-2">
        <button class="btn-secondary px-4 py-2 text-sm" @click="goToHome">Home</button>
        <button class="btn-primary px-4 py-2 text-sm" @click="handleLogout">Logout</button>
      </div>
    </header>

    <StatsCards />
  </div>
</template>
