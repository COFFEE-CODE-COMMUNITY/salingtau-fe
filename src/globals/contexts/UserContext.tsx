import {createContext} from "react";

export interface User {
  id: string
}

export interface UserContextValue {
  user: User | null
  saveUser: (payload: User) => void
  clearUser: () => void
}

export const UserContext = createContext<UserContextValue | null>(null)