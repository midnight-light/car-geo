import { getVehicles } from '@/app/api/api.service';
import { VehicleDto, VehicleDtoArray } from '@/app/api/api.types';
import { queryClient } from '@/app/providers/with-query';
import { queryOptions } from '@tanstack/react-query';

export const vehiclesListQuery = () => {
  return queryOptions({
    queryKey: ['vehicles'],

    queryFn: async ({ signal }): Promise<VehicleDto[]> => {
      const { data } = await getVehicles({ signal });
      return data;
    },

    initialData: queryClient.getQueryData<VehicleDtoArray>(['vehicles']),

    initialDataUpdatedAt: queryClient.getQueryState(['vehicles'])?.dataUpdatedAt,
  });
};
