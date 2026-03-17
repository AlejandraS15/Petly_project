// Autor: Alejandro Arteaga

import type { Role } from '@/interfaces/UserInterface'

export type RegisterUserDTO = {
  fullName: string
  email: string
  username: string
  password: string
  role: Role
}
