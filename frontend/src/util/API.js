import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.cherrfy.com/api', // 🔗 Your main link here
  // baseURL: 'http://localhost:8080/api', // 🔗 Your main link here
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
  },
});

// You can add interceptors here if needed
API.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default API;
