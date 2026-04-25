import { createAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@utils/types.ts';

export const showIngredientInfo = createAction(
  'show-ingredient-info',
  (selectedIngredient: TIngredient) => {
    return {
      payload: selectedIngredient,
    };
  }
);

export const closeIngredientInfo = createAction('close-ingredient-info');

export const toggleCurrentDragIngredient = createAction(
  'toggle-current-drag-ingredient',
  (dragIngredient: TIngredient | null) => {
    return {
      payload: dragIngredient,
    };
  }
);
