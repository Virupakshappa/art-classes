import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/api';
import { 
  ClockIcon, 
  UserGroupIcon,
  FunnelIcon,
  ExclamationCircleIcon,
  AcademicCapIcon,
  PaintBrushIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await courseService.getAllCourses();
      setCourses(response);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getAvailableSpots = (course) => {
    const enrolled = course.enrollmentCount || 0;
    const available = course.maxStudents - enrolled;
    return `${available} spot${available !== 1 ? 's' : ''} left`;
  };

  const getLevelBadgeStyles = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-900/50 text-green-400';
      case 'Intermediate':
        return 'bg-blue-900/50 text-blue-400';
      case 'Advanced':
        return 'bg-purple-900/50 text-purple-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  const filteredCourses = courses.filter(course => {
    return (selectedLevel === 'all' || course.level === selectedLevel) &&
           (selectedCategory === 'all' || course.category === selectedCategory);
  });

  const getEmptyStateMessage = () => {
    if (selectedLevel !== 'all' || selectedCategory !== 'all') {
      return 'No courses found matching your filters. Try adjusting your criteria.';
    }
    return 'No courses available at the moment. Please check back later.';
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      <p className="mt-4 text-gray-400">Loading courses...</p>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-red-900/50 text-red-200 p-6 rounded-lg max-w-md text-center">
        <ExclamationCircleIcon className="h-12 w-12 mx-auto mb-4 text-red-400" />
        <p className="mb-4">{error}</p>
        <button
          onClick={loadCourses}
          className="bg-red-800 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center"
        >
          <Cog6ToothIcon className="h-5 w-5 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20">
      <PaintBrushIcon className="h-16 w-16 mx-auto mb-4 text-gray-600" />
      <p className="text-gray-400 text-lg">{getEmptyStateMessage()}</p>
      {(selectedLevel !== 'all' || selectedCategory !== 'all') && (
        <button
          onClick={() => {
            setSelectedLevel('all');
            setSelectedCategory('all');
          }}
          className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-16">
      {/* Header Section */}
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

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <FunnelIcon className="h-5 w-5" />
              <span className="font-medium">Filter Courses</span>
            </div>
            {(selectedLevel !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedCategory('all');
                }}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Level</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
              >
                <option value="all">All Categories</option>
                <option value="Painting">Painting</option>
                <option value="Drawing">Drawing</option>
                <option value="Digital">Digital Art</option>
                <option value="Sculpture">Sculpture</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay />
        ) : filteredCourses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-colors group"
              >
                <div className="relative">
                  <img 
                    src={course.imageUrl || '/api/placeholder/600/400'} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  {!course.isRegistrationOpen && (
                    <div className="absolute top-2 right-2 bg-red-900/90 text-white text-sm px-3 py-1 rounded-full">
                      Registration Closed
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadgeStyles(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="text-purple-400 font-semibold">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400">
                    with {course.instructor?.name || 'TBA'}
                  </p>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      <span>{getAvailableSpots(course)}</span>
                    </div>
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-5 w-5 mr-2" />
                      <span>{course.category}</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Link
                      to={`/courses/${course.id}`}
                      className={`inline-flex items-center justify-center w-full px-4 py-2 rounded-lg transition-colors
                        ${course.isRegistrationOpen 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                          : 'bg-gray-700 text-gray-300 cursor-not-allowed'}`}
                      onClick={(e) => !course.isRegistrationOpen && e.preventDefault()}
                    >
                      {course.isRegistrationOpen ? 'Learn More' : 'Currently Unavailable'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Courses;