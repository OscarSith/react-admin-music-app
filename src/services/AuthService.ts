import { URL_SERVER_API } from '../constants';
import { IAuth } from '../interfaces/Auth';

const authService = async (data: any) => {
  return fetch(URL_SERVER_API + 'auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res: Response) => {
    const data: IAuth = await res.json();
    if (res.status >= 400) {
      throw new Error(data.message);
    }
    return data;
  });
};

export default authService;
