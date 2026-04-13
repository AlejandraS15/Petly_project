<script setup lang="ts">
// Autor: Alejandro Arteaga

// External imports
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';

const router = useRouter();

const form = reactive({
  usernameOrEmail: '',
  password: '',
});

const feedbackMessage = ref<string>('');
const isSubmitting = ref<boolean>(false);

const canSubmit = computed(() => {
  return form.usernameOrEmail.trim().length > 0 && form.password.trim().length > 0;
});

function resolveRedirect(): { name: 'home' | 'dashboard' } {
  return AuthService.getActiveUser()?.role === 'admin' ? { name: 'dashboard' } : { name: 'home' };
}

function handleLogin(): void {
  if (!canSubmit.value) {
    feedbackMessage.value = 'Please complete all fields.';
    return;
  }

  isSubmitting.value = true;
  const result = AuthService.loginAndSync({
    usernameOrEmail: form.usernameOrEmail,
    password: form.password,
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
      <section class="auth-card login-card">
        <img src="@/assets/logo.svg" alt="Petly logo" class="auth-logo" />
        <h1 class="app-title">Welcome Back</h1>
        <p class="auth-subtitle">Login with your credentials to continue.</p>

        <form class="auth-form" @submit.prevent="handleLogin">
          <label for="credential">Username or Email</label>
          <input
            id="credential"
            v-model="form.usernameOrEmail"
            type="text"
            placeholder="Enter your username or email"
            autocomplete="username"
          />

          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
          />

          <p v-if="feedbackMessage" class="auth-error">{{ feedbackMessage }}</p>

          <button class="btn-primary auth-button" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="auth-redirect">
          Do not have an account?
          <RouterLink :to="{ name: 'register' }">Create one</RouterLink>
        </p>
      </section>

      <div class="auth-image-side">
        <img src="@/assets/authdog.png" alt="Petly dog" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.login-card {
  width: min(100%, 460px);
}
</style>
