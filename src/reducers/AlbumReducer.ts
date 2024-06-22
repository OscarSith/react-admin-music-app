import { Reducer } from 'react';
import { IAlbum } from '../interfaces/Album';
import { AlbumReduceAction } from '../interfaces/globals';

export const AlbumReducerActions = {
  SET: 'set',
  ADDED: 'added',
  EDITED: 'edited',
  DELETED: 'deleted',
};

export const AlbumReducer: Reducer<IAlbum[], AlbumReduceAction> = (
  albums: IAlbum[],
  action: AlbumReduceAction,
) => {
  switch (action.type) {
    case AlbumReducerActions.SET:
      if (action.albums) {
        return [...action.albums];
      }

      return [...albums];

    case AlbumReducerActions.ADDED: {
      if (action.albums) {
        return [action.albums[0], ...albums];
      }

      return [...albums];
    }

    case AlbumReducerActions.EDITED: {
      const newAlbums = albums.map((album) => {
        if (album.id === action.id) {
          return action.albums ? action.albums[0] : album;
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
      // return albums;
      throw new Error('Unknow action: ' + action.type);
  }
};
