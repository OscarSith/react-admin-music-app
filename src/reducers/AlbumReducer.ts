import { IAlbum } from '../interfaces/Album';
import { AlbumReduceAction } from '../interfaces/globals';

export const AlbumReducerActions = {
  SET: 'set',
  ADDED: 'added',
  EDITED: 'edited',
  DELETED: 'deleted',
};

export const AlbumReducer = (albums: IAlbum[], action: AlbumReduceAction) => {
  switch (action.type) {
    case AlbumReducerActions.SET:
      return [...action.albums];

    case AlbumReducerActions.ADDED: {
      return [action.albums[0], ...albums];
    }

    case AlbumReducerActions.EDITED: {
      const newAlbums = albums.map((album) => {
        if (album.id === action.id) {
          return action.albums[0];
        } else {
          return album;
        }
      });

      return [...newAlbums];
    }
    case AlbumReducerActions.DELETED: {
      return albums.filter((album) => album.id !== action.id);
    }
    default:
      throw new Error('Unknow action: ' + action.type);
  }
};
