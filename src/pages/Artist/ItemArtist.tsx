import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { URL_SERVER_DOMAIN } from '../../constants';
import { formatCreateDate } from '../../utils/utils';
import { ItemArtistProps } from '../../interfaces/globals';
import { useArtistContext } from './store/StoreArtistContext';

export const ItemArtist = ({ artist, showModal }: ItemArtistProps) => {
  const { artistRef, toDelete } = useArtistContext();
  return (
    <tr key={artist.id}>
      <td>
        {artist.name} {artist.lastname}
      </td>
      <td>
        <Image
          src={URL_SERVER_DOMAIN + artist.avatar}
          alt={'Avatar ' + artist.name}
          thumbnail={true}
          rounded
        />
      </td>
      <td>{artist.bio}</td>
      <td>
        <small>{formatCreateDate(artist.created_at)}</small>
      </td>
      <td>
        <Button
          type="button"
          size="sm"
          variant="success"
          onClick={() => {
            showModal();
            artistRef.current = artist;
          }}
        >
          Edit
        </Button>
        <Button
          type="button"
          size="sm"
          variant="danger"
          onClick={() => {
            showModal();
            artistRef.current = artist;
            toDelete.current = true;
          }}
        >
          Del
        </Button>
      </td>
    </tr>
  );
};
