export const API_BASE_URL = 'https://new-stellarburgers.education-services.ru/api';

type TApiResponse = {
  success: boolean;
  data: unknown;
};

const checkResponse = (res: Response): Promise<TApiResponse> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

const checkSuccess = (res: TApiResponse): TApiResponse | Promise<never> => {
  if (res?.success) {
    return res;
  }

  return Promise.reject(new Error(`Ответ получения данных`));
};

export const request = (
  endpoint: string,
  options?: RequestInit
): Promise<TApiResponse> => {
  return fetch(`${API_BASE_URL}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};
