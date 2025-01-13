/**
 * Selector to calculate simulation results based on the charging station configuration from
 * the Redux store. It computes various metrics including total energy charged, charging sessions,
 * utilization rate, and concurrency factor. The calculations consider parameters like charge points,
 * arrival probability, car consumption, and charging power.
 */

import { RootState } from '../store/store';
import { SimulationResultsData } from '../types/types';
import { calculateUniformConcurrencyFactor } from '../utils/concurrenyFactorUniformStation';

// Perform on-demand calculation based on input configuration parameters
export const selectSimulationResults = (
  state: RootState,
): SimulationResultsData => {
  const { chargePoints, arrivalProbability, carConsumption, chargingPower } =
    state.simulationParams;

  // Constants used for time-related calculations
  const daysPerYear = 365;
  const weeksPerYear = 52;
  const monthsPerYear = 12;
  const hoursPerDay = 24;
  const averageChargingSessionDurationHours = 1; // Assumption: 1 hour per session

  // Pre-calculate values to avoid repetitive calculations
  const daysPerWeek = daysPerYear / weeksPerYear;
  const daysPerMonth = daysPerYear / monthsPerYear;

  // Convert arrival probability to a decimal factor (e.g., 100% -> 1.0)
  const arrivalProbabilityFactor = arrivalProbability / 100;

  // Total Cars Arriving per Day
  const totalCarsPerDay = chargePoints * arrivalProbabilityFactor;

  // Total Energy Charged per Day (in kWh)
  const totalEnergyChargedPerDay = totalCarsPerDay * carConsumption;

  // Charging Values per Charge Point (in kW) aggregated on daily basis
  const chargingValuesPerChargePoint = Math.min(
    chargingPower,
    totalEnergyChargedPerDay / chargePoints,
  );

  // Total Capacity Per Day (in kWh)
  const totalCapacityPerDay = chargePoints * chargingPower * hoursPerDay;

  // Utilization Rate (how much of the total capacity is being used)
  const utilizationRate =
    (totalEnergyChargedPerDay / totalCapacityPerDay) * 100;

  // Calculate Charging Sessions (Events) per Day
  const chargingSessionsPerDay =
    chargePoints *
    arrivalProbabilityFactor *
    (hoursPerDay / averageChargingSessionDurationHours);

  // Aggregation Levels for Number of Charging Sessions (Events)
  const chargingEventsPerDay = chargingSessionsPerDay;
  const chargingEventsPerWeek = chargingEventsPerDay * daysPerWeek;
  const chargingEventsPerMonth = chargingEventsPerDay * daysPerMonth;
  const chargingEventsPerYear = chargingEventsPerDay * daysPerYear;

  const concurrencyFactor = calculateUniformConcurrencyFactor({
    chargePoints,
    arrivalProbability,
    chargingPower,
  });
  // Return all calculated metrics
  return {
    chargingValuesPerChargePoint,
    totalEnergyChargedPerDay,
    chargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
    exemplaryDay: {
      totalCapacityPerDay,
      utilizationRate,
    },
    concurrencyFactor,
  };
};
