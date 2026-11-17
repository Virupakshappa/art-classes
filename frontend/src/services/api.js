// File: src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5137/api';
const CACHE_PREFIX = 'apiCache:';

const api = axios.create({
  baseURL: API_BASE_URL,
  // Fail fast on bad connections instead of hanging forever
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const readCache = (key) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (key, data) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    // Storage full or unavailable - caching is best effort
  }
};

// GET with a local fallback: on slow or no network, return the last good copy
const cachedGet = async (url, fallbackMessage) => {
  try {
    const response = await api.get(url);
    writeCache(url, response.data);
    return response.data;
  } catch (error) {
    const cached = readCache(url);
    if (cached && !error.response) {
      return cached.data;
    }
    throw error.response?.data || { message: fallbackMessage };
  }
};

// Last saved copy of a GET response, for instant first paint
export const getCached = (url) => readCache(url)?.data ?? null;

// Course service
export const courseService = {
  getAllCourses: () => cachedGet('/courses', 'Failed to fetch courses'),

  getCourseById: (id) => cachedGet(`/courses/${id}`, 'Failed to fetch course details'),
};

export const authService = {
  login: async (loginData) => {
    try {
      const response = await api.post('/auth/login', loginData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to log in' };
    }
  },
  // Add other auth-related functions here
};

export default api;
