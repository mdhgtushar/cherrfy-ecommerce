// util/API.js
import axios from 'axios';

let onUnauthorized = null;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  // baseURL: 'https://api.cherrfy.com/api',
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
    if (error.response && error.response.status === 401) {
      if (onUnauthorized) {
        onUnauthorized(); // Call the provided handler
      }
    }
    return Promise.reject(error);
  }
);

export default API;
