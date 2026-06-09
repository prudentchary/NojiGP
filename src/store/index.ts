// src/store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createAlertSlice, AlertSlice } from './slices/alertSlice';

// Master state type consisting only of active slices
type AppStoreState = AuthSlice & AlertSlice;

export const useAppStore = create<AppStoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createAlertSlice(...a),
    }),
    {
      name: 'noji-app-storage', // Key name used inside browser localStorage
    }
  )
);