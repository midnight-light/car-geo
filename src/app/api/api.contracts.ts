import { z } from 'zod';

export const VehicleDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.string(),
  price: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});

export const VehicleDtoSchemaArray = z.array(VehicleDtoSchema);

export const UpdateVehicleDtoSchema = VehicleDtoSchema.partial().omit({
  id: true,
});

export const ApiErrorDataSchema = z.array(z.string());
