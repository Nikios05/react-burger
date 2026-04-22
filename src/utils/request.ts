export const API_BASE_URL = 'https://new-stellarburgers.education-services.ru/api';

export type TApiResponse = {
  success: boolean;
  data?: unknown;
};

const checkResponse = <T extends TApiResponse>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(res.statusText));
};

const checkSuccess = <T extends TApiResponse>(res: T): T | Promise<never> => {
  if (res?.success) {
    return res;
  }

  return Promise.reject(new Error(`Ошибка получения данных`));
};

export const request = <T extends TApiResponse>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${API_BASE_URL}/${endpoint}`, options)
    .then((res) => checkResponse<T>(res))
    .then((res) => checkSuccess<T>(res));
};
