import { Dispatch, MutableRefObject } from 'react';
import { IAlbum } from './Album';
import { IArtist } from './Artist';
import { ISong } from './Song';

export interface IArtistsFetch {
  data: IArtist[];
  loading: boolean;
  error?: string | null;
}

export interface ErrorFetch {
  error: string;
  message: string;
  statusCode: number;
}

export interface IArtistCrudBasic {
  showModal: () => void;
}

export interface ItemArtistProps extends IArtistCrudBasic {
  artist: IArtist;
}

export interface ArtistReduceAction {
  type: string;
  artist?: IArtist;
  artists?: IArtist[];
  id?: number;
}

export interface IArtistContext {
  artists: IArtist[];
  artistRef: MutableRefObject<IArtist>;
  toDelete: MutableRefObject<boolean>;
  dispatch: Dispatch<ArtistReduceAction>;
}

export interface AlbumReduceAction {
  type: string;
  albums?: IAlbum[];
  id?: number;
}

export interface SongReduceAction {
  type: string;
  song?: ISong;
  songs?: ISong[];
  id?: number;
}
