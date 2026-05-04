import { useAppStore } from '../store'; // Impoting the Zustand from store/uaeAuth 


export const useAuth = <T>(selector: (state: any) => T = (state: any) => state as T): T => {
  return useAppStore(selector);
};