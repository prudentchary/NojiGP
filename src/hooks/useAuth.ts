// src/hooks/useAuth.ts
import { useAppStore } from '../store';

// This makes the rest of your app think nothing changed!
export const useAuth = () => {
  return useAppStore();
};