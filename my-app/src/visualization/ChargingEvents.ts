/**
 * Generates data for a Doughnut chart displaying charging events at different time intervals
 * (daily, weekly, monthly, yearly) with appropriate colors.
 */

import { ChartData } from 'chart.js';

export const getDoughnutChartData = (
  chargingEventsPerDay: number,
  chargingEventsPerWeek: number,
  chargingEventsPerMonth: number,
  chargingEventsPerYear: number,
): ChartData<'doughnut'> => ({
  labels: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
  datasets: [
    {
      data: [
        chargingEventsPerDay,
        chargingEventsPerWeek,
        chargingEventsPerMonth,
        chargingEventsPerYear,
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
});
