<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { useDomesticAnimalStore } from "@/stores/domesticAnimalStore";
import type { DomesticAnimalInterface } from "@/interfaces/domesticAnimalInterface";

const route = useRoute();
const animalStore = useDomesticAnimalStore();

const pet = ref<DomesticAnimalInterface | null>(null);

onMounted(() => {
  animalStore.loadAnimals();

  const id = route.params.id as string;
  const found = animalStore.getAnimalById(id);

  if (found) {
    pet.value = found;
  }
});
</script>

<template>
  <main v-if="pet" class="max-w-7xl mx-auto px-6 py-10">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- GALERIA -->
      <div class="grid grid-cols-[100px_1fr] gap-4">

        <div class="flex flex-col gap-4">

          <img
            v-for="n in 3"
            :key="n"
            :src="pet.image"
            class="rounded-xl object-cover h-24 cursor-pointer"
          />

        </div>

        <img
          :src="pet.image"
          class="rounded-2xl object-contain bg-gray-100 p-4"
        />

      </div>

      <!-- INFO -->
      <div>

        <h1 class="text-4xl mb-2">
          {{ pet.breed }}
        </h1>

        <p class="text-yellow-500 mb-2">
          ⭐⭐⭐⭐⭐ 4.5/5
        </p>

        <p class="text-sm mb-4 underline">
          Country of Origin: {{ pet.countryOrigin }}
        </p>

        <p class="text-gray-600 mb-8">
          {{ pet.description }}
        </p>

        <!-- TABLA -->
        <div class="border rounded-xl overflow-hidden">

          <div class="grid grid-cols-4 bg-[#ffebc0] text-center font-semibold">

            <div class="p-3">Life Expectancy</div>
            <div class="p-3">Weight</div>
            <div class="p-3">Height</div>
            <div class="p-3">Size</div>

          </div>

          <div class="grid grid-cols-4 text-center border-t">

            <div class="p-3">{{ pet.lifeExpectancy }}</div>
            <div class="p-3">{{ pet.weight }}</div>
            <div class="p-3">{{ pet.height }}</div>
            <div class="p-3">Small</div>

          </div>

        </div>

      </div>

    </div>

    <!-- ACCORDION -->

    <div class="mt-16 space-y-6">

      <details class="border-b pb-4">
        <summary class="cursor-pointer text-xl font-semibold">
          Behaviour
        </summary>
        <p class="mt-2 text-gray-600">
          {{ pet.behaviours }}
        </p>
      </details>

      <details class="border-b pb-4">
        <summary class="cursor-pointer text-xl font-semibold">
          Common Disease
        </summary>
        <p class="mt-2 text-gray-600">
          {{ pet.commonDisease }}
        </p>
      </details>

      <details class="border-b pb-4">
        <summary class="cursor-pointer text-xl font-semibold">
          History
        </summary>
        <p class="mt-2 text-gray-600">
          {{ pet.history }}
        </p>
      </details>

    </div>

  </main>
</template>