import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchWithRefresh } from '@utils/tokens.js';

import type { IUser } from '@services/user/reducer.ts';

type BaseQueryArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH';
};

type Headers = {
  'Content-Type': string;
  authorization?: string;
};

type BaseQueryResult<T = unknown> = {
  data: T;
};

async function baseQueryWithRefresh(args: BaseQueryArgs): Promise<BaseQueryResult> {
  const { url, method = 'GET', ...rest } = args;
  const token = localStorage.getItem('accessToken');

  const headers: Headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.authorization = token;
  }

  const options = {
    method,
    headers,
    ...rest,
  };

  const data = await fetchWithRefresh(url, options);

  return { data };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: IUser) => ({
        url: 'auth/login',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response: {
        user: IUser;
        accessToken: string;
        refreshToken: string;
      }) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        return response.user;
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response: {
        user: IUser;
        accessToken: string;
        refreshToken: string;
      }) => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response.user;
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
      transformResponse: (response: { user: IUser }) => response.user,
    }),
    updateUser: builder.mutation({
      query: (credentials: IUser) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response: { user: IUser }) => {
        return response.user;
      },
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      }),
      transformResponse: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      },
    }),
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: 'password-reset',
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
      transformResponse: () => {
        return null;
      },
    }),
    resetPassword: builder.mutation({
      query: ({ password, token }: { password: string; token: string }) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: JSON.stringify({ password, token }),
      }),
      transformResponse: () => {
        return null;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
