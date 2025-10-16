import { AxiosRequestConfig } from 'axios';
import { api } from './instance';
import { VehicleDtoSchemaArray } from './api.contracts';
import { responseContract } from './api.lib';
import { UpdateVehicleDto } from './api.types';

export function getVehicles(config?: AxiosRequestConfig) {
  return api.get('/vehicles', config).then(responseContract(VehicleDtoSchemaArray));
}

export function deleteVehicle(id: number) {
  console.warn('deleteVehicle api requestis not implemented');
  return Promise.resolve({ id });
}

export function updateVehicle(dto: UpdateVehicleDto, id: number) {
  console.warn('updateVehicle api requestis not implemented');
  return Promise.resolve({ dto, id });
}
