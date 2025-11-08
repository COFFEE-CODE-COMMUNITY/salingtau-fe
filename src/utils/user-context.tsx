import {createContext, useContext} from "react"

export enum Language {
  ENGLISH_US = "en-US",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
}

export interface ImageMetadata {
  url: string
  width: number
  height: number
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  headline?: string
  biography?: string
  language: Language
  profilePictures?: ImageMetadata[]
  websiteUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  tiktokUrl?: string
  xUrl?: string
  youtubeUrl?: string
  status: UserStatus
  lastLoggedInAt?: string
  roles: UserRole[]
  createdAt: string
  updatedAt: string
}

interface UserContextValue {
  user: User | null
  saveUser: (user: User) => void
  clearUser: () => void
  loading: boolean
}

export const UserContext = createContext<UserContextValue | null>(null)

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

