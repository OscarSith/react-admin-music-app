import { fetchService } from './utils';

// interface ErrorFetch {
//   error: string;
//   message: string;
//   statusCode: number;
// }

const getSuspender = (promise: Promise<any[]>) => {
  let status = 'pending';
  let response = [] as any;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export const fetchData = (url: string) => {
  const promise = fetchService(url)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => data);

  return getSuspender(promise);
};
