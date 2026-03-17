<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'

const props = defineProps<{
  pet: DomesticAnimalInterface
}>()

const router = useRouter()

function goToDetail(): void {
  router.push(`/pet/${props.pet.id}`)
}
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 cursor-pointer"
    @click="goToDetail"
  >
    <!-- Imagen -->
    <div class="w-full h-56 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
      <img :src="pet.image" :alt="pet.breed" class="object-contain h-full w-full" />
    </div>

    <!-- Raza -->
    <div class="mt-4 text-center">
      <h3 class="text-lg font-bold text-gray-800">
        {{ pet.breed }}
      </h3>
    </div>
  </div>
</template>
