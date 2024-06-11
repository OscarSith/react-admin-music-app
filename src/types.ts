import { MutableRefObject } from 'react';
import { IArtist } from './interfaces/Artist';

export type Props = {
  children: React.ReactNode;
};

export type ArtistModalProps = {
  showModal: boolean;
  error: string;
  artistRef: MutableRefObject<IArtist>;
  toDelete: boolean;
  handleClose: () => void;
  dispatch: (data: any) => void;
  handleShowToast: (message: string, error?: boolean) => void;
  handleError: (message: string) => void;
};
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
