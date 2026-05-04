import { create } from 'zustand';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createThemeSlice, ThemeSlice } from './slices/themeSlice';
import { createAlertSlice, AlertSlice } from './slices/alertSlice';

// Combine Types Already exist 
type AppStore = AuthSlice & ThemeSlice & AlertSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createThemeSlice(...a),
  ...createAlertSlice(...a),
}));