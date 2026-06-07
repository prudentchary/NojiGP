import { StateCreator } from 'zustand'; //state management library
import api from '../../lib/api'; // import API 

export interface AuthSlice {
  user: any | null;
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
 
  user: JSON.parse(localStorage.getItem('user_data') || 'null'),
  isAuthenticated: !!localStorage.getItem('auth_token'),

  // log in     

  login: (data: any) => {
    console.log("DEBUG: Logging in user", data);
    localStorage.setItem('user_data', JSON.stringify(data));
    if (data.token || data.accessToken) {
      localStorage.setItem('auth_token', data.token || data.accessToken);
    }
    set({ user: data, isAuthenticated: true });
  },
 
// log out
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    set({ user: null, isAuthenticated: false });
//clear everything in the console after log out 
  console.clear();
  },
  //fetching profile data to keep the user state updated, especially after page refreshes or when the app initializes

  fetchProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      const profileData = response.data;
      localStorage.setItem('user_data', JSON.stringify(profileData));
      set({ user: profileData, isAuthenticated: true });
    } catch (error: any) {
      console.error("fetchProfile error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        set({ user: null, isAuthenticated: false });
      }
    }
  },
});