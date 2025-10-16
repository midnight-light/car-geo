import { Vehicle } from '@/entities/vehicle/model/type';

export interface EditVehicleProps {
  vehicle: Vehicle;
  onSuccess?: () => void;
}
