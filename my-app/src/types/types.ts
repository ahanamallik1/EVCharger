export interface SimulationParams {
  chargePoints: number;
  arrivalProbability: number;
  carConsumption: number;
  chargingPower: number;
}

export interface SimulationResults {
  totalEnergy: number;
  peakPower: number;
  chargingEvents: number;
}

export interface TextInputProps {
  label: string;
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  onBlur: () => void;
}

export interface SliderInputProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  inputValue?: number;
  onChange: (value: number) => void;
}

export interface SubmitButtonProps {
  isDisabled: boolean;
}

export interface Metric {
  label: string;
  value: string;
  icon: string;
}

export interface UtilizationRateProps {
  utilizationRate: number; // Utilization rate value as a percentage
}

export interface EnergyChargedChartProps {
  totalEnergyChargedPerDay: number; // Total energy charged per day value
  chargingValuesPerChargePoint: number;
}

export interface BackToFormLinkProps {
  to: string;
  label: string;
}

export interface ChargingStationSimulation {
  arrivalProbability: number;
  carConsumption: number;
  chargePointTypes: {
    quantity: number;
    power: number;
  }[];
}

export interface ChargingStationSimulationResults {
  totalPowerPerChargePoint: number;
  totalEnergyChargedPerDay: number;
  totalChargingEventsPerDay: number;
  chargingEventsPerWeek: number;
  chargingEventsPerMonth: number;
  chargingEventsPerYear: number;
  powerDistribution: {
    power: number;
    quantity: number;
    totalPower: number;
  }[];
  exemplaryDay: {
    totalCapacityPerDay: number;
    utilizationRate: number;
  };
  concurrencyFactor: number;
}

export interface SimulationResultsData {
  chargingValuesPerChargePoint: number;
  totalEnergyChargedPerDay: number;
  chargingEventsPerDay: number;
  chargingEventsPerWeek: number;
  chargingEventsPerMonth: number;
  chargingEventsPerYear: number;
  exemplaryDay: {
    totalCapacityPerDay: number;
    utilizationRate: number;
  };
  concurrencyFactor: number;
}
