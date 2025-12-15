import { persist } from "zustand/middleware";
import { create } from "zustand";
import type { User, UserRole } from "@/utils/user-context.tsx";

interface UserStore {
  user: User | null;
  roles: UserRole[];
  activeRole: UserRole | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setActiveRole: (role: string) => void;
  clearActiveRole: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      roles: [],
      activeRole: null,

      setUser: (user) => {
        const prevActiveRole = get().activeRole;
        const roles = user.roles || [];

        let newActiveRole: UserRole | null = null;

        if (roles.length === 1) {
          newActiveRole = roles[0];
        } else if (roles.length > 1) {
          newActiveRole = roles.includes(prevActiveRole!)
            ? prevActiveRole
            : roles[0];
        }

        set({
          user,
          roles,
          activeRole: newActiveRole,
        });
      },

      clearUser: () => set({ user: null, roles: [], activeRole: null }),

      setActiveRole: (role) => {
        const { roles } = get();
        if (roles.includes(role as UserRole)) {
          set({ activeRole: role as UserRole });
        }
      },

      clearActiveRole: () => set({ activeRole: null }),
    }),
    {
      name: "user-store",
    }
  )
);
