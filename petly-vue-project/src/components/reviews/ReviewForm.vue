<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import type { CreateReviewDTO } from '@/dtos/review/CreateReviewDTO';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import { useAuthStore } from '@/stores/authStore';
import { useDomesticAnimalStore } from '@/stores/domesticAnimalStore';

const props = defineProps<{
  animalId: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const store = useDomesticAnimalStore();
const authStore = useAuthStore();

const rating = ref<number>(5);
const comment = ref<string>('');

function submitReview(): void {
  const dto: CreateReviewDTO = {
    rating: rating.value,
    comment: comment.value,
    postDate: new Date(),
    userId: authStore.currentUser!.id,
    domesticAnimalId: props.animalId,
  };

  const result = DomesticAnimalService.addReview(props.animalId, dto, store.animals);

  if (result) {
    store.setAnimals(result.updatedAnimals);
  }

  emit('close');
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white p-6 rounded-xl w-96">
      <h3 class="text-lg font-semibold mb-4">Write a Review</h3>

      <label>Rating</label>
      <input type="number" v-model="rating" min="1" max="5" class="border w-full mb-3" />

      <label>Comment</label>
      <textarea v-model="comment" class="border w-full mb-4"></textarea>

      <div class="flex justify-end gap-3">
        <button @click="emit('close')" class="px-3 py-1 border rounded">Cancel</button>

        <button @click="submitReview" class="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
