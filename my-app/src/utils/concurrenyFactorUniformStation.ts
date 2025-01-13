/**
 * Calculates the concurrency factor for a charging station based on uniform charge points.
 */

export const calculateUniformConcurrencyFactor = ({
  chargePoints,
  arrivalProbability,
  chargingPower,
}: {
  chargePoints: number;
  arrivalProbability: number;
  chargingPower: number;
}): number => {
  const hoursPerDay = 24;

  // Convert arrival probability from percentage to multiplier
  const arrivalMultiplier = arrivalProbability / 100;

  // Theoretical max power demand (ideal scenario where all charge points are always charging)
  const theoreticalMaxPowerDemand = chargePoints * chargingPower;

  // Actual power demand based on the arrival probability and number of charge points
  let maxPowerDemand =
    chargePoints * arrivalMultiplier * chargingPower * hoursPerDay;
  const diminishingFactor =
    1 + Math.log(1 + chargePoints) * Math.sqrt(arrivalMultiplier);

  maxPowerDemand = maxPowerDemand / diminishingFactor;

  // Calculate concurrency factor
  const concurrencyFactor =
    theoreticalMaxPowerDemand > 0
      ? maxPowerDemand / theoreticalMaxPowerDemand
      : 0;

  return concurrencyFactor;
};
