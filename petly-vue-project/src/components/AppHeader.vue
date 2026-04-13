<script setup lang="ts">
// Autores: Camila Velez, Alejandra Suarez & Alejandro Arteaga

// External imports
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink, useRouter } from 'vue-router';

// Internal imports
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/authStore';

type MenuOption = {
  id: 'profile' | 'categories' | 'dashboard' | 'login' | 'register' | 'domesticAnimalNew';
  label: string;
  icon: string;
};

const authStore = useAuthStore();
const { isAuthenticated, currentUser } = storeToRefs(authStore);
const router = useRouter();

const dropdownOpen = ref<boolean>(false);
const menuContainerRef = ref<HTMLElement | null>(null);

const menuOptions = computed<MenuOption[]>(() => {
  if (!currentUser.value) {
    return [
      { id: 'login', label: 'Sign In', icon: '->' },
      { id: 'register', label: 'Create Account', icon: '+' },
      { id: 'categories', label: 'Categories', icon: 'o' },
    ];
  }

  if (currentUser.value.role === 'admin') {
    return [
      { id: 'profile', label: 'Profile', icon: 'o' },
      { id: 'dashboard', label: 'Admin Dashboard', icon: '[]' },
      { id: 'domesticAnimalNew', label: 'New Domestic Animal', icon: '+' },
      { id: 'categories', label: 'Categories', icon: 'o' },
    ];
  }

  return [
    { id: 'profile', label: 'Profile', icon: 'o' },
    { id: 'categories', label: 'Categories', icon: 'o' },
  ];
});

function toggleDropdown(): void {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown(): void {
  dropdownOpen.value = false;
}

async function goToOption(optionId: MenuOption['id']): Promise<void> {
  closeDropdown();

  if (optionId === 'profile') {
    await router.push({ name: 'profile' });
    return;
  }

  if (optionId === 'categories') {
    await router.push({ name: 'home', hash: '#categories-section' });
    return;
  }

  if (optionId === 'dashboard') {
    await router.push({ name: 'dashboard' });
    return;
  }

  if (optionId === 'login') {
    await router.push({ name: 'login' });
    return;
  }

  if (optionId === 'domesticAnimalNew') {
    await router.push({ name: 'domesticAnimalNew' });
    return;
  }

  await router.push({ name: 'register' });
}

function handleOutsideClick(event: MouseEvent): void {
  const menuContainer = menuContainerRef.value;

  if (!menuContainer) {
    return;
  }

  if (!menuContainer.contains(event.target as Node)) {
    closeDropdown();
  }
}

// Emits
const emit = defineEmits<{
  (e: 'search', value: string): void;
}>();

function handleSearch(query: string): void {
  emit('search', query);
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<template>
  <header class="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-4">
      <RouterLink :to="{ name: 'home' }">
        <img src="@/assets/logo.svg" alt="Petly logo" width="50" height="50" />
      </RouterLink>
    </div>

    <!-- Search -->
    <div class="w-full sm:w-96">
      <SearchBar @search="handleSearch" />
    </div>

    <!-- Nav -->
    <nav class="flex items-center gap-3">
      <RouterLink v-if="isAuthenticated" :to="{ name: 'profile' }" class="header-nav-link">
        {{ currentUser?.username }}
      </RouterLink>

      <div ref="menuContainerRef" class="header-dropdown">
        <button
          class="header-menu-button"
          type="button"
          aria-label="Open menu"
          @click.stop="toggleDropdown"
        >
          <span v-if="!dropdownOpen" class="header-menu-icon">=</span>
          <span v-else class="header-menu-icon">x</span>
        </button>

        <ul v-if="dropdownOpen" class="header-dropdown-menu">
          <li v-for="option in menuOptions" :key="option.id">
            <button type="button" class="header-dropdown-item" @click="goToOption(option.id)">
              <span class="header-dropdown-icon">{{ option.icon }}</span>
              <span>{{ option.label }}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
