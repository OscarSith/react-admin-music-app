import { IArtist } from '../interfaces/Artist';
import { ArtistReduceAction } from '../interfaces/globals';

export const ArtistReducerActions = {
  SET: 'set',
  ADDED: 'added',
  EDITED: 'edited',
  DELETED: 'deleted',
};

export const ArtistReducer = (
  artists: IArtist[],
  action: ArtistReduceAction,
): IArtist[] => {
  switch (action.type) {
    case ArtistReducerActions.SET: {
      return [...action.artists];
    }
    case ArtistReducerActions.ADDED: {
      return [action.artists[0], ...artists];
    }
    case ArtistReducerActions.EDITED: {
      for (let i = 0; i < artists.length; i++) {
        if (artists[i].id === action.id) {
          artists[i] = Object.assign(artists[i], action.artists[0]);
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
