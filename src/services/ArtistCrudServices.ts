import { IArtist } from '../interfaces/Artist';
import { ErrorFetch } from '../interfaces/globals';
import { fetchService } from '../utils/utils';

const VERBO = 'artists';

const updateArtist = async (
  id: number,
  formData: FormData,
  callback: (message: string) => void,
  handleCloseModal: () => void,
  successCallback: (artist?: IArtist) => void,
): Promise<IArtist> => {
  return apiService(
    VERBO + '/' + id,
    'PUT',
    formData,
    callback,
    handleCloseModal,
    successCallback,
  );
};

const addArtist = async (
  formData: FormData,
  callback: (err: string) => void,
  handleCloseModal: () => void,
  successCallback: (artist?: IArtist) => void,
): Promise<IArtist> => {
  return apiService(
    VERBO,
    'POST',
    formData,
    callback,
    handleCloseModal,
    successCallback,
  );
};

const deleteArtist = async (
  id: number,
  callback: (err: string) => void,
  handleCloseModal: () => void,
  successCallback: () => void,
): Promise<any> => {
  return apiService(
    VERBO + '/' + id,
    'DELETE',
    null,
    callback,
    handleCloseModal,
    successCallback,
  );
};

const apiService = async (
  url: string,
  method: string,
  formData: FormData | null,
  callback: (err: string) => void,
  handleCloseModal: () => void,
  successCallback: (artist?: IArtist) => any,
): Promise<IArtist> => {
  return fetchService(url, method, formData)
    .then(async (response: Response) => {
      if (!response.ok) {
        const error = (await response.json()) as ErrorFetch;
        throw new Error(error.message);
      }

      return response.json();
    })
    .then((artist) => successCallback(artist))
    .catch((e: Error) => {
      callback(e.message);
    })
    .finally(() => handleCloseModal());
};

export { updateArtist, addArtist, deleteArtist };
