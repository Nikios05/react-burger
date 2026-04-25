import { request, type TApiResponse } from '@utils/request.ts';

export type TApiTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

function isApiError(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
  );
}

export function isTokenExists(): boolean {
  return !!localStorage.getItem('accessToken');
}

export async function refreshToken(): Promise<TApiTokenResponse> {
  const refreshData = await request<TApiTokenResponse>('auth/token', {
    method: 'POST',
    body: JSON.stringify({ token: localStorage.getItem('accessToken') }),
  });

  localStorage.setItem('accessToken', refreshData.accessToken);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  return refreshData;
}

export const fetchWithRefresh = async (
  endpoint: string,
  options: RequestInit
): Promise<TApiResponse> => {
  try {
    return await request(endpoint, options);
  } catch (error) {
    const token = localStorage.getItem('refreshToken');
    if (!token) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      throw new Error('No refresh token');
    }

    if (isApiError(error) && (error.status === 401 || (error.status === 403 && token))) {
      const refreshData = await refreshToken();

      return request(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
};
