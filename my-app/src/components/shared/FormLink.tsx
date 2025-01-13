/**
 * The FormLink component renders a reusable link styled as a button.
 * It includes an optional back arrow icon and navigates to the specified route.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { BackToFormLinkProps } from '../../types/types';

const FormLink: React.FC<BackToFormLinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-blue-600 font-medium text-sm bg-transparent py-2 px-4 rounded-md flex items-center"
    >
      <FaArrowLeft className="mr-2" />
      {label}
    </Link>
  );
};

export default FormLink;
