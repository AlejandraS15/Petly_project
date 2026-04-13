// Autor: Alejandro Arteaga

// External imports
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

const ACTIVE_USER_STORAGE_KEY = 'activeUser';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(null);

  const isAuthenticated = computed(() => currentUser.value !== null);

  function initializeAuth(): void {
    const storedUser = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);

    if (!storedUser) {
      currentUser.value = null;
      return;
    }

    try {
      currentUser.value = JSON.parse(storedUser) as UserInterface;
    } catch {
      currentUser.value = null;
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    }
  }

  function setCurrentUser(user: UserInterface | null): void {
    currentUser.value = user;

    if (!user) {
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
      return;
    }

    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(user));
  }

  function clearCurrentUser(): void {
    setCurrentUser(null);
  }

  return {
    currentUser,
    isAuthenticated,
    initializeAuth,
    setCurrentUser,
    clearCurrentUser,
  };
});
