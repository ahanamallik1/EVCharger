/**
 * Calculates the percentage deviation between uniform and mixed concurrency factors.
 * It computes the difference between the two values and expresses it as a percentage
 * of the uniform concurrency factor.
 *
 * @param {number} uniformConcurrency - The concurrency factor for a uniform charging station.
 * @param {number} mixedConcurrency - The concurrency factor for a mixed charging station.
 * @returns {number} The percentage deviation between the two concurrency factors.
 */

export const calculateDeviationPercentage = (
  uniformConcurrency: number,
  mixedConcurrency: number,
) => {
  if (uniformConcurrency === 0) {
    return 0;
  }
  const deviation = uniformConcurrency - mixedConcurrency;
  return (deviation / uniformConcurrency) * 100;
};
