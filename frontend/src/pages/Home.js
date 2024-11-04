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
      color: "bg-purple-900/50 text-purple-400"
    },
    {
      title: "Flexible Schedule",
      description: "Choose from morning, evening, and weekend classes",
      icon: CalendarIcon,
      color: "bg-blue-900/50 text-blue-400"
    },
    {
      title: "All Skill Levels",
      description: "From complete beginners to advanced artists",
      icon: StarIcon,
      color: "bg-pink-900/50 text-pink-400"
    },
    {
      title: "Various Mediums",
      description: "Oil, acrylic, watercolor, and mixed media",
      icon: PaintBrushIcon,
      color: "bg-indigo-900/50 text-indigo-400"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white -mt-16">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/50 to-gray-900" />
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              Discover Your Artistic Potential
            </h1>
            <p className="text-xl text-purple-200">
              Join our vibrant community of artists and unlock your creativity through 
              expert-led courses in painting, drawing, and mixed media.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
              >
                Explore Courses
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors"
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
          <h2 className="text-3xl font-bold text-white">Why Choose Our Classes?</h2>
          <p className="mt-4 text-lg text-gray-400">
            We provide a supportive environment for artists of all levels
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800 transition-colors">
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Creative Journey?</h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join our community of artists and begin exploring your creativity today.
            New classes are starting every month!
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
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