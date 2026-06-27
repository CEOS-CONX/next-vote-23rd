import { create } from 'zustand';
import { API_ROUTES } from '@/constants/api';

interface User {
  name: string;
  part: string;
  team: string;
}

interface SignupData {
  part: string;
  team: string;
  username: string;
  userId: string;
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (userId: string, password: string) => Promise<{ success: boolean; error?: string; errCode?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string; errCode?: string }>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  login: async (userId, password) => {
    try {
      const res = await fetch(API_ROUTES.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userLoginId: userId, password }),
      });
      const data = await res.json();
      if (res.ok) {
        set({ isAuthenticated: true, user: data.user });
        return { success: true };
      }
      return { success: false, error: data.message, errCode: data.errCode };
    } catch {
      return { success: false, error: '네트워크 오류가 발생했습니다.' };
    }
  },

  signup: async (signupData) => {
    try {
      const res = await fetch(API_ROUTES.auth.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true };
      }
      return { success: false, error: data.message, errCode: data.errCode };
    } catch {
      return { success: false, error: '네트워크 오류가 발생했습니다.' };
    }
  },

  logout: async () => {
    await fetch(API_ROUTES.auth.logout, { method: 'POST' });
    set({ isAuthenticated: false, user: null });
  },

  hydrate: async () => {
    try {
      const res = await fetch(API_ROUTES.auth.me);
      if (res.ok) {
        const data = await res.json();
        set({ isAuthenticated: data.authenticated, user: data.user, isLoading: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },
}));
