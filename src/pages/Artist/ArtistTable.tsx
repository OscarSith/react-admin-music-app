import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import { ItemArtist } from './ItemArtist';
import { ArtistTableProp } from '../../interfaces/globals';

export const ArtistTable = memo(
  ({ artists, showModal, handleGetArtist }: ArtistTableProp) => {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <td width="30%">Nombre Completo</td>
            <td width="20%">Imagen</td>
            <td>Bio</td>
            <td>F. Creación</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => {
            return (
              <ItemArtist
                key={artist.id}
                artist={artist}
                showModal={showModal}
                handleGetArtist={handleGetArtist}
              />
            );
          })}
        </tbody>
      </Table>
    );
  },
);
