export const fetchService = async (
  url: string,
  token: string,
  method: string = 'GET',
  data?: any,
): Promise<any> => {
  return fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: data,
    method,
  }).then((res: Response) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error('Ocurrió un error inesperado');
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
