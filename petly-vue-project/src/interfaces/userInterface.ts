// Autor: Alejandro Arteaga

export interface UserInterface {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  username: string;
  password: string;
}

export type Role = 'admin' | 'user';
