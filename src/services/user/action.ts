import { createAsyncThunk } from '@reduxjs/toolkit';

import { setIsAuthChecked, setUser } from '@services/user/reducer.ts';
import { authApi } from '@utils/api.ts';
import { isTokenExists } from '@utils/tokens.ts';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        const response = await dispatch(
          authApi.endpoints.getUser.initiate(undefined, { forceRefetch: true })
        );

        if (response.data) {
          dispatch(setUser(response.data));
        }
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
