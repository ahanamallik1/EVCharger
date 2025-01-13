/**
 * Returns an array of metrics for charging station data.
 */

import { Metric } from '../types/types';

export const metrics = (
  totalEnergyChargedPerDay: number,
  totalPowerPerChargePoint: number,
  chargingEventsPerDay: number,
  chargingEventsPerWeek: number,
  chargingEventsPerMonth: number,
  chargingEventsPerYear: number,
  utilizationRate: number,
  totalCapacityPerDay: number,
  concurrencyFactor: number,
): Metric[] => [
  {
    label: 'Total Energy Charged per Day (kWh)',
    value: `${totalEnergyChargedPerDay.toFixed(2)} kWh`,
    icon: '⚡',
  },
  {
    label: 'Total Power Consumed by Charge Points (kW)',
    value: `${totalPowerPerChargePoint.toFixed(2)} kW`,
    icon: '🔌',
  },
  {
    label: 'Charging Events per Day',
    value: chargingEventsPerDay.toFixed(2),
    icon: '🚗',
  },
  {
    label: 'Charging Events per Week',
    value: chargingEventsPerWeek.toFixed(2),
    icon: '📅',
  },
  {
    label: 'Charging Events per Month',
    value: chargingEventsPerMonth.toFixed(2),
    icon: '📆',
  },
  {
    label: 'Charging Events per Year',
    value: chargingEventsPerYear.toFixed(2),
    icon: '📈',
  },
  {
    label: 'Utilization Rate (exemplary day)',
    value: `${utilizationRate.toFixed(2)}%`,
    icon: '📊',
  },
  {
    label: 'Total Capacity per Day (kWh)',
    value: `${totalCapacityPerDay.toFixed(2)} kWh`,
    icon: '🔋',
  },
  {
    label: 'Concurreny Factor (%)',
    value: `${concurrencyFactor.toFixed(2)} %`,
    icon: '🚗',
  },
];
