// File: src/pages/Courses.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClockIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: "Introduction to Oil Painting",
      instructor: "Sarah Johnson",
      level: "Beginner",
      category: "Painting",
      duration: "8 weeks",
      schedule: "Mondays 6-8pm",
      price: "$299",
      spots: "5 spots left",
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "Advanced Watercolor Techniques",
      instructor: "Michael Chen",
      level: "Advanced",
      category: "Painting",
      duration: "10 weeks",
      schedule: "Wednesdays 5-8pm",
      price: "$399",
      spots: "3 spots left",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Digital Art Fundamentals",
      instructor: "Emma Davis",
      level: "Intermediate",
      category: "Digital",
      duration: "6 weeks",
      schedule: "Tuesdays 7-9pm",
      price: "$249",
      spots: "7 spots left",
      image: "/api/placeholder/600/400"
    },
    // Add more courses as needed
  ];

  const filteredCourses = courses.filter(course => {
    return (selectedLevel === 'all' || course.level === selectedLevel) &&
           (selectedCategory === 'all' || course.category === selectedCategory);
  });

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white -mt-16">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/50 to-gray-900" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Explore our range of art classes designed for all skill levels
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Level</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Categories</option>
                <option value="Painting">Painting</option>
                <option value="Drawing">Drawing</option>
                <option value="Digital">Digital Art</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-colors">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${course.level === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                      course.level === 'Intermediate' ? 'bg-blue-900/50 text-blue-400' :
                        'bg-purple-900/50 text-purple-400'}`}>
                    {course.level}
                  </span>
                  <span className="text-purple-400 font-semibold">{course.price}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                <p className="text-gray-400">with {course.instructor}</p>
                <div className="space-y-2 text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    <span>{course.spots}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;