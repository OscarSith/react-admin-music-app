import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useRef,
  useState,
} from 'react';
import { TypeAlbumContext } from '../../../types';
import { IAlbum } from '../../../interfaces/Album';
import { AlbumReducer } from '../../../reducers/AlbumReducer';

export const INITIAL_ALBUM: IAlbum = {
  name: '',
  id: 0,
  picture: '',
};

const AlbumContext = createContext<TypeAlbumContext>({
  albums: [],
  albumSelected: null,
  toDelete: { current: false },
  updateAlbumSelected: () => void 0,
  dispatch: () => void 0,
});

export const StoreAlbumProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [albums, dispatch] = useReducer(AlbumReducer, []);
  const [albumSelected, setAlbumSelected] = useState<IAlbum>(INITIAL_ALBUM);
  const toDelete = useRef(false);

  const updateAlbumSelected = (
    album: IAlbum | null,
    initialState: boolean = false,
  ) => {
    if (initialState) {
      setAlbumSelected(INITIAL_ALBUM);
    } else if (album) {
      setAlbumSelected(album);
    }
  };

  const value = {
    toDelete,
    albumSelected,
    updateAlbumSelected,
    albums,
    dispatch,
  };

  return (
    <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>
  );
};

export const useAlbumContext = () => {
  return useContext(AlbumContext);
};
