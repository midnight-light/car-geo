import { z } from 'zod';

export const EditVehicleFormSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
  price: z
    .number({ error: 'Цена должна быть числом' })
    .positive('Цена должна быть положительной')
    .min(0.01, 'Минимальная цена: 0.01'),
});

export type EditVehicleFormValues = z.infer<typeof EditVehicleFormSchema>;
