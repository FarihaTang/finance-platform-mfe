import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: '1',
    name: 'Fariha Tang',
    email: 'fariha@example.com',
  },
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
