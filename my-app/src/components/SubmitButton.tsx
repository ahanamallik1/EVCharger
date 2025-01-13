/**
 * A reusable submit button component that changes its appearance based on the
 * `isDisabled` prop. Displays a disabled state with a red background when disabled
 * and a blue background with hover effect when enabled.
 */

import React from 'react';
import { SubmitButtonProps } from '../types/types';

const SubmitButton: React.FC<SubmitButtonProps> = ({ isDisabled }) => {
  return (
    <button
      type="submit"
      className={`mt-6 w-full py-3 rounded-lg text-lg font-medium transition ${
        isDisabled
          ? 'bg-red-500 cursor-not-allowed opacity-50' // Red color and disabled state
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
      disabled={isDisabled}
    >
      Save Configuration
    </button>
  );
};

export default SubmitButton;
