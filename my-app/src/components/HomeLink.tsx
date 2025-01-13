/**
 * The HomeLink component provides a styled navigation link to the home.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { BackToFormLinkProps } from '../types/types';

const HomeLink: React.FC<BackToFormLinkProps> = ({ to, label }) => {
  return (
    <div className="top-20 right-60">
      <Link
        to={to}
        className="text-white font-medium text-lg bg-transparent py-2 px-4 rounded-md flex items-center gap-2" // Updated text size to 'text-lg'
      >
        <FaHome />
        {label}
      </Link>
    </div>
  );
};

export default HomeLink;
