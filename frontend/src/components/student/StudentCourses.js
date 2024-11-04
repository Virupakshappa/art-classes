// File: src/components/student/StudentCourses.js
import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const StudentCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Oil Painting",
      instructor: "Sarah Johnson",
      progress: 60,
      nextClass: "Monday, 6:00 PM",
      completedModules: 3,
      totalModules: 8,
      status: "In Progress"
    },
    {
      id: 2,
      title: "Advanced Watercolor Techniques",
      instructor: "Michael Chen",
      progress: 25,
      nextClass: "Wednesday, 5:00 PM",
      completedModules: 2,
      totalModules: 10,
      status: "In Progress"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">My Courses</h2>
          <p className="text-gray-400">Track your progress and upcoming classes</p>
        </div>

        <div className="grid gap-6">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-gray-800/50 rounded-xl p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Course Info */}
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Instructor: {course.instructor}
                  </p>
                  <div className="flex items-center text-purple-400">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    Next Class: {course.nextClass}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <p className="text-gray-400 mb-2">Course Progress</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-700 rounded-full h-2 mr-4">
                      <div 
                        className="bg-purple-600 rounded-full h-2"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-white">{course.progress}%</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {course.completedModules}/{course.totalModules} modules completed
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;