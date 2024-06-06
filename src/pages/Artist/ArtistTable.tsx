import { Table } from 'react-bootstrap';
import { ItemArtist } from './ItemArtist';
import { IArtist } from '../../interfaces/Artist';
import { memo } from 'react';

type ArtistTableProp = {
  artists: IArtist[];
  handlerDelete: (artist: IArtist) => void;
  handleEdit: (artist: IArtist) => void;
};

export const ArtistTable = memo(
  ({ artists, handlerDelete, handleEdit }: ArtistTableProp) => {
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
                handleDelete={handlerDelete}
                handleOpenEdit={handleEdit}
              />
            );
          })}
        </tbody>
      </Table>
    );
  },
);
