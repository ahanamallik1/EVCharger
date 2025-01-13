/**
 * Zod schema for validating the charging station configuration.
 * It ensures that the arrival probability, car consumption, and charge point types
 * meet the required criteria for meaningful simulation and application usage.
 */

import { z } from 'zod';

export const SimulationConfigSchema = z.object({
  chargePoints: z
    .number()
    .min(1, { message: 'Charge points must be at least 1.' })
    .default(20),
  arrivalProbability: z
    .number()
    .min(20, { message: 'Arrival probability cannot be less than 20%.' })
    .max(200, { message: 'Arrival probability cannot exceed 200%.' })
    .default(100),
  carConsumption: z
    .number()
    .min(1, { message: 'Car consumption must be at least 1 kWh.' })
    .default(18),
  chargingPower: z
    .number()
    .min(1, { message: 'Charging power must be at least 1 kW.' })
    .default(11),
});
