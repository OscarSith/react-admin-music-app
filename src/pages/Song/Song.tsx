import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { albumsByArtistId } from '../../services/AlbumServices';
import { AutocompleteArtist } from '../Album/AutocompleteArtist';
import { IAlbum } from '../../interfaces/Album';

export const Song = () => {
  const [listAlbums, setListAlbums] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState(false);
  const [artistId, setArtistId] = useState(0);

  useEffect(() => {
    getAlbumsByArtist();
  }, [artistId]);

  const getAlbumsByArtist = () => {
    if (artistId > 0) {
      setLoading(true);
      albumsByArtistId(artistId)
        .then((albums) => {
          setListAlbums(albums);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <h2 className="text-center mb-3">Listado de canciones</h2>
      <Row>
        <Col>
          <AutocompleteArtist
            updateArtistId={(artistID) => setArtistId(artistID)}
          />
        </Col>
        <Col>
          <Form.Select aria-label="Seleccione un album" disabled={loading}>
            <option>{loading ? 'Cargando...' : 'Seleccione un album'}</option>
            {listAlbums.map((album) => (
              <option value={album.id} key={album.id}>
                {album.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};
