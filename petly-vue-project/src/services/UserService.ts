// Autor: Alejandro Arteaga

// Internal imports
import type { UpdateUserProfileDTO } from '@/dtos/user/UpdateUserProfileDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { AuthService } from '@/services/AuthService';

const USERS_STORAGE_KEY = 'users';
const ACTIVE_USER_STORAGE_KEY = 'activeUser';

type UserUpdateResult = {
  success: boolean;
  message: string;
  user: UserInterface | null;
};

export class UserService {
  static updateActiveUserProfile(payload: UpdateUserProfileDTO): UserUpdateResult {
    const activeUser = AuthService.getActiveUser();

    if (!activeUser) {
      return {
        success: false,
        message: 'No authenticated user found.',
        user: null,
      };
    }

    const users = AuthService.getUsers();
    const normalizedFullName = payload.fullName.trim();
    const normalizedEmail = payload.email.trim().toLowerCase();
    const normalizedUsername = payload.username.trim();

    if (!normalizedFullName || !normalizedEmail || !normalizedUsername) {
      return {
        success: false,
        message: 'Please complete all profile fields.',
        user: activeUser,
      };
    }

    const duplicatedEmail = users.some(
      (user) => user.id !== activeUser.id && user.email.toLowerCase() === normalizedEmail,
    );

    if (duplicatedEmail) {
      return {
        success: false,
        message: 'The email is already registered.',
        user: activeUser,
      };
    }

    const duplicatedUsername = users.some(
      (user) =>
        user.id !== activeUser.id &&
        user.username.toLowerCase() === normalizedUsername.toLowerCase(),
    );

    if (duplicatedUsername) {
      return {
        success: false,
        message: 'The username is already taken.',
        user: activeUser,
      };
    }

    const updatedUser: UserInterface = {
      ...activeUser,
      fullName: normalizedFullName,
      email: normalizedEmail,
      username: normalizedUsername,
    };

    const updatedUsers = users.map((user) => (user.id === activeUser.id ? updatedUser : user));

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(updatedUser));

    return {
      success: true,
      message: 'Profile updated successfully.',
      user: updatedUser,
    };
  }
}
