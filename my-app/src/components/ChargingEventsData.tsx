/**
 * ChargingEventsData component renders a doughnut chart that displays the distribution
 * of charging events per day, week, month, and year.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getDoughnutChartData } from '../visualization/ChargingEvents'; // Adjust the path as needed

import { selectSimulationResults } from '../selectors/selectSimulationResults';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChargingEventsData: React.FC = () => {
  // Select data from Redux store
  const {
    chargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
  } = useSelector(selectSimulationResults);

  // Prepare Doughnut Chart Data
  const doughnutChartData = getDoughnutChartData(
    chargingEventsPerDay,
    chargingEventsPerWeek,
    chargingEventsPerMonth,
    chargingEventsPerYear,
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 -mt-5">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Charging Events Distribution
        </h2>
        <div className="h-48 w-full mb-4">
          <Doughnut
            data={doughnutChartData}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || '';
                      const value = (context.raw as number) || 0;
                      return `${label}: ${value.toFixed(2)}`;
                    },
                  },
                },
                legend: {
                  position: 'top',
                  display: true,
                  labels: {
                    boxWidth: 20,
                    padding: 15,
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChargingEventsData;
