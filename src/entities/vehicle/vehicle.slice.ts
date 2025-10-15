import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleSortField, VehicleSortOrder, VehicleState } from './model/type';

const initialState: VehicleState = {
  selectedVehicleId: null,
  sortBy: 'year',
  sortOrder: 'desc',
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setSelectedVehicleId: (state, action: PayloadAction<number | null>) => {
      state.selectedVehicleId = action.payload;
    },
    setSortBy: (state, action: PayloadAction<VehicleSortField>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<VehicleSortOrder>) => {
      state.sortOrder = action.payload;
    },
    clearState: () => {
      return initialState;
    },
  },
});

export const vehicleReducer = vehicleSlice.reducer;
export const { setSelectedVehicleId, setSortBy, setSortOrder, clearState } = vehicleSlice.actions;
