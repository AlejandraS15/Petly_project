<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

const animals = [
  { lat: 4.60971, lng: -74.08175 },
  { lat: 6.2442, lng: -75.5812 },
]
</script>

<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-bold mb-4">Animals Location</h3>

    <LMap :zoom="5" :center="[4.5, -74]" style="height: 400px">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LMarker v-for="(a, i) in animals" :key="i" :lat-lng="[a.lat, a.lng]" />
    </LMap>
  </div>
</template>
