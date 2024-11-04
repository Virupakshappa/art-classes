// File: src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PaintBrushIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  StarIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      title: "Expert Instruction",
      description: "Learn from professional artists with years of teaching experience",
      icon: UserGroupIcon,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Flexible Schedule",
      description: "Choose from morning, evening, and weekend classes",
      icon: CalendarIcon,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "All Skill Levels",
      description: "From complete beginners to advanced artists",
      icon: StarIcon,
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Various Mediums",
      description: "Oil, acrylic, watercolor, and mixed media",
      icon: PaintBrushIcon,
      color: "bg-green-100 text-green-600"
    }
  ];

  const upcomingCourses = [
    {
      id: 1,
      title: "Beginner's Watercolor Journey",
      instructor: "Sarah Johnson",
      date: "Starts Nov 15",
      price: "$199",
      spots: "5 spots left",
      level: "Beginner",
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "Advanced Oil Painting Techniques",
      instructor: "Michael Chen",
      date: "Starts Nov 20",
      price: "$299",
      spots: "3 spots left",
      level: "Advanced",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Mixed Media Exploration",
      instructor: "Emma Davis",
      date: "Starts Dec 1",
      price: "$249",
      spots: "8 spots left",
      level: "Intermediate",
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              Discover Your Artistic Potential
            </h1>
            <p className="text-xl text-purple-100">
              Join our vibrant community of artists and unlock your creativity through 
              expert-led courses in painting, drawing, and mixed media.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
              >
                Explore Courses
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-400 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Classes?</h2>
          <p className="mt-4 text-lg text-gray-600">
            We provide a supportive environment for artists of all levels
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Courses Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Courses</h2>
            <p className="mt-4 text-lg text-gray-600">
              Start your artistic journey with our upcoming classes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'}`}>
                      {course.level}
                    </span>
                    <span className="text-purple-600 font-semibold">{course.price}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">with {course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{course.date}</span>
                    <span className="text-sm font-medium text-purple-600">{course.spots}</span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-4 inline-flex items-center text-purple-600 font-medium hover:text-purple-700"
                  >
                    Learn more
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
            >
              View All Courses
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-purple-50 rounded-2xl p-8 md:p-12 relative">
          <div className="max-w-3xl mx-auto text-center">
            <StarIcon className="h-12 w-12 text-purple-600 mx-auto mb-6" />
            <blockquote className="text-2xl font-medium text-gray-900 mb-8">
              "The instructors are amazing and the environment is perfect for learning.
              I've improved so much since starting my journey here!"
            </blockquote>
            <div className="text-gray-600">
              <p className="font-semibold">Emily Thompson</p>
              <p>Student - Watercolor Painting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Creative Journey?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community of artists and begin exploring your creativity today.
            New classes are starting every month!
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
          >
            Browse All Courses
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;