import { URL_SERVER_API } from '../constants';

export const fetchService = async (
  url: string,
  // signal: AbortSignal,
  method: string = 'GET',
  data?: FormData,
): Promise<any> => {
  const { access_token } = JSON.parse(localStorage.getItem('user'));
  return fetch(URL_SERVER_API + url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    body: data,
    method,
    // signal,
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
