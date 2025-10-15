import { z } from 'zod';
import { UpdateVehicleDtoSchema, VehicleDtoSchema, ApiErrorDataSchema } from './api.contracts';

export type VehicleDto = z.infer<typeof VehicleDtoSchema>;
export type UpdateVehicleDto = z.infer<typeof UpdateVehicleDtoSchema>;
export type VehicleDtoArray = Array<VehicleDto>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
