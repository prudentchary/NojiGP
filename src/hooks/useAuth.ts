import { create } from 'zustand';
import api from '../lib/api'; 

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>; 
}

export const useAuth = create<AuthState>((set) => ({
 
  user: JSON.parse(localStorage.getItem('user_data') || 'null'),
  isAuthenticated: !!localStorage.getItem('auth_token'),

  login: (data) => {
    
    localStorage.setItem('user_data', JSON.stringify(data));

    set({ user: data, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data'); 
    set({ user: null, isAuthenticated: false });
  },

  fetchProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      const profileData = response.data;

      localStorage.setItem('user_data', JSON.stringify(profileData));
      set({ user: profileData, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      set({ user: null, isAuthenticated: false });
    }
  },
}));
