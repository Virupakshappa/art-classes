// File: src/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PaintBrushIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';

const About = () => {
  const values = [
    {
      title: "Passion for Art",
      description: "We believe in nurturing creativity and artistic expression in every student",
      icon: HeartIcon,
      color: "bg-red-900/50 text-red-400"
    },
    {
      title: "Expert Instruction",
      description: "Our instructors are practicing artists with years of teaching experience",
      icon: AcademicCapIcon,
      color: "bg-blue-900/50 text-blue-400"
    },
    {
      title: "Community",
      description: "Join a supportive community of fellow artists and creators",
      icon: UserGroupIcon,
      color: "bg-green-900/50 text-green-400"
    },
    {
      title: "Creative Freedom",
      description: "Explore various mediums and develop your unique artistic style",
      icon: PaintBrushIcon,
      color: "bg-purple-900/50 text-purple-400"
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
            <h1 className="text-5xl font-bold leading-tight">About Our Studio</h1>
            <p className="text-xl text-purple-200">
              A creative space where artists of all levels come together to learn,
              create, and grow their artistic abilities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Story</h2>
            <p className="text-gray-300">
              Founded in 2020, our art studio has become a haven for creative minds
              in the community. What started as a small workshop has grown into a
              comprehensive art education center.
            </p>
            <p className="text-gray-300">
              We believe that everyone has an artist within them, waiting to be
              discovered and nurtured. Our mission is to provide the guidance,
              tools, and environment needed for that artistic journey.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-8 backdrop-blur-sm">
            <img 
              src="/api/placeholder/600/400" 
              alt="Art Studio" 
              className="rounded-lg shadow-2xl shadow-purple-500/10"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Our Values</h2>
          <p className="mt-4 text-lg text-gray-400">
            The principles that guide our approach to art education
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800 transition-colors">
              <div className={`inline-flex p-3 rounded-lg ${value.color} mb-4`}>
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
              <p className="text-xl text-purple-200 mb-8">
                Join our community and discover the artist within you.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
              >
                View Our Classes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;