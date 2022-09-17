import { z } from 'zod';
import { IVehicle } from './IVehicle';

export const motoZodSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).positive().lte(2500),
});

type Motorcycle = z.infer<typeof motoZodSchema>;

export interface IMotorcycle extends IVehicle {
  category: Motorcycle['category'],
  engineCapacity: Motorcycle['engineCapacity']
}