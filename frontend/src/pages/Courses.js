// File: src/pages/Courses.js
import React from 'react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Beginner Painting',
      description: 'Perfect for those just starting their artistic journey',
      startDate: '2024-12-01',
      price: '$199',
      duration: '8 weeks'
    },
    {
      id: 2,
      title: 'Advanced Drawing',
      description: 'Develop your sketching and drawing techniques',
      startDate: '2024-12-15',
      price: '$249',
      duration: '10 weeks'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="space-y-2">
                <p className="text-sm">Start Date: {course.startDate}</p>
                <p className="text-sm">Duration: {course.duration}</p>
                <p className="text-lg font-bold text-purple-600">{course.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;