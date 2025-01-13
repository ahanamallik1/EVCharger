/**
 * Custom hook to track the current URL location and form submission statuses for both simulation and charging station configurations.
 * It provides the current route and the submission statuses for conditional UI rendering.
 */

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../store/store';

export const useNavbarState = () => {
  const location = useLocation();
  const { formSubmitted, chargingStationSubmitted } = useSelector(
    (state: RootState) => ({
      formSubmitted: state.simulationParams.formSubmitted,
      chargingStationSubmitted: state.chargingStationConfig.formSubmitted,
    }),
  );
  return { location, formSubmitted, chargingStationSubmitted };
};
