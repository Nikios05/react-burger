import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@utils/request.ts';

type OrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    headers: {
      authorization: localStorage.getItem('accessToken') ?? '',
    },
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    sendOrder: builder.mutation<OrderResponse, string[]>({
      query: (ingredientsIds: string[]) => ({
        url: '/orders',
        method: 'POST',
        body: {
          ingredients: ingredientsIds,
        },
      }),
    }),
  }),
});

export const { useSendOrderMutation } = ordersApi;
