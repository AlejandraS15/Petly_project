import type { ReviewInterface } from './reviewInterface'

export interface UserInterface {
  id: string
  fullName: string
  email: string
  role: Role
  username: string
  password: string
  reviews: ReviewInterface[]
}

export type Role = 'admin' | 'user'