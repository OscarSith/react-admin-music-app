import { Reducer } from 'react';
import { SongReduceAction } from '../interfaces/globals';
import { ISong } from '../interfaces/Song';

export const SongReducerActions = {
  SET: 'set',
  ADDED: 'added',
  EDITED: 'edited',
  DELETED: 'deleted',
};

export const SongReducer: Reducer<ISong[], SongReduceAction> = (
  songs: ISong[],
  action: SongReduceAction,
) => {
  switch (action.type) {
    case SongReducerActions.SET:
      if (action.songs !== undefined) {
        return [...action.songs];
      }

      return [...songs];

    case SongReducerActions.ADDED: {
      if (action.song) {
        return [action.song, ...songs];
      }

      return [...songs];
    }

    case SongReducerActions.EDITED: {
      const newSongs = songs.map((song) => {
        if (song.id === action.song?.id) {
          return action.song ? action.song : song;
        } else {
          return song;
        }
      });

      return [...newSongs];
    }
    case SongReducerActions.DELETED: {
      return songs.filter((song) => song.id !== action.id);
    }
    default:
      throw new Error('Unknow action: ' + action.type);
  }
};
