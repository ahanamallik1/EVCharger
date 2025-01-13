/**
 * ProtectedRoute component:
 * This component serves as a gate to ensure that users can only access certain routes
 * if they have completed the required configuration (form submission).
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { hasConfig, isRehydrated } = useFormValidation();

  // If the app is not rehydrated yet, show loading
  if (!isRehydrated) {
    return <LoadingSpinner />;
  }

  // If form is not submitted or user hasn't interacted with form, redirect to Home
  if (!hasConfig) {
    return (
      <Navigate
        to="/"
        replace
        state={{ message: 'Please configure simulation parameters first.' }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
