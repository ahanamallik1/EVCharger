/**
 * UtilizationRateChart component renders a doughnut chart displaying the utilization rate.
 * It visualizes the percentage of utilization for an exemplary day.
 */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { UtilizationRateProps } from '../types/types';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const UtilizationRateChart: React.FC<UtilizationRateProps> = ({
  utilizationRate,
}) => {
  // Define the chart data
  const chartData = {
    labels: ['Utilization Rate'],
    datasets: [
      {
        data: [utilizationRate, 100 - utilizationRate],
        backgroundColor: ['#4CAF50', '#e0e0e0'], // Green for the progress, light gray for the remainder
        hoverBackgroundColor: ['#45a049', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  // Define the chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    cutout: '70%',
    rotation: -90,
    circumference: 180,
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-8 text-center w-96 mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        An exemplary day <span> (Utilization Rate) </span>
      </h2>
      <div className="flex justify-center items-center">
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xl font-semibold text-gray-800">
            {utilizationRate.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilizationRateChart;
