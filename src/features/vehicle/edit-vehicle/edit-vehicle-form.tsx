import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/shadcn/form';
import { useUpdateVehicleMutation } from '@/entities/vehicle/vehicle.api';
import { EditVehicleFormSchema, EditVehicleFormValues } from './edit-vehicle.schema';
import { EditVehicleProps } from './edit-vehicle.types';

export function EditVehicleForm({ vehicle, onSuccess }: EditVehicleProps) {
  const { mutate: updateVehicle, isPending } = useUpdateVehicleMutation();

  const form = useForm<EditVehicleFormValues>({
    resolver: zodResolver(EditVehicleFormSchema),
    defaultValues: {
      name: vehicle.name,
      price: vehicle.price,
    },
  });

  const onSubmit = (data: EditVehicleFormValues) => {
    updateVehicle(
      { id: vehicle.id, dto: data },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => {
          console.error('Failed to update vehicle:', error);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Toyota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="1500000"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

EditVehicleForm.displayName = 'EditVehicleForm';
