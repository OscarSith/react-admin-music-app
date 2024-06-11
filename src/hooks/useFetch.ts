import { useEffect, useState } from 'react';
import { fetchService } from '../utils/utils';

interface ErrorFetch {
  error: string;
  message: string;
  statusCode: number;
}

export const useFetch = (
  url: string,
  method: string = 'GET',
  payload?: FormData,
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const abortController = new AbortController();
    setLoading(true);

    fetchService(url, method, payload)
      .then(async (response: Response) => {
        if (response.ok) {
          return response.json();
        }

        const errData = (await response.json()) as ErrorFetch;

        throw new Error(errData.message, { cause: errData.error });
      })
      .then((data) => setData(data))
      .catch((err: Error) => setError(err.cause + ', ' + err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
