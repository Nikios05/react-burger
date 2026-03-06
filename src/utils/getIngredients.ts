import { API_BASE_URL } from '@utils/constants.ts';

import type { TIngredient } from '@utils/types.ts';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export const getIngredients = async (): Promise<TIngredientsResponse> => {
  const res = await fetch(`${API_BASE_URL}/ingredients`);

  if (!res.ok) {
    return { success: false, data: [] };
  }

  return res.json() as Promise<TIngredientsResponse>;
};
