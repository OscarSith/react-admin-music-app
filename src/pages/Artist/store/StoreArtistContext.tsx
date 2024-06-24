import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useRef,
} from 'react';
import { IArtistContext } from '../../../interfaces/globals';
import { ArtistReducer } from '../../../reducers/ArtistReducer';
import { IArtist } from '../../../interfaces/Artist';

export const emptyArtist: IArtist = {
  avatar: '',
  bio: '',
  id: 0,
  lastname: '',
  name: '',
  created_at: '',
};

const ArtistContext = createContext<IArtistContext>({
  artists: [],
  toDelete: { current: false },
  artistRef: {
    current: emptyArtist,
  },
  dispatch: () => void 0,
});

export const StoreArtistProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [artists, dispatch] = useReducer(ArtistReducer, []);
  const artistRef = useRef<IArtist>(emptyArtist);
  const toDelete = useRef(false);

  return (
    <ArtistContext.Provider value={{ artists, artistRef, toDelete, dispatch }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtistContext = () => {
  return useContext(ArtistContext);
};
