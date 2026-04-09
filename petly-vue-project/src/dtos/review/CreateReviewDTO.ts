// Autor: Nombre Apellido

import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export type CreateReviewDTO = Omit<ReviewInterface, 'id'>;
