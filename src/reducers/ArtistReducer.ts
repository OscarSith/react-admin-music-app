import { Reducer } from 'react';
import { IArtist } from '../interfaces/Artist';
import { ArtistReduceAction } from '../interfaces/globals';

export const ArtistReducerActions = {
  SET: 'set',
  ADDED: 'added',
  EDITED: 'edited',
  DELETED: 'deleted',
};

export const ArtistReducer: Reducer<IArtist[], ArtistReduceAction> = (
  artists: IArtist[],
  action: ArtistReduceAction,
) => {
  switch (action.type) {
    case ArtistReducerActions.SET: {
      if (action.artists) {
        return structuredClone(action.artists.reverse());
      }

      return [...artists];
    }
    case ArtistReducerActions.ADDED: {
      if (action.artist) {
        return [action.artist, ...artists];
      }

      return [...artists];
    }
    case ArtistReducerActions.EDITED: {
      for (let i = 0; i < artists.length; i++) {
        if (artists[i].id === action.id) {
          if (action.artist) {
            artists[i] = Object.assign(artists[i], action.artist);
          }
        }
      }

      return [...artists];
    }
    case ArtistReducerActions.DELETED: {
      return artists.filter((a) => a.id !== action.id);
    }

    default:
      throw new Error('Unknow action: ' + action.type);
  }
};
