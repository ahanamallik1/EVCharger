/**
 * The NotFound component renders a user-friendly 404 error page,
 * indicating that the requested page could not be found.
 * It provides a link to navigate the user back to the homepage.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
