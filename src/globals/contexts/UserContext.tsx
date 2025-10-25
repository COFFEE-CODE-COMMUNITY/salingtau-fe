import { createContext, useContext } from "react"

export interface User {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  headline?: string
  biography?: string
  profilePictureUrl?: string
  language?: string
}

export interface UserContextValue {
  user: User | null
  saveUser: (payload: User) => void
  clearUser: () => void
}

export const UserContext = createContext<UserContextValue | null>(null)

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
