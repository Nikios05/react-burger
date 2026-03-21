import type { TIngredient } from '@utils/types.ts';

export const API_BASE_URL = 'https://new-stellarburgers.education-services.ru/api';

export type TApiResponse = {
  success: boolean;
  data: TIngredient[];
};
