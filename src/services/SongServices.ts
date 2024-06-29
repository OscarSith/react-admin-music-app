import { ErrorFetch } from '../interfaces/globals';
import { ISong } from '../interfaces/Song';
import { fetchService } from '../utils/utils';

export const getSongsByAlbum = async (albumId: string): Promise<ISong[]> => {
  return fetchService('song/' + albumId + '/albums').then((res: Response) =>
    res.json(),
  );
};

export const saveSong = async (data: FormData): Promise<ISong> => {
  return fetchService('song', 'POST', data).then(async (response: Response) => {
    if (!response.ok) {
      const error = (await response.json()) as ErrorFetch;
      throw new Error(error.message);
    }

    return response.json();
  });
};

export const updateSongName = async (
  data: FormData,
  id: number,
): Promise<ISong> => {
  const newData = JSON.stringify({
    name: data.get('name'),
  });
  return fetchService('song/' + id, 'PUT', newData).then(
    async (response: Response) => {
      if (!response.ok) {
        const error = (await response.json()) as ErrorFetch;
        throw new Error(error.message);
      }

      return response.json();
    },
  );
};
