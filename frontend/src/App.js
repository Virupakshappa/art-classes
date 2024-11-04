import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Login from './pages/Login';
import StudentDashboard from './components/dashboards/StudentDashboard';
import InstructorDashboard from './components/dashboards/InstructorDashboard';
import StudentCourses from './components/student/StudentCourses';
import ManageCourses from './components/instructor/ManageCourses';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-gray-100">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Student Routes */}
              <Route 
                path="/student/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/student/my-courses" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentCourses />
                  </ProtectedRoute>
                }
              />
              
              {/* Protected Instructor Routes */}
              <Route 
                path="/instructor/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['instructor']}>
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/instructor/manage-courses" 
                element={
                  <ProtectedRoute allowedRoles={['instructor']}>
                    <ManageCourses />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;