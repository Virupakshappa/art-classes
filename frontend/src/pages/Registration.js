// File: src/pages/Registration.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Registration = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: courseId // Using the courseId from URL params
  });

  useEffect(() => {
    // In a real application, you would fetch course details from your API
    // This is just mock data for now
    const fetchCourseDetails = () => {
      // Simulating API call
      const mockCourse = {
        id: courseId,
        title: `Art Course ${courseId}`,
        price: '$199',
        startDate: '2024-12-01',
        duration: '8 weeks'
      };
      setCourseDetails(mockCourse);
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted for course:', courseId, formData);
    // TODO: Add API call to submit registration
    // Example:
    // api.post('/registrations', formData)
    //    .then(response => {
    //      // Handle success
    //    })
    //    .catch(error => {
    //      // Handle error
    //    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!courseDetails) {
    return <div className="text-center p-4">Loading course details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Registration</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Course Details Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{courseDetails.title}</h2>
          <div className="text-sm text-gray-600">
            <p>Start Date: {courseDetails.startDate}</p>
            <p>Duration: {courseDetails.duration}</p>
            <p>Price: {courseDetails.price}</p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Register for Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;