/**
 * Home component displays the landing page for the EV Charging Station Simulator.
 * It includes an image on the left and content on the right with navigation options
 * for configuring the simulation.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image */}
      <div
        className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url('/images/EV.png')` }}
      >
        {/* Optional Overlay for Better Contrast */}
        <div className="w-full h-full bg-black bg-opacity-40"></div>
      </div>

      {/* Right Side - Content */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-50 p-8">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
            EV Charging Station Simulator
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Analyze the energy requirements and optimize the performance of your
            electric vehicle charging stations.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Start by configuring the simulation parameters to get tailored
            insights.
          </p>

          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/configure"
                className="inline-block px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Configure Simulation
              </Link>

              <span className="text-base text-gray-600">or</span>

              <Link
                to="/configureMulti"
                className="inline-block w-full sm:w-auto px-12 py-4 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
              >
                Configure Simulation <p> (Mixed Type Charge Points)</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
