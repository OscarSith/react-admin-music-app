import { URL_SERVER_API } from '../constants';

export const fetchService = async (
  url: string,
  token: string,
  method: string = 'GET',
  data?: FormData,
): Promise<any> => {
  return fetch(URL_SERVER_API + url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: data,
    method,
  }).then(async (res: Response) => {
    if (res.ok) {
      return res.json();
    }

    const errorData = await res.json();
    throw new Error(errorData.message);
  });
};

export const formatCreateDate = (created_at: string): string => {
  const date = new Date(created_at);
  return new Intl.DateTimeFormat('es-PE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
};
