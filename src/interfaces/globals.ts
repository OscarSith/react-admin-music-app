import { IArtist } from './Artist';

export interface IArtistsFetch {
  data: IArtist[];
  loading: boolean;
  error: string | null;
}

export interface ErrorFetch {
  error: string;
  message: string;
  statusCode: number;
}

interface IArtistCrudBasic {
  showModal: () => void;
  handleGetArtist: (artist: IArtist, forDelete: boolean) => void;
}

export interface ArtistTableProp extends IArtistCrudBasic {
  artists: IArtist[];
}

export interface ItemArtistProps extends IArtistCrudBasic {
  artist: IArtist;
}
