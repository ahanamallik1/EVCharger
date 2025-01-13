/**
 * A reusable slider input component that allows users to select a value within a specified
 * range.
 */

import React from 'react';
import { SliderInputProps } from '../../types/types';

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  name,
  value,
  min,
  max,
  step,
  inputValue,
  onChange,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="range"
      value={inputValue !== undefined ? inputValue : value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
    <div className="text-center text-gray-600 mt-2">{value}%</div>
  </div>
);

export default SliderInput;
