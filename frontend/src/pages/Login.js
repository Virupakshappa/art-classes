import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import { 
  EyeIcon, 
  EyeSlashIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'student' ? '/student/dashboard' : '/instructor/dashboard');
    }
  }, [user, navigate]);

  // Test credentials info - for development only
  const TEST_CREDENTIALS = {
    student: {
      email: 'student@test.com',
      password: 'student123'
    },
    instructor: {
      email: 'instructor@test.com',
      password: 'instructor123'
    }
  };

  // Load remembered email if exists
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the backend API
      const loginData = {
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      const response = await authService.login(loginData);

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Store token
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      // Update auth context with user data
      login(response.user, rememberMe);
      
      // Navigate to appropriate dashboard
      navigate(response.user.role === 'student' ? '/student/dashboard' : '/instructor/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <LockClosedIcon className="h-12 w-12 text-purple-400" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-gray-400">
            Access your art classes and continue your creative journey
          </p>
        </div>

        {/* Test Credentials Info - Remove in production */}
        <div className="bg-gray-800/50 rounded-xl p-4 text-sm">
          <h3 className="font-semibold text-purple-400 mb-2">Test Credentials</h3>
          <div className="space-y-2">
            <div>
              <p className="text-white">Student Login:</p>
              <p className="text-gray-400">Email: student@test.com</p>
              <p className="text-gray-400">Password: student123</p>
            </div>
            <div>
              <p className="text-white">Instructor Login:</p>
              <p className="text-gray-400">Email: instructor@test.com</p>
              <p className="text-gray-400">Password: instructor123</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm shadow-xl">
          {error && (
            <div className="mb-4 bg-red-900/50 text-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full bg-gray-700 border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Role
              </label>
              <select
                className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 text-purple-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                focus:ring-offset-gray-900 transition-colors
                ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;