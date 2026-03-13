import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import DashboardView from '@/views/DashboardView.vue'
import PetDetailView from '@/views/PetDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
  path: "/",
  name: "home",
  component: HomeView,
  meta: {
    title: "Home"
  }
},
    {
  path: "/dashboard",
  name: "dashboard",
  component: DashboardView,
  meta: {
    title: "Dashboard"
  }
},
    {
  path: "/pet/:id",
  name: "petDetail",
  component: PetDetailView
}
  ]
})

export default router
