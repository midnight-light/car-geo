import { z } from 'zod';
import { UpdateVehicleDtoSchema, VehicleDtoSchema, VehicleDtoSchemaArray } from './api.contracts';

export type VehicleDto = z.infer<typeof VehicleDtoSchema>;
export type UpdateVehicleDto = z.infer<typeof UpdateVehicleDtoSchema>;
export type VehicleDtoArray = z.infer<typeof VehicleDtoSchemaArray>;
