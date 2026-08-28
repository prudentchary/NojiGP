// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('auth_token');

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       const currentPath = window.location.pathname;
//       const isAuthPage = currentPath === "/login" || currentPath === "/verify-otp";

//       if (!isAuthPage) {
//         console.error("Session expired or unauthorized. Logging out...");
//         localStorage.removeItem("auth_token");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from 'axios';

// 1. Configure default Axios instance with standard headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Dynamically attach Bearer token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Handle global errors and unauthorized (401) states
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;

      // Exclude authentication and account management pages from auto-redirecting on failure
      const isAuthPage =
        currentPath === '/login' ||
        currentPath === '/verify-otp' ||
        currentPath.includes('change-password');

      if (!isAuthPage) {
        console.error('Session expired or unauthorized. Logging out...');
        
        // Clear cached auth tokens
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        
        // Redirect to login page
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;