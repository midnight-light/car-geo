import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/shadcn/dialog';
import { EditVehicleForm } from './edit-vehicle-form';
import { EditVehicleProps } from './edit-vehicle.types';

interface EditVehicleDialogProps extends EditVehicleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditVehicleDialog({ vehicle, open, onOpenChange, onSuccess }: EditVehicleDialogProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать транспорт</DialogTitle>
          <DialogDescription>
            Внесите изменения в информацию о транспорте {vehicle.name} {vehicle.model}
          </DialogDescription>
        </DialogHeader>
        <EditVehicleForm vehicle={vehicle} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}

EditVehicleDialog.displayName = 'EditVehicleDialog';
