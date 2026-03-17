// Autor: Alejandro Arteaga

// Autor: Alejandro Arteaga

// Internal imports
import type { CreateUserDTO } from '@/dtos/auth/CreateUserDTO'
import type { LoginDTO } from '@/dtos/auth/LoginDTO'
import type { RegisterUserDTO } from '@/dtos/auth/RegisterUserDTO'
import type { UserInterface } from '@/interfaces/UserInterface'
import { seedUsers } from '@/seeders/userSeeder'

const USERS_STORAGE_KEY = 'users'
const ACTIVE_USER_STORAGE_KEY = 'activeUser'

type AuthResult = {
  success: boolean
  message: string
  user: UserInterface | null
}

export class AuthService {
  static getUsers(): UserInterface[] {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)

    if (!storedUsers) {
      const seededUsers = seedUsers().map((user) => this.createUserFromDTO(user))
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seededUsers))
      return seededUsers
    }

    try {
      return JSON.parse(storedUsers) as UserInterface[]
    } catch {
      const seededUsers = seedUsers().map((user) => this.createUserFromDTO(user))
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seededUsers))
      return seededUsers
    }
  }

  static getActiveUser(): UserInterface | null {
    const storedUser = localStorage.getItem(ACTIVE_USER_STORAGE_KEY)

    if (!storedUser) {
      return null
    }

    try {
      return JSON.parse(storedUser) as UserInterface
    } catch {
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY)
      return null
    }
  }

  static registerUser(dto: RegisterUserDTO): AuthResult {
    const users = this.getUsers()
    const normalizedEmail = dto.email.trim().toLowerCase()
    const normalizedUsername = dto.username.trim().toLowerCase()

    const duplicatedEmail = users.some((user) => user.email.toLowerCase() === normalizedEmail)
    if (duplicatedEmail) {
      return {
        success: false,
        message: 'The email is already registered.',
        user: null,
      }
    }

    const duplicatedUsername = users.some(
      (user) => user.username.toLowerCase() === normalizedUsername,
    )
    if (duplicatedUsername) {
      return {
        success: false,
        message: 'The username is already taken.',
        user: null,
      }
    }

    const newUser = this.createUserFromDTO({
      ...dto,
      email: normalizedEmail,
      username: dto.username.trim(),
      fullName: dto.fullName.trim(),
      password: dto.password,
    })

    const updatedUsers = [...users, newUser]
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers))
    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(newUser))

    return {
      success: true,
      message: 'User registered successfully.',
      user: newUser,
    }
  }

  static login(dto: LoginDTO): AuthResult {
    const users = this.getUsers()
    const normalizedCredential = dto.usernameOrEmail.trim().toLowerCase()

    const matchedUser = users.find((user) => {
      const usernameMatch = user.username.toLowerCase() === normalizedCredential
      const emailMatch = user.email.toLowerCase() === normalizedCredential
      const passwordMatch = user.password === dto.password

      return (usernameMatch || emailMatch) && passwordMatch
    })

    if (!matchedUser) {
      return {
        success: false,
        message: 'Invalid credentials.',
        user: null,
      }
    }

    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(matchedUser))

    return {
      success: true,
      message: 'Login successful.',
      user: matchedUser,
    }
  }

  static logout(): void {
    localStorage.removeItem(ACTIVE_USER_STORAGE_KEY)
  }

  static isAuthenticated(): boolean {
    return this.getActiveUser() !== null
  }

  private static createUserFromDTO(dto: CreateUserDTO): UserInterface {
    return {
      id: crypto.randomUUID(),
      fullName: dto.fullName,
      email: dto.email,
      username: dto.username,
      password: dto.password,
      role: dto.role,
    }
  }
}
