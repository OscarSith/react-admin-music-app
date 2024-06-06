import { Button, Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { fetchService } from '../../utils/utils';
import { IAlbum } from '../../interfaces/Album';
import { AutocompleteArtist } from './AutocompleteArtist';
import { AlbumItem } from './AlbumItem';
import { URL_SERVER_API } from '../../constants';
import { AlbumModal } from './AlbumModal';

export const Album: React.FC = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [artistId, setArtistId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (artistId) {
      setLoading(true);
      fetchService(
        URL_SERVER_API + 'album/by-artist/' + artistId,
        user.access_token,
      ).then((data: IAlbum[]) => {
        setAlbums(data.reverse());
        setLoading(false);
      });
    }
  }, [artistId]);

  return (
    <>
      <h2 className="text-center mb-3">Listado de albunes</h2>
      <Row>
        <Col>
          <AutocompleteArtist
            token={user.access_token}
            updateArtistId={setArtistId}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            disabled={artistId === 0}
            onClick={() => setShowModal(true)}
          >
            Nuevo
          </Button>
        </Col>
      </Row>
      <Row xs="2" md="3" lg={4} xl={5}>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          albums.map((album) => {
            return <AlbumItem key={album.id} album={album} />;
          })
        )}
        <Col>
          {!loading && albums.length === 0 && artistId > 0 && (
            <h2>No hay resultados que mostrar</h2>
          )}
        </Col>
      </Row>
      <AlbumModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
};
