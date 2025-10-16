import * as React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Button } from '@/shared/ui/shadcn/button';
import { Vehicle } from '../model/type';
import { cn } from '@/shared/lib/cn';
import { SquarePenIcon } from '@/shared/ui/icons/square-pen.icon';
import { TrashIcon } from '@/shared/ui/icons/trash.icon';

interface VehicleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicle: Vehicle;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const VehicleCard = React.forwardRef<HTMLDivElement, VehicleCardProps>(
  ({ vehicle, onDeleteClick, onEditClick, className, ...props }, ref) => {
    const formattedPrice = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(vehicle.price);

    return (
      <Card ref={ref} className={cn('flex flex-col md:flex-row overflow-hidden', className)} {...props}>
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row justify-between items-center">
            <Button
              size="icon"
              variant="ghost"
              className="text-red-500 hover:bg-red-500 hover:text-white [&_svg]:size-6"
              onClick={() => onDeleteClick(vehicle.id)}
            >
              <TrashIcon />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white [&_svg]:size-6"
              onClick={() => onEditClick(vehicle.id)}
            >
              <SquarePenIcon />
            </Button>
          </div>

          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold">
                {vehicle.name} &middot; {vehicle.model}
              </CardTitle>
              <CardDescription>{vehicle.year}</CardDescription>
            </div>
            <p className="text-xl font-semibold self-start">{formattedPrice}</p>
          </CardHeader>
        </div>
      </Card>
    );
  },
);

VehicleCard.displayName = 'VehicleCard';

export { VehicleCard };
