// Autor: Alejandro Arteaga

// Internal imports
import type { LoginDTO } from '@/dtos/auth/LoginDTO';
import type { RegisterUserDTO } from '@/dtos/auth/RegisterUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

type AuthResult = {
  success: boolean;
  message: string;
  user: UserInterface | null;
};

export class AuthService {
  private static ensureInitialized(): void {
    useUserStore().initializeUsers();
    useAuthStore().initializeAuth();
  }

  static initializeAuthStore(): void {
    this.ensureInitialized();
  }

  static getUsers(): UserInterface[] {
    this.ensureInitialized();
    return useUserStore().users;
  }

  static getActiveUser(): UserInterface | null {
    this.ensureInitialized();
    return useAuthStore().currentUser;
  }

  static registerUser(dto: RegisterUserDTO): AuthResult {
    this.ensureInitialized();
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const users = userStore.users;
    const normalizedEmail = dto.email.trim().toLowerCase();
    const normalizedUsername = dto.username.trim().toLowerCase();

    const duplicatedEmail = users.some((user) => user.email.toLowerCase() === normalizedEmail);
    if (duplicatedEmail) {
      return {
        success: false,
        message: 'The email is already registered.',
        user: null,
      };
    }

    const duplicatedUsername = users.some(
      (user) => user.username.toLowerCase() === normalizedUsername,
    );
    if (duplicatedUsername) {
      return {
        success: false,
        message: 'The username is already taken.',
        user: null,
      };
    }

    const newUser = this.createUserFromDTO({
      ...dto,
      email: normalizedEmail,
      username: dto.username.trim(),
      fullName: dto.fullName.trim(),
      password: dto.password,
    });

    const updatedUsers = [...users, newUser];
    userStore.setUsers(updatedUsers);
    authStore.setCurrentUser(newUser);

    return {
      success: true,
      message: 'User registered successfully.',
      user: newUser,
    };
  }

  static login(dto: LoginDTO): AuthResult {
    this.ensureInitialized();
    const users = useUserStore().users;
    const authStore = useAuthStore();
    const normalizedCredential = dto.usernameOrEmail.trim().toLowerCase();

    const matchedUser = users.find((user) => {
      const usernameMatch = user.username.toLowerCase() === normalizedCredential;
      const emailMatch = user.email.toLowerCase() === normalizedCredential;
      const passwordMatch = user.password === dto.password;

      return (usernameMatch || emailMatch) && passwordMatch;
    });

    if (!matchedUser) {
      return {
        success: false,
        message: 'Invalid credentials.',
        user: null,
      };
    }

    authStore.setCurrentUser(matchedUser);

    return {
      success: true,
      message: 'Login successful.',
      user: matchedUser,
    };
  }

  static logout(): void {
    this.ensureInitialized();
    useAuthStore().clearCurrentUser();
  }

  static loginAndSync(dto: LoginDTO): AuthResult {
    return this.login(dto);
  }

  static registerAndSync(dto: RegisterUserDTO): AuthResult {
    return this.registerUser(dto);
  }

  static logoutAndSync(): void {
    this.logout();
  }

  static isAuthenticated(): boolean {
    this.ensureInitialized();
    return useAuthStore().isAuthenticated;
  }

  static isAdmin(): boolean {
    this.ensureInitialized();
    return useAuthStore().currentUser?.role === 'admin';
  }

  private static createUserFromDTO(dto: RegisterUserDTO): UserInterface {
    return {
      id: crypto.randomUUID(),
      fullName: dto.fullName,
      email: dto.email,
      username: dto.username,
      password: dto.password,
      role: dto.role,
    };
  }
}
