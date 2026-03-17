<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore'

import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

type IconDefaultPrototype = typeof L.Icon.Default.prototype & {
  _getIconUrl?: () => string
}

const iconDefaultPrototype = L.Icon.Default.prototype as IconDefaultPrototype
delete iconDefaultPrototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const animalStore = useDomesticAnimalStore()
const { animals } = storeToRefs(animalStore)

const countryCoordinates: Record<string, { lat: number; lng: number }> = {
  Iran: { lat: 32.4279, lng: 53.688 },
  Mexico: { lat: 23.6345, lng: -102.5528 },
  'South America': { lat: -15, lng: -60 },
}

const animalLocations = computed(() => {
  return animals.value
    .map((animal) => {
      const coords = countryCoordinates[animal.countryOrigin]

      if (!coords) return null

      return {
        breed: animal.breed,
        lat: coords.lat,
        lng: coords.lng,
      }
    })
    .filter(Boolean)
})
</script>

<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-bold mb-4">Animals Origin Map</h3>

    <LMap :zoom="2" :center="[10, -20]" style="height: 400px; width: 100%">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LMarker v-for="(animal, i) in animalLocations" :key="i" :lat-lng="[animal.lat, animal.lng]">
        <LPopup>
          <strong>{{ animal.breed }}</strong>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>
