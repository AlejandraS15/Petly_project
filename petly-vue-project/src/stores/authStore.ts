// Autor: Alejandro Arteaga

// External imports
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// Internal imports
import type { LoginDTO } from '@/dtos/auth/LoginDTO'
import type { RegisterUserDTO } from '@/dtos/auth/RegisterUserDTO'
import type { UpdateUserProfileDTO } from '@/dtos/user/UpdateUserProfileDTO'
import type { UserInterface } from '@/interfaces/UserInterface'
import { AuthService } from '@/services/AuthService'
import { UserService } from '@/services/UserService'

type AuthOperationResult = {
  success: boolean
  message: string
}

export const useAuthStore = defineStore('auth', () => {
  const activeUser = ref<UserInterface | null>(null)

  const isAuthenticated = computed(() => activeUser.value !== null)
  const isAdmin = computed(() => activeUser.value?.role === 'admin')

  function initializeAuth(): void {
    activeUser.value = AuthService.getActiveUser()
    AuthService.getUsers()
  }

  function login(credentials: LoginDTO): AuthOperationResult {
    const result = AuthService.login(credentials)

    activeUser.value = result.user

    return {
      success: result.success,
      message: result.message,
    }
  }

  function register(payload: RegisterUserDTO): AuthOperationResult {
    const result = AuthService.registerUser(payload)

    activeUser.value = result.user

    return {
      success: result.success,
      message: result.message,
    }
  }

  function logout(): void {
    AuthService.logout()
    activeUser.value = null
  }

  function updateProfile(payload: UpdateUserProfileDTO): AuthOperationResult {
    const result = UserService.updateActiveUserProfile(payload)

    activeUser.value = result.user

    return {
      success: result.success,
      message: result.message,
    }
  }

  return {
    activeUser,
    isAuthenticated,
    isAdmin,
    initializeAuth,
    login,
    register,
    logout,
    updateProfile,
  }
})
