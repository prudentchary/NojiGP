import { StateCreator } from 'zustand';

export interface AlertSlice {
  alerts: any[];
  setAlerts: (alerts: any[]) => void;
}

export const createAlertSlice: StateCreator<AlertSlice> = (set) => ({
  alerts: [],
  setAlerts: (alerts) => set({ alerts }),
});