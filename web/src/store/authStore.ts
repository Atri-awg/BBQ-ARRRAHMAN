import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  profile?: {
    phoneNumber?: string;
    address?: string;
    gender?: string;
    photoUrl?: string;
    bio?: string;
  };
  roles: {
    id: string;
    name: string;
    description?: string;
  }[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => 
        set({ user, isAuthenticated: true }),

      setToken: (token) => 
        set({ token }),

      login: (user, token) => 
        set({ 
          user, 
          token, 
          isAuthenticated: true 
        }),

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      },

      updateUser: (updates) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      hasRole: (role) => {
        const { user } = get();
        return user?.roles?.some(r => r.name === role) ?? false;
      },

      hasAnyRole: (roles) => {
        const { user } = get();
        return user?.roles?.some(r => roles.includes(r.name)) ?? false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);