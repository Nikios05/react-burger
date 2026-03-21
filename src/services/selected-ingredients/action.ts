import { createAction } from '@reduxjs/toolkit';

import type { IngredientExtended } from '@utils/types.ts';

export const addIngredient = createAction(
  'add-ingredient',
  (ingredient: IngredientExtended) => {
    return {
      payload: ingredient,
    };
  }
);

export const swapIngredients = createAction(
  'swap-ingredients',
  (positionA: number, positionB: number) => {
    return {
      payload: { positionA, positionB },
    };
  }
);

export const deleteIngredient = createAction('delete-ingredient', (id: string) => {
  return {
    payload: id,
  };
});
