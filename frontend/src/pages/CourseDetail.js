// File: src/pages/CourseDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Details</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Course Title</h2>
          <p className="text-gray-600 mb-4">
            Detailed description of the course will be displayed here.
            This is a placeholder for course ID: {id}
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Schedule</h3>
              <p className="text-gray-600">Dates and times will be shown here</p>
            </div>
            <div>
              <h3 className="font-semibold">Price</h3>
              <p className="text-gray-600">Course price will be shown here</p>
            </div>
            <div>
              <h3 className="font-semibold">Requirements</h3>
              <p className="text-gray-600">Course requirements will be listed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;