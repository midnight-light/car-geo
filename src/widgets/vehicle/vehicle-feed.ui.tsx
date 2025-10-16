import { RootState } from '@/app/store';
import { Vehicle } from '@/entities/vehicle/model/type';
import { VehicleCard } from '@/entities/vehicle/ui/vehicle.card.ui';
import { useDeleteVehicleMutation, vehiclesListQuery } from '@/entities/vehicle/vehicle.api';
import { selectSortedVehicles, vehicleSortBy, vehicleSortOrder } from '@/entities/vehicle/vehicle.selectors';
import { setSortBy, setSortOrder } from '@/entities/vehicle/vehicle.slice';
import { EditVehicleDialog } from '@/features/vehicle/edit-vehicle/edit-vehicle-dialog';
import { Button } from '@/shared/ui/shadcn/button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  const sortOrder = useSelector((state: RootState) => vehicleSortOrder(state));
  const sortBy = useSelector((state: RootState) => vehicleSortBy(state));

  const vehicles = useSelector((state: RootState) => selectSortedVehicles(state, data));

  const dispatch = useDispatch();
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

  const handleSortClick = useCallback(() => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  }, [dispatch, sortOrder]);

  const handleSortFieldChange = useCallback(
    (field: 'year' | 'price') => {
      if (field !== sortBy) dispatch(setSortBy(field));
    },
    [dispatch, sortBy],
  );

  const handleEditSuccess = () => {
    if (!editingVehicle) return;

    setEditingVehicle(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full flex items-center gap-2 justify-end">
          <span className="text-sm text-muted-foreground">Отсортировать по:</span>
          <div className="flex gap-1">
            <Button
              variant={sortBy === 'year' ? 'default' : 'outline'}
              aria-pressed={sortBy === 'year'}
              onClick={() => handleSortFieldChange('year')}
            >
              год
            </Button>
            <Button
              variant={sortBy === 'price' ? 'default' : 'outline'}
              aria-pressed={sortBy === 'price'}
              onClick={() => handleSortFieldChange('price')}
            >
              цена
            </Button>
          </div>
          <Button
            variant="secondary"
            onClick={handleSortClick}
            aria-label={`Порядок: ${sortOrder}`}
            className="ml-2 w-36"
          >
            {sortOrder === 'asc' ? 'возрастанию ▲' : 'убыванию ▼'}
          </Button>
        </div>
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
