// File: src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Art Classes</h1>
        <p className="text-xl text-gray-600">Discover your creative potential with our expert-led art courses</p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Courses */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Upcoming Classes</h3>
          <p className="text-gray-600">Check out our latest course offerings</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Art Gallery</h3>
          <p className="text-gray-600">View student artwork and achievements</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Announcements</h3>
          <p className="text-gray-600">Stay updated with latest news and events</p>
        </div>
      </section>
    </div>
  );
};

export default Home;