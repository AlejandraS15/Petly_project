<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'

import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// Fix icon issue in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const animalStore = useDomesticAnimalStore()
const { animals } = storeToRefs(animalStore)

onMounted(() => {
  animalStore.loadAnimals()
  console.log("ANIMALS:", animals.value)
})

const countryCoordinates: Record<string, { lat: number; lng: number }> = {
  Iran: { lat: 32.4279, lng: 53.688 },
  Mexico: { lat: 23.6345, lng: -102.5528 },
  "South America": { lat: -15, lng: -60 },
  Colombia: { lat: 4.5709, lng: -74.2973 },

  Scotland: { lat: 56.4907, lng: -4.2026 },
  "Canary Islands": { lat: 28.2916, lng: -16.6291 },
  Netherlands: { lat: 52.1326, lng: 5.2913 },
  Syria: { lat: 34.8021, lng: 38.9968 }
}

const animalLocations = computed(() => {
  return animals.value
    .map((animal) => {

      const country = animal.countryOrigin.trim()

      const coords = countryCoordinates[country]

      if (!coords) {
        console.warn("No encontrado:", country)
        return null
      }

      return {
        breed: animal.breed,
        lat: coords.lat,
        lng: coords.lng,
      }
    })
    .filter((a) => a !== null)
})
</script>

<template>

<div class="bg-white shadow rounded-xl p-6">

<h3 class="font-bold mb-4">
Animals Origin Map
</h3>

<LMap
:zoom="2"
:center="[10, -20]"
style="height:400px; width:100%"
>

<LTileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<LMarker
  v-for="animal in animalLocations"
  :key="animal.breed + animal.lat"
  :lat-lng="[animal.lat, animal.lng]"
>

<LPopup>
<strong>{{ animal.breed }}</strong>
</LPopup>

</LMarker>

</LMap>

</div>

</template>
