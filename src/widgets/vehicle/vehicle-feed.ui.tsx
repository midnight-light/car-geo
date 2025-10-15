import { RootState } from '@/app/store';
import { vehiclesListQuery } from '@/entities/vehicle/vehicle.api';
import { selectSortedVehicles } from '@/entities/vehicle/vehicle.selectors';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

export function VehicleFeed() {
  return <VehicleList />;
}

function VehicleList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaseVehicleList />
    </Suspense>
  );
}

function BaseVehicleList() {
  const { data } = useSuspenseQuery(vehiclesListQuery());
  const vehicles = useSelector((state: RootState) => selectSortedVehicles(state, data));

  return (
    <div>
      {Array.from(vehicles).map((vehicle) => (
        <div key={vehicle.id}>
          <h3>{vehicle.name}</h3>
          <p>{vehicle.model}</p>
          <p>{vehicle.year}</p>
        </div>
      ))}
    </div>
  );
}
