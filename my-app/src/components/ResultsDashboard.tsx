/**
 * ResultsDashboard component displays the simulation results in a dashboard format,
 * including key metrics and visualizations (e.g., charts).
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectSimulationResults } from '../selectors/selectSimulationResults';
import { metrics } from '../data/metrics'; // Adjust the import path as necessary
import Visualization from './Visualization';
import FormLink from './shared/FormLink';

const ResultsDashboard: React.FC = () => {
  const {
    chargingValuesPerChargePoint,
    totalEnergyChargedPerDay,
    chargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
    exemplaryDay,
    concurrencyFactor,
  } = useSelector(selectSimulationResults);

  const { totalCapacityPerDay, utilizationRate } = exemplaryDay;

  const metricsArray = metrics(
    totalEnergyChargedPerDay,
    chargingValuesPerChargePoint,
    chargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
    utilizationRate,
    totalCapacityPerDay,
    concurrencyFactor,
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <FormLink to="/configure" label="Configure Simulation Form" />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Simulation Dashboard
      </h1>
      <div className="flex flex-col gap-8">
        {/* Metrics Section */}
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {metricsArray.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center"
            >
              <div className="text-4xl mb-4">{metric.icon}</div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {metric.label}
              </h2>
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              {metric.label === 'Utilization Rate (exemplary day)' && (
                <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                  <div
                    className="bg-red-600 h-4 rounded-full"
                    style={{ width: `${utilizationRate}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div>
          <Visualization />
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
