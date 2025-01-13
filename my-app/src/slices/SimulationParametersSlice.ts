/**
 * Redux slice for managing the simulation parameters state.
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimulationParams } from '../types/types';

const initialState: SimulationParams & {
  formSubmitted: boolean;
} = {
  chargePoints: 0,
  arrivalProbability: 0,
  carConsumption: 0,
  chargingPower: 0,
  formSubmitted: false,
};

export const SimulationParametersSlice = createSlice({
  name: 'simulationParams',
  initialState,
  reducers: {
    setSimulationParams: (state, action: PayloadAction<SimulationParams>) => {
      const {
        chargePoints,
        arrivalProbability,
        carConsumption,
        chargingPower,
      } = action.payload;
      state.chargePoints = chargePoints;
      state.arrivalProbability = arrivalProbability;
      state.carConsumption = carConsumption;
      state.chargingPower = chargingPower;
      state.formSubmitted = true;
    },
  },
});

export const { setSimulationParams } = SimulationParametersSlice.actions;

export default SimulationParametersSlice.reducer;
