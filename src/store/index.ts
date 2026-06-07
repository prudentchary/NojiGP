// src/store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createThemeSlice, ThemeSlice } from './slices/themeSlice';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createAlertSlice, AlertSlice } from './slices/alertSlice';

// Combine all your slice interfaces into one master state type
type AppStoreState = ThemeSlice & AuthSlice & AlertSlice;

export const useAppStore = create<AppStoreState>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createAuthSlice(...a),
      ...createAlertSlice(...a),
    }),
    {
      name: 'noji-app-storage', // Key name used inside browser localStorage
      
      // CRITICAL: Tells Zustand to ONLY save the theme state to memory.
      // This ensures user sessions clear safely, but themes stay forever!
      partialize: (state) => ({ isDarkMode: state.isDarkMode }), 
    }
  )
);