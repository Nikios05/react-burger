import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@utils/request.ts';

import type { TApiResponse } from '@utils/request.ts';
import type { TIngredient } from '@utils/types.ts';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Ingredient', 'Ingredients'],
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => ({
        url: '/ingredients',
      }),
      transformResponse: (response: TApiResponse) => {
        if (response?.data && Array.isArray(response.data)) {
          return response.data;
        }

        return [];
      },
      providesTags: (data) => {
        return data
          ? [
              ...data.map(({ _id }) => ({ type: 'Ingredient' as const, id: _id })),
              { type: 'Ingredients', id: 'LIST' },
            ]
          : [{ type: 'Ingredients', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
