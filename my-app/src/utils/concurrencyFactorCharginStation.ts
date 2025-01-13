/**
 * Calculates the concurrency factor for a charging station based on charge point types
 */

export const calculateConcurrencyFactor = ({
  chargePointTypes,
  arrivalProbability,
}: {
  chargePointTypes: { quantity: number; power: number }[];
  arrivalProbability: number;
}): number => {
  // Constants for time-related calculations
  const daysPerYear = 365;
  const hoursPerDay = 24;
  const intervalsPerHour = 4; // 15-minute intervals
  const totalIntervals = daysPerYear * hoursPerDay * intervalsPerHour;

  // Convert arrival probability from percentage to multiplier
  const arrivalMultiplier = arrivalProbability / 100;

  // Calculate total power for all charge points (theoretical max power demand)
  const theoreticalMaxPowerDemand = chargePointTypes.reduce(
    (sum, cp) => sum + cp.quantity * cp.power,
    0,
  );

  let maxPowerDemand = 0;

  // Simulate over all intervals to track actual power demand
  for (let i = 0; i < totalIntervals; i++) {
    let currentPowerDemand = 0;

    chargePointTypes.forEach(({ quantity, power }) => {
      // Calculate expected charging events per interval with arrival probability
      const intervalChargingEvents =
        quantity *
        arrivalMultiplier *
        (hoursPerDay / intervalsPerHour) *
        Math.log(1 + quantity);
      currentPowerDemand += intervalChargingEvents * power;
    });

    // Update max power demand
    maxPowerDemand = Math.max(maxPowerDemand, currentPowerDemand);
  }
  const totalChargePoints = chargePointTypes.reduce(
    (sum, cp) => sum + cp.quantity,
    0,
  );
  const diminishingFactor = Math.log(1 + totalChargePoints);
  const adjustedMaxPowerDemand = maxPowerDemand / diminishingFactor;

  // Calculate concurrency factor
  const concurrencyFactor =
    theoreticalMaxPowerDemand > 0
      ? adjustedMaxPowerDemand / theoreticalMaxPowerDemand
      : 0;

  return concurrencyFactor;
};
