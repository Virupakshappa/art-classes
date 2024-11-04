import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BookOpenIcon, 
  ClockIcon, 
  AcademicCapIcon
} from '@heroicons/react/24/outline';
const StudentDashboard = () => {
  const { user } = useAuth();

  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Oil Painting",
      instructor: "Sarah Johnson",
      nextClass: "Monday, 6:00 PM",
      progress: 60,
    },
    // Add more courses
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Color Theory Practice",
      dueDate: "Nov 15, 2024",
      course: "Introduction to Oil Painting",
      status: "pending"
    },
    // Add more assignments
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-purple-200">
          Continue your artistic journey with your enrolled courses.
        </p>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <BookOpenIcon className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400">Enrolled Courses</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <ClockIcon className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400">Hours Completed</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <AcademicCapIcon className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400">Certificates Earned</p>
              <p className="text-2xl font-bold text-white">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <section className="bg-gray-800/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Enrolled Courses</h2>
        <div className="space-y-4">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">{course.title}</h3>
                  <p className="text-gray-400">Instructor: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400">Next Class</p>
                  <p className="text-gray-300">{course.nextClass}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 rounded-full h-2"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Assignments */}
      <section className="bg-gray-800/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Upcoming Assignments</h2>
        <div className="space-y-4">
          {upcomingAssignments.map(assignment => (
            <div key={assignment.id} className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{assignment.title}</h3>
                <p className="text-gray-400">{assignment.course}</p>
              </div>
              <div className="text-right">
                <p className="text-purple-400">Due Date</p>
                <p className="text-gray-300">{assignment.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;