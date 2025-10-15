import { vehiclesListQuery } from '@/entities/vehicle/vehicle.api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

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

  return (
    <div>
      {Array.from(data).map((vehicle) => (
        <div key={vehicle.id}>
          <h3>{vehicle.name}</h3>
          <p>{vehicle.model}</p>
          <p>{vehicle.year}</p>
        </div>
      ))}
    </div>
  );
}
