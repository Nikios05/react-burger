import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { ingredientSlice } from '@services/ingredient-info/recuder.ts';
import { ordersApi } from '@services/orders/api.ts';
import { selectedIngredientsSlice } from '@services/selected-ingredients/recuder.ts';

import { ingredientsApi } from './ingredients/api.js';

const rootReducer = combineSlices(
  ingredientsApi,
  ordersApi,
  ingredientSlice,
  selectedIngredientsSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      ordersApi.middleware
    );
  },
});
