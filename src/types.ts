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
  dispatch: (values: AlbumReduceAction) => void;
  artistId: number;
  albumSelected: IAlbum;
  toDelete: boolean;
};

export type AlbumItemProps = {
  album: IAlbum;
  showModal: () => void;
  testGetAlbumSelected: (album: IAlbum, toDelete?: boolean) => void;
};

export type AutocompleteProps = {
  updateArtistId: (artistId: number) => void;
};
