// ============================================
// Axios Instance — API client configuration
// ============================================
import axios from 'axios';

// Create axios instance with base URL from environment
// - Local dev: uses '/api' (proxied by Vite to localhost:5000)
// - Production: uses exactly your deployed backend URL
const API = axios.create({
  baseURL: import.meta.env.PROD ? 'https://personal-portfolio-p55w.vercel.app/api' : '/api',
});

// Request interceptor — attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle common errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage
      localStorage.removeItem('token');
      // Redirect to login if on admin page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
