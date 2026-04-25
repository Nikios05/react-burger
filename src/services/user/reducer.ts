import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '@utils/api.ts';

export type IUser = {
  email: string;
  name?: string;
  password?: string;
};

export type IUserState = {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUser: (state) => state.user,
  },
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        }
      )
      .addMatcher(
        authApi.endpoints.getUser.matchFulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { selectIsLoading, selectError, selectUser, selectIsAuthChecked } =
  userSlice.selectors;
