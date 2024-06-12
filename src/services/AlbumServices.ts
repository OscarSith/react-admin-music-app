import { IAlbum } from '../interfaces/Album';
import { IArtist } from '../interfaces/Artist';
import { fetchService } from '../utils/utils';

export const searchArtistsByFullname = async (
  fullname: string,
): Promise<IArtist[]> => {
  return fetchService('artists/search-by?name=' + fullname).then(
    (res: Response) => res.json(),
  );
};

export const albumsByArtistId = async (artistId: number): Promise<IAlbum[]> => {
  return fetchService('album/by-artist/' + artistId).then((res: Response) =>
    res.json(),
  );
};

export const addAlbum = async (data: FormData) => {
  return fetchService('album', 'POST', data).then((res: Response) =>
    res.json(),
  );
};

export const updateAlbumById = async (albumId: number, data: FormData) => {
  return fetchService('album/' + albumId, 'PUT', data).then((res: Response) =>
    res.json(),
  );
};

export const deleteAlbumById = async (albumId: number) => {
  return fetchService('album/' + albumId, 'DELETE').then((res: Response) =>
    res.json(),
  );
};
