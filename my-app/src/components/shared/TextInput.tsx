/**
 * A reusable input component for numeric values with optional min, max, and step
 * constraints. Includes an `onChange` handler to update the value and an `onBlur`
 * handler to trigger validation or other logic when the input loses focus.
 */

import React from 'react';
import { TextInputProps } from '../../types/types';

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  min,
  max,
  step,
  onChange,
  onBlur,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="number"
      value={value || ''}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      onBlur={onBlur}
      className="w-full px-3 py-2 border rounded-md"
    />
  </div>
);

export default TextInput;
