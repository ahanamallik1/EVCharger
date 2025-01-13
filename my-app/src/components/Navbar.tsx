/**
 * The Navbar component is memoized using React.memo to optimize performance.
 * It updates only when dependencies like Redux state or location change.
 * The component is broken into smaller reusable parts for better maintainability and testability.
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaChargingStation } from 'react-icons/fa';
import HomeLink from './HomeLink';
import { useNavbarState } from '../hooks/useNavbarState';

const StyledLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link
    to={to}
    className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const { location, formSubmitted, chargingStationSubmitted } =
    useNavbarState();

  const isSpecialPage = [
    '/results',
    '/chargingStationResults',
    '/concurrency',
  ].includes(location.pathname);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center">
          {isSpecialPage ? (
            <HomeLink to="/" label="Back to Home" />
          ) : (
            <Link to="/" className="flex items-center" aria-label="Go to Home">
              <FaChargingStation className="text-3xl mr-2" />
              <h2 className="text-2xl font-bold">EV Simulator</h2>
            </Link>
          )}
        </div>

        {/* Center Section */}
        {formSubmitted && chargingStationSubmitted && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/concurrency"
              className="flex items-center"
              aria-label="Concurrency Deviation"
            >
              Concurrency Deviation
            </Link>
          </div>
        )}

        {/* Right Section */}
        <div>
          {location.pathname === '/results' && (
            <StyledLink to="/configureMulti">
              Configure Multi-Type Simulation
            </StyledLink>
          )}
          {location.pathname === '/chargingStationResults' && (
            <StyledLink to="/configure">
              Configure Uniform-Type Simulation
            </StyledLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
