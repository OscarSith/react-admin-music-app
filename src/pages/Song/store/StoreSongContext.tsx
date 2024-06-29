import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { ISong } from '../../../interfaces/Song';
import { SongReducer } from '../../../reducers/SongReducer';
import { SongReduceAction } from '../../../interfaces/globals';

const SongContext = createContext<{
  songs: ISong[];
  dispatch: Dispatch<SongReduceAction>;
}>({ songs: [], dispatch: () => void 0 });

export const StoreSongProvider = ({ children }: any) => {
  const [songs, dispatch] = useReducer(SongReducer, []);
  return (
    <SongContext.Provider value={{ songs, dispatch }}>
      {children}
    </SongContext.Provider>
  );
};

export const useStoreSong = () => {
  return useContext(SongContext);
};
