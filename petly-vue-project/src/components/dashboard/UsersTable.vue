<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { AuthService } from '@/services/AuthService';

const users = ref<UserInterface[]>([]);
const pageSize = ref<number>(10);
const currentPage = ref<number>(1);

const totalPages = computed(() => Math.ceil(users.value.length / pageSize.value));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return users.value.slice(start, end);
});

function nextPage(): void {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage(): void {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

onMounted(() => {
  users.value = AuthService.getUsers();
});
</script>

<template>
  <div class="bg-white shadow rounded-xl p-6">
    <!-- header -->

    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-lg">Users</h3>

      <select v-model="pageSize" class="border p-2 rounded">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="30">30</option>
        <option :value="50">50</option>
      </select>
    </div>

    <!-- table -->

    <table class="w-full">
      <thead>
        <tr class="text-left border-b">
          <th class="py-2">ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in paginatedUsers" :key="u.id" class="border-b hover:bg-gray-50">
          <td class="py-2">{{ u.id }}</td>
          <td>{{ u.fullName }}</td>
          <td>{{ u.email }}</td>
        </tr>
      </tbody>
    </table>

    <!-- pagination -->

    <div class="flex justify-between items-center mt-4">
      <button
        @click="prevPage"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        :disabled="currentPage === 1"
      >
        Previous
      </button>

      <span> Page {{ currentPage }} of {{ totalPages }} </span>

      <button
        @click="nextPage"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>
