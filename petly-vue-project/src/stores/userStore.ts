// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { seedUsers } from '@/seeders/userSeeder';

const USERS_STORAGE_KEY = 'users';

export const useUserStore = defineStore('user', () => {
  const users = ref<UserInterface[]>([]);

  function initializeUsers(): void {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

    if (!storedUsers) {
      const seededUsers = seedUsers().map((user) => ({
        id: user.id ?? crypto.randomUUID(),
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
      }));

      users.value = seededUsers;
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seededUsers));
      return;
    }

    try {
      users.value = JSON.parse(storedUsers) as UserInterface[];
    } catch {
      const seededUsers = seedUsers().map((user) => ({
        id: user.id ?? crypto.randomUUID(),
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
      }));

      users.value = seededUsers;
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seededUsers));
    }
  }

  function setUsers(nextUsers: UserInterface[]): void {
    users.value = nextUsers;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
  }

  return { users, initializeUsers, setUsers };
});
