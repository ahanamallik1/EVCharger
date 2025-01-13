/**
 * A chart component displaying the total energy charged per day as a bar chart.
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components in Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface EnergyChargedChartProps {
  totalEnergyChargedPerDay: number;
}

const EnergyChargedChart: React.FC<EnergyChargedChartProps> = ({
  totalEnergyChargedPerDay,
}) => {
  // Define the chart data
  const chartData = {
    labels: ['Total Energy Charged Per Day'],
    datasets: [
      {
        label: 'Energy Charged (kWh)',
        data: [totalEnergyChargedPerDay],
        backgroundColor: '#4CAF50', // Green color for the bar
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  };

  // Define the chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="mt-8 text-center flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Total Energy Charged Per Day
      </h2>
      <div className="flex justify-center">
        <div style={{ width: '150px', height: '120px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default EnergyChargedChart;
