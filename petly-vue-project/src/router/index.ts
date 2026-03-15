// Autor: Nombre Apellido

// External imports
import { createRouter, createWebHistory } from 'vue-router'

// Internal imports
import { AuthService } from '@/services/AuthService'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PetDetailView from '@/views/PetDetailView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Petly | Home',
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: 'Petly | Dashboard',
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Petly | Login',
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Petly | Register',
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
    {
      path: '/pet/:id',
      name: 'petDetail',
      component: PetDetailView,
      meta: {
        title: 'Petly | Pet Detail',
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        title: 'Petly | Profile',
        requiresAuth: true,
        requiresAdmin: false,
      },
    },
  ],
})

router.beforeEach((to) => {
  document.title = String(to.meta.title ?? 'Petly')

  const isLoggedIn = AuthService.isAuthenticated()
  const activeUser = AuthService.getActiveUser()
  const requiresAuth = Boolean(to.meta.requiresAuth)
  const requiresAdmin = Boolean(to.meta.requiresAdmin)
  const isAuthPage = to.name === 'login' || to.name === 'register'

  if (requiresAuth && !isLoggedIn) {
    return { name: 'login' }
  }

  if (requiresAdmin && activeUser?.role !== 'admin') {
    return { name: 'home' }
  }

  if (isAuthPage && isLoggedIn) {
    return { name: activeUser?.role === 'admin' ? 'dashboard' : 'home' }
  }

  return true
})

export default router
