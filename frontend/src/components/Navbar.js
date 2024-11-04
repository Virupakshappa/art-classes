// File: src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  PaintBrushIcon,
  ChevronDownIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavItems = () => {
    if (!user) {
      return [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: 'About', path: '/about' },
      ];
    }

    if (user.role === 'student') {
      return [
        { name: 'Dashboard', path: '/student/dashboard' },
        { name: 'My Courses', path: '/student/my-courses' },
        { name: 'Browse Courses', path: '/courses' },
      ];
    }

    return [
      { name: 'Dashboard', path: '/instructor/dashboard' },
      { name: 'Manage Courses', path: '/instructor/manage-courses' },
      { name: 'Course Calendar', path: '/instructor/calendar' },
    ];
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const ProfileMenu = () => (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
        <UserCircleIcon className="h-6 w-6" />
        <span>{user?.name}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 invisible group-hover:visible">
        <div className="px-4 py-2 border-b border-gray-700">
          <p className="text-sm text-white font-medium">{user?.name}</p>
          <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
        </div>
        <Link
          to={`/${user?.role}/profile`}
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <UserCircleIcon className="h-5 w-5 mr-2" />
          Profile
        </Link>
        <Link
          to={`/${user?.role}/settings`}
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <CogIcon className="h-5 w-5 mr-2" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-purple-500/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PaintBrushIcon className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              Art Classes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <ProfileMenu />
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-purple-400"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <div className="bg-gray-800/95 backdrop-blur-sm px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 shadow-lg shadow-purple-500/10">
            {getNavItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath(item.path)
                    ? 'bg-gray-700 text-purple-400'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-purple-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="px-3 py-2 border-t border-gray-700 mt-2">
                  <p className="text-sm text-white font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
                <Link
                  to={`/${user.role}/profile`}
                  className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to={`/${user.role}/settings`}
                  className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-center rounded-md bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;