/**
 * Selector to calculate charging station simulation results based on the current configuration
 * from the Redux store. It aggregates metrics like total power, energy charged, charging events,
 * and utilization rate, while considering arrival probability and car consumption.
 */

import { RootState } from '../store/store';
import { ChargingStationSimulationResults } from '../types/types';
import { calculateConcurrencyFactor } from '../utils/concurrencyFactorCharginStation';

// Perform on-demand calculation based on input configuration parameters
export const selectChargingStationSimulationResults = (
  state: RootState,
): ChargingStationSimulationResults => {
  const { chargePointTypes, arrivalProbability, carConsumption } =
    state.chargingStationConfig;

  // Constants for time-related calculations
  const daysPerYear = 365;
  const hoursPerDay = 24;
  const averageChargingSessionDurationHours = 1; // Assumption: 1 hour per session

  // Convert arrival probability from percentage to multiplier
  const arrivalMultiplier = arrivalProbability / 100;

  // Initialize variables for aggregated calculations
  let totalPowerPerChargePoint = 0;
  let totalEnergyChargedPerDay = 0;
  let totalChargingEventsPerDay = 0;
  let totalCapacityPerDay = 0;

  // Store the power distribution for each charge point type
  const powerDistribution: {
    power: number;
    quantity: number;
    totalPower: number;
  }[] = [];

  // Iterate over each charge point type to calculate total metrics
  chargePointTypes.forEach(({ quantity, power }) => {
    // Calculate total power for this charge point type
    const totalPowerForType = quantity * power;
    totalPowerPerChargePoint += totalPowerForType;

    // Energy required per charging session (kWh)
    const energyPerEvent = carConsumption; // Assumes full consumption is used per session

    // Calculate the daily energy charged for all charge points of this type
    const dailyEnergyCharged = energyPerEvent * quantity * arrivalMultiplier;

    totalEnergyChargedPerDay += dailyEnergyCharged;

    // Estimate the number of charging events per day
    const dailyChargingEvents =
      quantity *
      arrivalMultiplier *
      (hoursPerDay / averageChargingSessionDurationHours);
    totalChargingEventsPerDay += dailyChargingEvents;

    // Maximum capacity per day for this charge point type
    const dailyCapacity = quantity * power * hoursPerDay;
    totalCapacityPerDay += dailyCapacity;

    // Record power distribution
    powerDistribution.push({
      power,
      quantity,
      totalPower: totalPowerForType,
    });
  });

  // Calculate utilization rate as a percentage
  const utilizationRate =
    totalCapacityPerDay > 0
      ? (totalEnergyChargedPerDay / totalCapacityPerDay) * 100
      : 0;
  const concurrencyFactor = calculateConcurrencyFactor({
    chargePointTypes,
    arrivalProbability,
  });

  // Aggregation levels for charging events
  const chargingEventsPerWeek = totalChargingEventsPerDay * 7;
  const chargingEventsPerMonth = totalChargingEventsPerDay * 30;
  const chargingEventsPerYear = totalChargingEventsPerDay * daysPerYear;

  // Return the calculated metrics and power distribution
  return {
    totalPowerPerChargePoint,
    totalEnergyChargedPerDay,
    totalChargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
    powerDistribution,
    exemplaryDay: {
      totalCapacityPerDay,
      utilizationRate,
    },
    concurrencyFactor,
  };
};
