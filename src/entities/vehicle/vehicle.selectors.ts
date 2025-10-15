import { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { Vehicle, VehicleSortField, VehicleSortOrder } from './model/type';

export const selectSelectedVehicleId = (state: RootState) => state.vehicle.selectedVehicleId;
export const vehicleSortBy = (state: RootState) => state.vehicle.sortBy;
export const vehicleSortOrder = (state: RootState) => state.vehicle.sortOrder;

// хелпер для передачи данных из React Query в селекторы
const selectVehiclesFromQuery = (_: RootState, vehicles: Vehicle[] | undefined) => vehicles ?? [];

export const selectSortedVehicles = createSelector(
  [selectVehiclesFromQuery, vehicleSortBy, vehicleSortOrder],
  (vehicles: Vehicle[], sortBy: VehicleSortField, sortOrder: VehicleSortOrder) => {
    return [...vehicles].sort((a, b) => {
      const diff = a[sortBy] - b[sortBy];
      return sortOrder === 'asc' ? diff : -diff;
    });
  },
);

export const selectSelectedVehicle = createSelector(
  [selectVehiclesFromQuery, selectSelectedVehicleId],
  (vehicles, selectedId) => {
    if (selectedId == null) return null;
    return vehicles.find((v) => v.id === selectedId) ?? null;
  },
);
