import { deleteVehicle, getVehicles, updateVehicle } from '@/app/api/api.service';
import { UpdateVehicleDto, VehicleDto, VehicleDtoArray } from '@/app/api/api.types';
import { queryClient } from '@/app/providers/with-query';
import { sleep } from '@/shared/lib/utils';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

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

export const useDeleteVehicleMutation = () => {
  const queryClient = useQueryClient();
  // имитация запроса к API
  const isMock = import.meta.env.VITE_MOCK_API === 'true';

  return useMutation({
    mutationFn: async (id: number) => {
      if (isMock) {
        await sleep(1000);

        console.warn('mock delete vehicle', id);

        return Promise.resolve({ id });
      }
      return deleteVehicle(id);
    },

    // оптимистичное удаление
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['vehicles'] });

      const previous = queryClient.getQueryData<VehicleDtoArray>(['vehicles']);

      queryClient.setQueryData<VehicleDtoArray>(['vehicles'], (old) => old?.filter((vehicle) => vehicle.id !== id));

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData<VehicleDtoArray>(['vehicles'], ctx.previous);
        // TODO: toast error
        console.error('Error deleting vehicle', _err);
      }
    },

    onSettled: () => {
      // В mock режиме не инвалидируем, чтобы избежать отката удаления
      if (!isMock) {
        queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      }
    },
  });
};

type UpdateVehicleArgs = { id: number; dto: UpdateVehicleDto };

export const useUpdateVehicleMutation = () => {
  const queryClient = useQueryClient();
  const isMock = import.meta.env.VITE_MOCK_API === 'true';

  return useMutation({
    mutationFn: async ({ id, dto }: UpdateVehicleArgs) => {
      if (isMock) {
        await sleep(300);
        console.warn('mock update vehicle', id, dto);
        return Promise.resolve({ id, dto });
      }
      return updateVehicle(dto, id);
    },

    onMutate: async ({ id, dto }) => {
      await queryClient.cancelQueries({ queryKey: ['vehicles'] });

      const previous = queryClient.getQueryData<VehicleDtoArray>(['vehicles']);

      queryClient.setQueryData<VehicleDtoArray>(['vehicles'], (old) =>
        (old ?? []).map((vehicle) => (vehicle.id === id ? { ...vehicle, ...dto } : vehicle)),
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData<VehicleDtoArray>(['vehicles'], ctx.previous);
      }
    },

    onSettled: () => {
      if (!isMock) {
        queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      }
    },
  });
};
