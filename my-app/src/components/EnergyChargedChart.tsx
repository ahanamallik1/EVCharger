/**
 * The EnergyChargedPieChart component renders a pie chart to visualize
 * the total energy charged per day and power per charge point.
 */

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { generateChartData } from '../visualization/EnergyData';
import { EnergyChargedChartProps } from '../types/types';

// Register required components in Chart.js
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const EnergyChargedPieChart: React.FC<EnergyChargedChartProps> = ({
  totalEnergyChargedPerDay,
  chargingValuesPerChargePoint,
}) => {
  // Get the chart data
  const chartData = generateChartData(
    totalEnergyChargedPerDay,
    chargingValuesPerChargePoint,
  );

  // Define the chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 text-center w-96 mx-auto">
      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Total Energy(KWh) and Power Per Charge Point(KW)
        </h2>
        <div
          style={{
            width: '300px',
            height: '200px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default EnergyChargedPieChart;
