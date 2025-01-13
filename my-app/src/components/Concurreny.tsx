/**
 * The Concurrency component calculates and displays the deviation in concurrency
 * factors between uniform and mixed configurations.
 */

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSimulationResults } from '../selectors/selectSimulationResults';
import { selectChargingStationSimulationResults } from '../selectors/selectChargingStationResults';
import { calculateDeviationPercentage } from '../utils/calculateDeviationPercentage';

const Concurrency: React.FC = () => {
  // Get uniform and mixed concurrency factors from state
  const { concurrencyFactor: uniformConcurrency } = useSelector(
    selectSimulationResults,
  );
  const { concurrencyFactor: mixedConcurrency } = useSelector(
    selectChargingStationSimulationResults,
  );

  // Memoize the calculation of deviation percentage to avoid unnecessary recalculations
  const deviationPercentage = useMemo(() => {
    return calculateDeviationPercentage(uniformConcurrency, mixedConcurrency);
  }, [uniformConcurrency, mixedConcurrency]); // Recalculate when these values change

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Deviation Display */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">
          Deviation in Concurrency
        </h2>
        <p className="text-lg text-gray-700">
          The deviation in concurrency between uniform and mixed configurations:
        </p>
        <p className="text-2xl font-semibold text-blue-600 mt-2">
          {deviationPercentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default Concurrency;
