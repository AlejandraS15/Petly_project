<script setup lang="ts">
import { ref, computed } from 'vue'

const users = ref([
  { id: 1, name: 'Ana', email: 'ana@mail.com' },
  { id: 2, name: 'Luis', email: 'luis@mail.com' },
  { id: 3, name: 'Pedro', email: 'pedro@mail.com' },
  { id: 4, name: 'Maria', email: 'maria@mail.com' },
  { id: 5, name: 'Carlos', email: 'carlos@mail.com' },
  { id: 6, name: 'Lucia', email: 'lucia@mail.com' },
  { id: 7, name: 'Juan', email: 'juan@mail.com' },
  { id: 8, name: 'Laura', email: 'laura@mail.com' },
  { id: 9, name: 'Diego', email: 'diego@mail.com' },
  { id: 10, name: 'Sara', email: 'sara@mail.com' },
  { id: 11, name: 'Camilo', email: 'camilo@mail.com' },
  { id: 12, name: 'Elena', email: 'elena@mail.com' },
])

const pageSize = ref(10)
const currentPage = ref(1)

/*
Total páginas
*/
const totalPages = computed(() => {
  return Math.ceil(users.value.length / pageSize.value)
})

/*
Usuarios paginados
*/
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value

  return users.value.slice(start, end)
})

/*
Cambiar página
*/
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
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
          <td>{{ u.name }}</td>
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
