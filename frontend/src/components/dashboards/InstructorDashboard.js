import React from 'react';
import { 
  UserGroupIcon, 
  ClipboardIcon, 
  ChartBarIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const InstructorDashboard = () => {
  const { user } = useAuth();

  const activeCourses = [
    {
      id: 1,
      title: "Oil Painting for Beginners",
      students: 15,
      nextSession: "Monday, 6:00 PM",
      completion: 40,
    },
    // Add more courses
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: "Oil Painting for Beginners",
      date: "Nov 15, 2024",
      time: "6:00 PM - 8:00 PM",
      students: 15,
    },
    // Add more classes
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-purple-200">
          Manage your courses and track student progress.
        </p>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <UserGroupIcon className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-white">45</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <ClipboardIcon className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400">Active Courses</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <ChartBarIcon className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400">Avg. Rating</p>
              <p className="text-2xl font-bold text-white">4.8</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400">Classes This Week</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Courses */}
      <section className="bg-gray-800/30 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Active Courses</h2>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Create New Course
          </button>
        </div>
        <div className="space-y-4">
          {activeCourses.map(course => (
            <div key={course.id} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">{course.title}</h3>
                  <p className="text-gray-400">{course.students} Students Enrolled</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400">Next Session</p>
                  <p className="text-gray-300">{course.nextSession}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Course Progress</span>
                  <span>{course.completion}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 rounded-full h-2"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Classes */}
      <section className="bg-gray-800/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Upcoming Classes</h2>
        <div className="space-y-4">
          {upcomingClasses.map(class_ => (
            <div key={class_.id} className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{class_.course}</h3>
                <p className="text-gray-400">{class_.students} Students</p>
              </div>
              <div className="text-right">
                <p className="text-purple-400">{class_.date}</p>
                <p className="text-gray-300">{class_.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboard;