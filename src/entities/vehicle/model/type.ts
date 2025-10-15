export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

export interface VehicleState {
  selectedVehicleId: number | null;

  sortBy: VehicleSortField;
  sortOrder: VehicleSortOrder;
}

export type VehicleSortOrder = 'asc' | 'desc';

export type VehicleSortField = 'year' | 'price';
