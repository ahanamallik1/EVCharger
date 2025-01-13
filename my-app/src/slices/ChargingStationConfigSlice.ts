/**
 * Redux slice for managing the charging station configuration state.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChargingStationSimulation } from '../types/types';

const initialState: ChargingStationSimulation & {
  formSubmitted: boolean;
} = {
  arrivalProbability: 0,
  carConsumption: 0,
  chargePointTypes: [{ quantity: 1, power: 22 }],
  formSubmitted: false,
};

export const ChargingStationConfigSlice = createSlice({
  name: 'chargingStationConfig',
  initialState,
  reducers: {
    setChargingStationConfig: (
      state,
      action: PayloadAction<ChargingStationSimulation>,
    ) => {
      const { arrivalProbability, carConsumption, chargePointTypes } =
        action.payload;
      state.arrivalProbability = arrivalProbability;
      state.carConsumption = carConsumption;
      state.chargePointTypes = chargePointTypes;
      state.formSubmitted = true;
    },
    addChargePoint: (
      state,
      action: PayloadAction<{ quantity: number; power: number }>,
    ) => {
      const newChargePoint = action.payload;
      state.chargePointTypes.push(newChargePoint);
    },
  },
});

export const { setChargingStationConfig, addChargePoint } =
  ChargingStationConfigSlice.actions;

export default ChargingStationConfigSlice.reducer;
