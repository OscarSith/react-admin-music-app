import React, { memo, useEffect } from 'react';
import { ItemArtist } from './ItemArtist';
import { IArtistCrudBasic } from '../../interfaces/globals';
import { useArtistContext } from './store/StoreArtistContext';
import { ArtistReducerActions } from '../../reducers/ArtistReducer';
import { fetchData } from '../../utils/fetchData';
import { IArtist } from '../../interfaces/Artist';

const resource = fetchData('artists');

export const ArtistTable = memo(({ showModal }: IArtistCrudBasic) => {
  const { dispatch, artists } = useArtistContext();
  const artistsData = resource.read() as IArtist[];

  useEffect(() => {
    dispatch({
      type: ArtistReducerActions.SET,
      artists: artistsData,
    });
  }, []);

  return (
    <>
      {artists.map((artist) => {
        return (
          <ItemArtist key={artist.id} artist={artist} showModal={showModal} />
        );
      })}
    </>
  );
});
