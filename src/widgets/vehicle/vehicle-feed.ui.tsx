import { RootState } from '@/app/store';
import { Vehicle } from '@/entities/vehicle/model/type';
import { VehicleCard } from '@/entities/vehicle/ui/vehicle.card.ui';
import { useDeleteVehicleMutation, vehiclesListQuery } from '@/entities/vehicle/vehicle.api';
import { selectSortedVehicles } from '@/entities/vehicle/vehicle.selectors';
import { EditVehicleDialog } from '@/features/vehicle/edit-vehicle/edit-vehicle-dialog';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
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

  const { mutate: deleteVehicle } = useDeleteVehicleMutation();

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleDeleteClick = (id: number) => {
    deleteVehicle(id);
  };

  const handleEditClick = (id: number) => {
    const vehicle = vehicles.find((v) => v.id === id);
    if (vehicle) {
      setEditingVehicle(vehicle);
    }
  };

  const handleEditSuccess = () => {
    if (!editingVehicle) return;

    setEditingVehicle(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from(vehicles).map((vehicle: Vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            className="w-full"
            onDeleteClick={handleDeleteClick}
            onEditClick={(id) => handleEditClick(id)}
          />
        ))}
      </div>

      {editingVehicle && (
        <EditVehicleDialog
          vehicle={editingVehicle}
          open={!!editingVehicle}
          onSuccess={handleEditSuccess}
          onOpenChange={(open) => !open && setEditingVehicle(null)}
        />
      )}
    </>
  );
}
