<script setup lang="ts">
defineProps<{
  rating: number
}>()
</script>

<template>
  <div class="text-yellow-400">
    <span v-for="i in 5" :key="i">
      {{ i <= rating ? '★' : '☆' }}
    </span>
  </div>
</template>
