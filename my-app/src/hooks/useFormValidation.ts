/**
 * Custom hook to handle form validation and check if the form has been submitted with valid data.
 * It also checks if the app's store has been rehydrated before evaluating the validity of the configuration.
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useFormValidation = () => {
  const { formSubmitted, ...simulationParams } = useSelector(
    (state: RootState) => state.simulationParams,
  );

  const { formSubmitted: submitted, ...chargingStationConfig } = useSelector(
    (state: RootState) => state.chargingStationConfig,
  );

  // State to handle if the app is rehydrated
  const [isRehydrated, setIsRehydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRehydrated(true), 1000); // Wait for store rehydration
    return () => clearTimeout(timer);
  }, []);

  // Check if the user has visited and submitted the form with valid data
  const hasConfig =
    (formSubmitted &&
      simulationParams.chargePoints > 0 &&
      simulationParams.arrivalProbability > 0 &&
      simulationParams.carConsumption > 0 &&
      simulationParams.chargingPower > 0) ||
    (submitted &&
      chargingStationConfig.arrivalProbability > 0 &&
      chargingStationConfig.carConsumption > 0 &&
      chargingStationConfig.chargePointTypes.length > 0);

  return {
    hasConfig,
    isRehydrated,
  };
};
