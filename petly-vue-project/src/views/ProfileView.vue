<script setup lang="ts">
// Autor: Alejandro Arteaga

// External imports
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import type { UpdateUserProfileDTO } from '@/dtos/user/UpdateUserProfileDTO';
import { useAuthStore } from '@/stores/authStore';

type ProfileDetail = {
  label: string;
  value: string;
};

const authStore = useAuthStore();
const router = useRouter();
const isEditing = ref<boolean>(false);
const feedbackMessage = ref<string>('');
const isSubmitting = ref<boolean>(false);

const editForm = reactive<UpdateUserProfileDTO>({
  fullName: '',
  email: '',
  username: '',
});

const currentUser = computed(() => authStore.activeUser);
const canSubmit = computed(() => {
  return (
    editForm.fullName.trim().length > 0 &&
    editForm.email.trim().length > 0 &&
    editForm.username.trim().length > 0
  );
});

const profileDetails = computed<ProfileDetail[]>(() => {
  if (!currentUser.value) {
    return [];
  }

  return [
    { label: 'Full Name', value: currentUser.value.fullName },
    { label: 'Username', value: currentUser.value.username },
    { label: 'Email', value: currentUser.value.email },
    { label: 'Role', value: currentUser.value.role === 'admin' ? 'Administrator' : 'User' },
  ];
});

function handleLogout(): void {
  authStore.logout();
  router.push({ name: 'login' });
}

function startEditing(): void {
  if (!currentUser.value) {
    return;
  }

  editForm.fullName = currentUser.value.fullName;
  editForm.email = currentUser.value.email;
  editForm.username = currentUser.value.username;
  feedbackMessage.value = '';
  isEditing.value = true;
}

function cancelEditing(): void {
  isEditing.value = false;
  feedbackMessage.value = '';
}

function submitProfileUpdate(): void {
  if (!canSubmit.value) {
    feedbackMessage.value = 'Please complete all fields.';
    return;
  }

  isSubmitting.value = true;
  const result = authStore.updateProfile({
    fullName: editForm.fullName,
    email: editForm.email,
    username: editForm.username,
  });
  isSubmitting.value = false;

  feedbackMessage.value = result.message;

  if (result.success) {
    isEditing.value = false;
  }
}
</script>

<template>
  <main class="profile-page">
    <section class="profile-card">
      <header class="profile-header">
        <div class="profile-avatar" aria-hidden="true">U</div>
        <div class="profile-title-row">
          <h1 class="app-title">User Profile</h1>
          <button
            class="btn-primary profile-edit-button"
            type="button"
            :disabled="isEditing"
            @click="startEditing"
          >
            Update Information
          </button>
        </div>
      </header>

      <form v-if="isEditing" class="profile-edit-form" @submit.prevent="submitProfileUpdate">
        <label for="profileFullName">Full Name</label>
        <input id="profileFullName" v-model="editForm.fullName" type="text" autocomplete="name" />

        <label for="profileEmail">Email</label>
        <input id="profileEmail" v-model="editForm.email" type="email" autocomplete="email" />

        <label for="profileUsername">Username</label>
        <input
          id="profileUsername"
          v-model="editForm.username"
          type="text"
          autocomplete="username"
        />

        <p v-if="feedbackMessage" class="profile-feedback">{{ feedbackMessage }}</p>

        <div class="profile-form-actions">
          <button class="btn-secondary profile-form-button" type="button" @click="cancelEditing">
            Cancel
          </button>
          <button
            class="btn-primary profile-form-button"
            type="submit"
            :disabled="isSubmitting || !canSubmit"
          >
            {{ isSubmitting ? 'Saving...' : 'Save changes' }}
          </button>
        </div>
      </form>

      <article class="profile-section">
        <h2 class="profile-section-title">General Information</h2>

        <dl class="profile-grid">
          <div v-for="detail in profileDetails" :key="detail.label" class="profile-row">
            <dt>{{ detail.label }}</dt>
            <dd>{{ detail.value }}</dd>
          </div>
        </dl>
      </article>

      <div class="profile-actions">
        <button class="btn-secondary profile-logout-button" type="button" @click="handleLogout">
          Logout
        </button>
      </div>
    </section>
  </main>
</template>
