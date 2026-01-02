import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  hasAcceptedTerms: boolean;
  setUser: (user: User | null) => void;
  setIsGuest: (isGuest: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasAcceptedTerms: (accepted: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isGuest: false,
  isLoading: true,
  hasAcceptedTerms: false,
  setUser: (user) => set({ user }),
  setIsGuest: (isGuest) => set({ isGuest }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setHasAcceptedTerms: (hasAcceptedTerms) => set({ hasAcceptedTerms }),
  logout: () => set({ user: null, isGuest: false }),
}));
