import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === "/login" || currentPath === "/verify-otp";

      if (!isAuthPage) {
        console.error("Session expired or unauthorized. Logging out...");
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;