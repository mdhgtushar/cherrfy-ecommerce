// util/API.js
import axios from 'axios';

let onUnauthorized = null;
let isHandlingUnauthorized = false;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const API = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'https://api.cherrfy.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

API.interceptors.request.use((config) => {
  // Prefer adminToken if available
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');
  const token = adminToken || userToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 419) {
      if (!isHandlingUnauthorized) {
        isHandlingUnauthorized = true;
        try {
          // Clear any stored tokens/credentials
          localStorage.removeItem('adminToken');
          localStorage.removeItem('userToken');
          sessionStorage.clear();
          // Trigger app-level handler or fallback redirect
          if (onUnauthorized) {
            onUnauthorized();
          } else if (typeof window !== 'undefined') {
            // Adjust path to your admin login route if different
            window.location.href = '/admin/login';
          }
        } finally {
          // Debounce multiple rapid 401s
          setTimeout(() => { isHandlingUnauthorized = false; }, 1000);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
