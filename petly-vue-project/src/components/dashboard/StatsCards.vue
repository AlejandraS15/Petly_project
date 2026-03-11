<script setup lang="ts">

import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useDomesticAnimalStore } from "@/stores/domesticAnimalStore"

const animalStore = useDomesticAnimalStore()
const { animals } = storeToRefs(animalStore)

const totalAnimals = computed(() => animals.value.length)

</script>

<template>

<div class="grid grid-cols-4 gap-6">

<div class="bg-white shadow rounded-xl p-6">
<h3 class="text-gray-500 text-sm">Total Animals</h3>
<p class="text-3xl font-bold mt-2">
{{ totalAnimals }}
</p>
</div>

</div>

</template>
