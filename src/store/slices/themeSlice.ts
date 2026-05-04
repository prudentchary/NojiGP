import { StateCreator } from 'zustand';

export interface ThemeSlice {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  // Detect current mode on load
  isDarkMode: document.documentElement.classList.contains('dark'),
  
  toggleTheme: () => set((state) => {
    const nextMode = !state.isDarkMode;
    // Physical DOM update so the screen actually changes
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: nextMode };
  }),
});