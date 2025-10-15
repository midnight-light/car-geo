import { AxiosRequestConfig } from 'axios';
import { api } from './instance';
import { VehicleDtoSchemaArray } from './api.contracts';
import { responseContract } from './api.lib';

export function getVehicles(config?: AxiosRequestConfig) {
  return api.get('/vehicles', config).then(responseContract(VehicleDtoSchemaArray));
}
