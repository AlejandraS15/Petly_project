// Autor: Alejandro Arteaga

import type { CreateUserDTO } from '@/dtos/auth/CreateUserDTO';

export function seedUsers(): CreateUserDTO[] {
  return [
    {
      id: 'u1',
      fullName: 'Administrador Petly',
      email: 'admin@petly.co',
      username: 'admin',
      password: 'Admin123*',
      role: 'admin',
    },
    {
      id: 'u2',
      fullName: 'Usuario Demo',
      email: 'user@petly.co',
      username: 'userdemo',
      password: 'User123*',
      role: 'user',
    },
    {
      id: 'u3',
      fullName: 'Usuario Invitado',
      email: 'guest@petly.co',
      username: 'guestuser',
      password: 'Guest123*',
      role: 'user',
    },
  ];
}
