/**
 * Visualization component to display charging events data, utilization rate,
 * and energy charged chart.
 */

import React from 'react';
import ChargingEventsData from './ChargingEventsData';
import UtilizationRate from './UtilizationRate';
import { selectSimulationResults } from '../selectors/selectSimulationResults';
import { useSelector } from 'react-redux';
import EnergyChargedChart from './EnergyChargedChart';

const Visualization: React.FC = () => {
  const {
    totalEnergyChargedPerDay,
    chargingValuesPerChargePoint,
    exemplaryDay,
  } = useSelector(selectSimulationResults);

  const { utilizationRate } = exemplaryDay;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        {/* Charging Events Data */}
        <ChargingEventsData />
      </div>
      <div className="flex flex-row md:flex-col justify-between gap-8">
        {/* Utilization Rate */}
        <div className="flex-1">
          <UtilizationRate utilizationRate={utilizationRate} />
        </div>

        {/* Energy Charged Chart */}
        <div className="flex-1">
          <EnergyChargedChart
            totalEnergyChargedPerDay={totalEnergyChargedPerDay}
            chargingValuesPerChargePoint={chargingValuesPerChargePoint}
          />
        </div>
      </div>
    </div>
  );
};

export default Visualization;
