import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { URL_SERVER_DOMAIN } from '../../constants';
import { formatCreateDate } from '../../utils/utils';
import { ItemArtistProps } from '../../interfaces/globals';

export const ItemArtist = ({
  artist,
  showModal,
  handleGetArtist,
}: ItemArtistProps) => {
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
            handleGetArtist(artist, false);
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
            handleGetArtist(artist, true);
          }}
        >
          Del
        </Button>
      </td>
    </tr>
  );
};
