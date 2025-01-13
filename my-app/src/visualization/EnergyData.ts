/**
 * Generates data for a chart displaying energy charged per day and charging per charge point.
 */

export const generateChartData = (
  totalEnergyChargedPerDay: number,
  chargingValuesPerChargePoint: number,
) => {
  return {
    labels: ['Energy Charged Per Day', 'Charging Per Charge Point'],
    datasets: [
      {
        label: 'Energy Data',
        data: [totalEnergyChargedPerDay, chargingValuesPerChargePoint],
        backgroundColor: ['#4CAF50', '#FFCE56'], // Green and Yellow colors
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  };
};
