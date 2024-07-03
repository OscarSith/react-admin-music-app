import { Dispatch, MutableRefObject } from 'react';
import { IAlbum } from './interfaces/Album';
import { AlbumReduceAction } from './interfaces/globals';

export type ArtistModalProps = {
  showModal: boolean;
  error: string;
  handleClose: () => void;
  handleShowToast: (message: string, error?: boolean) => void;
  handleError: (message: string) => void;
};

export type AlbumModalProps = {
  showModal: boolean;
  closeModal: () => void;
  artistId: number;
};

export type AlbumItemProps = {
  album: IAlbum;
  showModal: () => void;
};

export type AutocompleteProps = {
  updateArtistId: (artistId: number) => void;
};

export type TypeAlbumContext = {
  albums: IAlbum[];
  albumSelected: IAlbum | null;
  updateAlbumSelected: (album: IAlbum | null, initialState?: boolean) => void;
  toDelete: MutableRefObject<boolean>;
  dispatch: Dispatch<AlbumReduceAction>;
};

export type fetchDataResource<ResultType> = {
  read: () => ResultType;
};
