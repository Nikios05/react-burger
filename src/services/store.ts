import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { ingredientSlice } from '@services/ingredient-info/recuder.ts';
import { ordersApi } from '@services/orders/api.ts';
import { selectedIngredientsSlice } from '@services/selected-ingredients/recuder.ts';
import { userSlice } from '@services/user/reducer.ts';
import { authApi } from '@utils/api.ts';

import { ingredientsApi } from './ingredients/api.js';

const rootReducer = combineSlices(
  authApi,
  userSlice,
  ingredientsApi,
  ordersApi,
  ingredientSlice,
  selectedIngredientsSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      ingredientsApi.middleware,
      ordersApi.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
