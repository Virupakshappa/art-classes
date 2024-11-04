// File: src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Our Art Classes</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-4">
          Welcome to our art studio! We offer various classes for all skill levels,
          from beginners to advanced artists. Our experienced instructors are passionate
          about helping students develop their artistic abilities.
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            To inspire creativity and foster artistic growth in a supportive,
            engaging environment.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Class Environment</h2>
          <p className="text-gray-600">
            Small class sizes ensure personal attention. All materials are provided
            in a well-equipped studio space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;