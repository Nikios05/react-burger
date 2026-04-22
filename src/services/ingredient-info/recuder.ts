import { createSlice } from '@reduxjs/toolkit';

import {
  closeIngredientInfo,
  showIngredientInfo,
  toggleCurrentDragIngredient,
} from '@services/ingredient-info/action.ts';

import type { TIngredient } from '@utils/types.ts';

type TIngredientInfoState = {
  ingredientInfo: TIngredient | null;
  showModalIngredient: boolean;
  currentDragIngredient: TIngredient | null;
};

const initialState: TIngredientInfoState = {
  ingredientInfo: null,
  showModalIngredient: false,
  currentDragIngredient: null,
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  selectors: {
    getIngredientInfo: (state): TIngredient | null => state.ingredientInfo,
    getShowModalIngredient: (state): boolean => state.showModalIngredient,
    getCurrentDragIngredient: (state): TIngredient | null => state.currentDragIngredient,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showIngredientInfo, (state, action) => {
        state.ingredientInfo = action.payload;
        state.showModalIngredient = true;
      })
      .addCase(closeIngredientInfo, (state) => {
        state.ingredientInfo = null;
        state.showModalIngredient = false;
      })
      .addCase(toggleCurrentDragIngredient, (state, action) => {
        state.currentDragIngredient = action.payload;
      });
  },
});

export const { getIngredientInfo, getShowModalIngredient, getCurrentDragIngredient } =
  ingredientSlice.selectors;
