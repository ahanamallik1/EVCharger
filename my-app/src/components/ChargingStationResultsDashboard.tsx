/**
 * ChargingStationResultsDashboard Component:
 * Displays a simulation dashboard with key metrics and power distribution data
 * for charging stations.
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectChargingStationSimulationResults } from '../selectors/selectChargingStationResults';
import { metrics } from '../data/chargingStationMetrics';
import FormLink from './shared/FormLink';
import PowerDistributionTable from './PowerDistributionTable';

const ChargingStationResultsDashboard: React.FC = () => {
  const simulationResults = useSelector((state: RootState) =>
    selectChargingStationSimulationResults(state),
  );

  const {
    totalPowerPerChargePoint,
    totalEnergyChargedPerDay,
    totalChargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
    exemplaryDay: { totalCapacityPerDay, utilizationRate },
    concurrencyFactor,
  } = simulationResults;

  // Generate metrics
  const metricsData = metrics(
    totalEnergyChargedPerDay,
    totalPowerPerChargePoint,
    totalChargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
    utilizationRate,
    totalCapacityPerDay,
    concurrencyFactor,
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <FormLink to="/configureMulti" label="Configure Simulation Form" />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Simulation Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData.map(({ label, value, icon }) => (
          <div key={label} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              {icon} <span className="ml-2">{label}</span>
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <PowerDistributionTable />
      </div>
    </div>
  );
};

export default ChargingStationResultsDashboard;
