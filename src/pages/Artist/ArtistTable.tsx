import React, { memo, useEffect } from 'react';
import { ItemArtist } from './ItemArtist';
import { IArtistCrudBasic } from '../../interfaces/globals';
import { useArtistContext } from './store/StoreArtistContext';
import { ArtistReducerActions } from '../../reducers/ArtistReducer';
import { IArtist } from '../../interfaces/Artist';
import { useLoaderData } from 'react-router-dom';
import { fetchDataResource } from '../../types';

export const ArtistTable = memo(({ showModal }: IArtistCrudBasic) => {
  const { dispatch, artists } = useArtistContext();
  const resource = useLoaderData() as fetchDataResource<IArtist[]>;
  const artistsData = resource.read();

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
