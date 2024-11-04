// File: src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Art Classes
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
            <Link to="/courses" className="text-gray-600 hover:text-purple-600">Courses</Link>
            <Link to="/about" className="text-gray-600 hover:text-purple-600">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;