import { createSelector, createSlice } from '@reduxjs/toolkit';

import {
  addIngredient,
  clearIngredients,
  deleteIngredient,
  swapIngredients,
} from '@services/selected-ingredients/action.ts';

import type { IngredientExtended } from '@utils/types.ts';

type TIngredientInfoState = {
  bun: IngredientExtended | null;
  ingredients: IngredientExtended[];
};

const initialState: TIngredientInfoState = {
  bun: null,
  ingredients: [],
};

const selectBun = (state: TIngredientInfoState): IngredientExtended | null => state.bun;
const selectIngredients = (state: TIngredientInfoState): IngredientExtended[] =>
  state.ingredients;

const getSelectedIngredientsSelector = createSelector(
  [selectIngredients],
  (ingredients) => {
    return ingredients.map((ingredient, i) => ({
      ...ingredient,
      position: i,
    }));
  }
);

const getSelectedIngredientsCountMapSelector = createSelector(
  [
    (state: TIngredientInfoState): IngredientExtended[] => {
      return state.bun
        ? [state.bun, ...state.ingredients, state.bun]
        : state.ingredients;
    },
  ],
  (ingredients: IngredientExtended[]) => {
    return ingredients.reduce(
      (acc, item) => {
        acc[item._id] = (acc[item._id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }
);

const getOrderPriceSelector = createSelector(
  [selectBun, selectIngredients],
  (bun, ingredients) => {
    const ingredientsPriceSum = ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );

    return bun ? ingredientsPriceSum + bun.price * 2 : ingredientsPriceSum;
  }
);

export const selectedIngredientsSlice = createSlice({
  name: 'selected-ingredients',
  initialState,
  selectors: {
    getSelectedBun: selectBun,
    getSelectedIngredients: getSelectedIngredientsSelector,
    getSelectedIngredientsCountMap: getSelectedIngredientsCountMapSelector,
    getOrderPrice: getOrderPriceSelector,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIngredient, (state, action) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      })
      .addCase(swapIngredients, (state, action) => {
        const newItemsPosition = [...state.ingredients];
        const [draggedItem] = newItemsPosition.splice(action.payload.positionA, 1);

        newItemsPosition.splice(action.payload.positionB, 0, draggedItem);
        state.ingredients = newItemsPosition;
      })
      .addCase(deleteIngredient, (state, action) => {
        state.ingredients = state.ingredients.filter(
          (ingredient) => ingredient.innerId !== action.payload
        );
      })
      .addCase(clearIngredients, (state) => {
        state.ingredients = [];
        state.bun = null;
      });
  },
});

export const {
  getSelectedIngredients,
  getSelectedBun,
  getSelectedIngredientsCountMap,
  getOrderPrice,
} = selectedIngredientsSlice.selectors;
