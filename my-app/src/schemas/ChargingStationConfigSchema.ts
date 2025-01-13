/**
 * Zod schema for validating the charging station configuration.
 * It ensures that the arrival probability, car consumption, and charge point types
 * meet the required criteria for meaningful simulation and application usage.
 */

import { z } from 'zod';
export const ChargingStationConfigSchema = z.object({
  arrivalProbability: z
    .number()
    .min(20, {
      message:
        'Arrival probability must be at least 20% to ensure meaningful simulations.',
    })
    .max(200, { message: 'Arrival probability cannot exceed 200%.' })
    .default(100),
  carConsumption: z
    .number()
    .min(1, {
      message:
        'Car consumption must be at least 1 kWh to simulate vehicle usage.',
    })
    .default(18),
  chargePointTypes: z
    .array(
      z.object({
        quantity: z
          .number()
          .min(1, { message: 'Quantity must be at least 1.' })
          .default(1),
        power: z
          .number()
          .min(1, { message: 'Power must be at least 1 kW.' })
          .default(22),
      }),
    )
    .default([{ quantity: 1, power: 22 }]),
});
