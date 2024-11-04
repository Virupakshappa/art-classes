// File: src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5137/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Course service
export const courseService = {
  getAllCourses: async () => {
    try {
      const response = await api.get('/courses');
      console.log('API Response:', response.data); // For debugging
      return response.data;
    } catch (error) {
      console.error('API Error:', error); // For debugging
      throw error.response?.data || { message: 'Failed to fetch courses' };
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch course details' };
    }
  },
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