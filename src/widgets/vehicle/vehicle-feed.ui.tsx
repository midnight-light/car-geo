import { RootState } from '@/app/store';
import { VehicleCard } from '@/entities/vehicle/ui/vehicle.card.ui';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from(vehicles).map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} className="w-full" />
      ))}
    </div>
  );
}

BaseVehicleList.displayName = 'BaseVehicleList';
