<script setup lang="ts">
// External
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// Internal
import { useAuthStore } from '@/stores/authStore'

type MenuOption = {
  id: 'profile' | 'categories' | 'dashboard' | 'login' | 'register'
  label: string
  icon: string
}

// Variables
const searchQuery = ref<string>('')
const isMenuOpen = ref<boolean>(false)
const menuContainerRef = ref<HTMLElement | null>(null)
const router = useRouter()
const authStore = useAuthStore()

// Emits
const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

function handleInput(): void {
  emit('search', searchQuery.value)
}

const menuOptions = computed<MenuOption[]>(() => {
  if (!authStore.activeUser) {
    return [
      { id: 'login', label: 'Iniciar sesion', icon: '->' },
      { id: 'register', label: 'Crear cuenta', icon: '+' },
      { id: 'categories', label: 'Categorias', icon: '🐾' },
    ]
  }

  if (authStore.activeUser.role === 'admin') {
    return [
      { id: 'dashboard', label: 'Panel admin', icon: '▦' },
      { id: 'profile', label: 'Perfil', icon: '◉' },
      { id: 'categories', label: 'Categorias', icon: '🐾' },
    ]
  }

  return [
    { id: 'profile', label: 'Perfil', icon: '◉' },
    { id: 'categories', label: 'Categorias', icon: '🐾' },
  ]
})

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
  isMenuOpen.value = false
}

async function goToOption(optionId: MenuOption['id']): Promise<void> {
  closeMenu()

  if (optionId === 'profile') {
    await router.push({ name: 'profile' })
    return
  }

  if (optionId === 'categories') {
    await router.push({ name: 'home', hash: '#categories-section' })
    return
  }

  if (optionId === 'dashboard') {
    await router.push({ name: 'dashboard' })
    return
  }

  if (optionId === 'login') {
    await router.push({ name: 'login' })
    return
  }

  await router.push({ name: 'register' })
}

function handleOutsideClick(event: MouseEvent): void {
  const menuContainer = menuContainerRef.value

  if (!menuContainer) {
    return
  }

  if (!menuContainer.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div class="flex items-center justify-between w-full py-4">
    <div class="flex items-center gap-4">
      <div class="relative">
        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for pets..."
          class="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
          @input="handleInput"
        />
      </div>
      <div ref="menuContainerRef" class="relative">
        <button
          type="button"
          class="h-9 w-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
          aria-label="Abrir menu"
          @click.stop="toggleMenu"
        >
          <span v-if="!isMenuOpen" class="text-lg leading-none"> = </span>
          <span v-else class="text-lg leading-none"> x </span>
        </button>

        <div
          v-if="isMenuOpen"
          class="absolute right-0 top-11 z-20 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          <button
            v-for="option in menuOptions"
            :key="option.id"
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            @click="goToOption(option.id)"
          >
            <span class="w-4">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
