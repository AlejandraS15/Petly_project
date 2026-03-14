// Autor: Nombre Apellido

import type { CreateUserDTO } from '@/dtos/auth/CreateUserDTO'

export function seedUsers(): CreateUserDTO[] {
  return [
    {
      fullName: 'Administrador Petly',
      email: 'admin@petly.co',
      username: 'admin',
      password: 'Admin123*',
      role: 'admin',
    },
    {
      fullName: 'Usuario Demo',
      email: 'user@petly.co',
      username: 'userdemo',
      password: 'User123*',
      role: 'user',
    },
  ]
}
