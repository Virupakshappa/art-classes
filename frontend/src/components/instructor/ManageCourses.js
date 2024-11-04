// File: src/components/instructor/ManageCourses.js
import React from 'react';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const ManageCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Oil Painting for Beginners",
      status: "Active",
      students: 15,
      startDate: "Nov 15, 2024",
      endDate: "Dec 20, 2024",
      enrollment: "Open"
    },
    {
      id: 2,
      title: "Advanced Portrait Techniques",
      status: "Draft",
      students: 0,
      startDate: "Jan 10, 2025",
      endDate: "Feb 28, 2025",
      enrollment: "Upcoming"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Manage Courses</h2>
            <p className="text-gray-400">Create and manage your course offerings</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Course
          </button>
        </div>

        <div className="grid gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-gray-800/50 rounded-xl p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Course Info */}
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {course.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      Duration: {course.startDate} - {course.endDate}
                    </p>
                    <div className="flex items-center text-gray-400">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      {course.students} students enrolled
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${course.status === 'Active' 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-gray-700/50 text-gray-400'}`}>
                      {course.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${course.enrollment === 'Open'
                        ? 'bg-blue-900/50 text-blue-400'
                        : 'bg-purple-900/50 text-purple-400'}`}>
                      {course.enrollment}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    View Details
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

export default ManageCourses;