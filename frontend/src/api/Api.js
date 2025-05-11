import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:5000/api/', // 🔗 Your main link here
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here if needed
Api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default Api;
