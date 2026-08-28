import { StateCreator } from 'zustand'; //state management library
import api from '../../lib/api'; 

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
  console.log("DEBUG: Logging in user payload", data);

  // Extract the token from all common backend payload structures
  const token = 
    data.token || 
    data.accessToken || 
    data.data?.token || 
    data.data?.accessToken;

  //  Extract the user object safely from response wrapper
  const userData = data.user || data.data?.user || data;

  // Save the token as a standalone string key in localStorage
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    console.error("DEBUG WARNING: No token found in login response payload!", data);
  }

  localStorage.setItem('user_data', JSON.stringify(userData));

  // Update Zustand state
  set({ user: userData, isAuthenticated: true });
},
 resendOtp: async (email: string) => {
    const response = await api.post("/auth/resend-otp", { email });
    return response.data;
  },
 
// log out
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    set({ user: null, isAuthenticated: false });
//clear everything in the console after log out 
  console.clear();
  },

 
fetchProfile: async () => {
  const token = localStorage.getItem('auth_token');
  
  if (!token) return;

  try {
    const response = await api.get('/auth/profile');
    const profileData = response.data?.data || response.data;

    localStorage.setItem('user_data', JSON.stringify(profileData));
    set({ user: profileData, isAuthenticated: true });
  } catch (error: any) {
    console.error("fetchProfile failed:", error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      set({ user: null, isAuthenticated: false });
    }
  }
},
});