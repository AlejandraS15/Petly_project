<script setup lang="ts">
// Autor: Nombre Apellido

// External imports
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import type { Role } from '@/interfaces/UserInterface';
import { AuthService } from '@/services/AuthService';

const router = useRouter();

const form = reactive({
  fullName: '',
  email: '',
  username: '',
  password: '',
  role: 'user' as Role,
});

const feedbackMessage = ref<string>('');
const isSubmitting = ref<boolean>(false);

const canSubmit = computed(() => {
  return (
    form.fullName.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.username.trim().length > 0 &&
    form.password.trim().length > 0
  );
});

function resolveRedirect(): { name: 'home' | 'dashboard' } {
  return AuthService.getActiveUser()?.role === 'admin' ? { name: 'dashboard' } : { name: 'home' };
}

function handleRegister(): void {
  if (!canSubmit.value) {
    feedbackMessage.value = 'Please complete all fields.';
    return;
  }

  isSubmitting.value = true;
  const result = AuthService.registerAndSync({
    fullName: form.fullName,
    email: form.email,
    username: form.username,
    password: form.password,
    role: form.role,
  });
  isSubmitting.value = false;

  if (!result.success) {
    feedbackMessage.value = result.message;
    return;
  }

  feedbackMessage.value = '';
  router.push(resolveRedirect());
}

AuthService.initializeAuthStore();

if (AuthService.isAuthenticated()) {
  router.replace(resolveRedirect());
}
</script>

<template>
  <main class="auth-page">
    <div class="auth-wrapper">
      <section class="auth-card register-card">
        <img src="@/assets/logo.svg" alt="Petly logo" class="auth-logo" />
        <h1 class="app-title">Create Account</h1>
        <p class="auth-subtitle">Register and start using Petly.</p>

        <form class="auth-form" @submit.prevent="handleRegister">
          <label for="fullName">Full Name</label>
          <input id="fullName" v-model="form.fullName" type="text" autocomplete="name" />

          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" />

          <label for="username">Username</label>
          <input id="username" v-model="form.username" type="text" autocomplete="username" />

          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
          />

          <label for="role">Role</label>
          <select id="role" v-model="form.role">
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>

          <p v-if="feedbackMessage" class="auth-error">{{ feedbackMessage }}</p>

          <button class="btn-primary auth-button" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>
        </form>

        <p class="auth-redirect">
          Already have an account?
          <RouterLink :to="{ name: 'login' }">Sign in</RouterLink>
        </p>
      </section>

      <div class="auth-image-side">
        <img src="@/assets/authdog.png" alt="Petly dog" />
      </div>
    </div>
  </main>
</template>
